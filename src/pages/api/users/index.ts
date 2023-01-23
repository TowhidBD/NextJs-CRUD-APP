import type { NextApiRequest, NextApiResponse } from 'next'
import connectToDatabase from '../../../libs/database';
import { addUser, deleteUser, getUsers, updateUser } from '@/controller';
import { Data } from 'types';


const usersHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    // database connection
    connectToDatabase().catch(() => res.status(405).json({ error: 'Error while connecting to database.' }));

    const { method } = req;

    switch (method) {
        case "GET":
            await getUsers(req, res);
            break;
        case "POST":
            await addUser(req, res);
            break;
     
        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}

export default usersHandler;