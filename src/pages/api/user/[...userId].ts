import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from '../../../libs/database';
import { deleteUser, getUserById, updateUser } from '@/controller';
import { Data } from '../../../../types';

const getUserByIdHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // database connection
    connectToDatabase().catch(() => res.status(405).json({ error: 'Error while connecting to database.' }));

    const { method } = req;

    switch (method) {
        case 'GET':
            getUserById(req, res);
            break;
        case "PUT":
            await updateUser(req, res);
            break;
        case "DELETE":
            deleteUser(req, res)
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}

export default getUserByIdHandler;