import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from '../../../libs/database';
import { deleteUsers } from '@/controller';
import { Data } from '../../../../types';

const getUserByIdHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // database connection
    connectToDatabase().catch(() => res.status(405).json({ error: 'Error while connecting to database.' }));

    const { method } = req;

    switch (method) {
        case "DELETE":
            deleteUsers(req, res)
            break;
        default:
            res.setHeader('Allow', ['DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}

export default getUserByIdHandler;