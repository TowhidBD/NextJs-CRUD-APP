import { Data, IUsers } from 'types';
import type { NextApiRequest, NextApiResponse } from 'next';
import Users from '@/model/user';
import validator from 'validator';
import { capitalizeFirstLetter, isValidMongoId } from '@/utils/functions';
import mongoose from 'mongoose';

/**
 * get users handler function
 * 
 * GET: https://websiteurl/api/users
 *
 * @param   {NextApiRequest}         req   [Next Api Request]
 * @param   {NextApiResponse<Data>}  res   [Next Api Response]
 * @param   {[type]}                 Data  [type definition]
 *
 * @return  {<req><Data>}  
 */
const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const users = await Users.find({});

        if (!users) return res.status(404).json({ error: 'User not found.' });

        return res.status(200).json({ users });
    } catch (error) {
        return res.status(404).json({ error: 'Error while fetching data from API.' });
    }
}


/**
 * get user handler function
 * 
 * GET: https://websiteurl/api/users
 *
 * @param   {NextApiRequest}         req   [Next Api Request]
 * @param   {NextApiResponse<Data>}  res   [Next Api Response]
 * @param   {[type]}                 Data  [type definition]
 *
 * @return  {<req><Data>}  
 */
const getUserById = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { userId: id }: any = req.query;
    console.log(id);



    if (id) {
        try {
            const user = await Users.findById({ _id: id });

            if (!user) return res.status(404).json({ error: 'User not found.' });

            return res.status(200).json({ user });
        } catch (error) {
            return res.status(404).json({ error: 'Error while fetching data from API.' });
        }
    } else {
        return res.status(500).json({ error: 'Internal Server Error.' })
    }
}

/**
 * Add a new user handler function
 * 
 * POST: https://websiteurl/api/users
 *
 * @param   {NextApiRequest}         req   [Next Api Request]
 * @param   {NextApiResponse<Data>}  res   [Next Api Response]
 * @param   {[type]}                 Data  [type definition]
 *
 * @return  {<req><Data>}                 
 */
const addUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { firstname, lastname, email, salary, status, birthDate } = req.body;

    const errors = [];

    if (!firstname) {
        errors.push("First Name is required.")
    } else if (firstname.length < 2 || firstname.length > 10) {
        errors.push('First Name must be between 3 to 10 characters long.');
    }

    if (!lastname) {
        errors.push('Last Name is required.');
    } else {
        if (lastname.length < 3 || lastname.length > 10) {
            errors.push('Last Name must be between 3 to 10 characters long.');
        }
    }
    if (!email) {
        errors.push('Email is required.');
    } else if (email && !validator.isEmail(email)) {
        errors.push('Please provide a valid email address.');
    }
    if (!salary) {
        errors.push('Salary must be provided.');
    }
    if (!status) {
        errors.push('Status must be provided.');
    }
    if (errors.length > 0) {
        return res.status(400).json({ error: errors });
    } else {
        try {
            if ('POST' == req.method) {
                const isUserExist = await Users.findOne({ email: email });

                if (isUserExist) {
                    return res.status(404).json({ error: 'User with that email already exists.' })
                } else {
                    let data: IUsers;
                    await Users.create({
                        firstname,
                        lastname,
                        name: capitalizeFirstLetter(firstname) + ' ' + capitalizeFirstLetter(lastname),
                        email,
                        salary,
                        status,
                        birthDate
                    }, (err: any, data: any) => {
                        if (err) {
                            return res.status(500).json({ error: `${err} from /api/users` })
                        }
                    })
                    return res.status(200).json({
                        successMessage: 'New user added successfully!'
                    })

                }
            }
        } catch (error) {
            return res.status(404).json({ error: `${error} from /api/users` });
        }
    }

}

/**
 * Update existing user information
 * 
 * PUT: https://websiteurl/api/users/[id]
 *
 * @param   {NextApiRequest}         req   [Next Api Request]
 * @param   {NextApiResponse<Data>}  res   [Next Api Response]
 * @param   {[type]}                 Data  [type definition]
 *
 * @return  {<req><Data>}  
 */
const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { userId: id }: any = req.query;

    const formData = req.body;


    if (id && formData) {
        try {
            const user = await Users.findByIdAndUpdate({ _id: id }, formData);
            return res.status(200).json({
                data: user,
                successMessage: 'Updated successfully!'
            })

        } catch (error) {
            return res.status(404).json({ error: `Error while updating the User...! ${error}` })
        }
    } else {
        return res.status(400).json({ error: 'No data available for the update.' })

    }

}
/**
 * Delete existing user information
 * 
 * DELETE: https://websiteurl/api/users/[id]
 *
 * @param   {NextApiRequest}         req   [Next Api Request]
 * @param   {NextApiResponse<Data>}  res   [Next Api Response]
 * @param   {[type]}                 Data  [type definition]
 *
 * @return  {<req><Data>}  
 */
const deleteUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    try {
        const { userId: id }: any = req.query;


        const isDataExists = await Users.findOne({ _id: id });

        if (id && isDataExists) {
            await Users.findByIdAndDelete({ _id: id });
            return res.status(200).json({
                successMessage: `${isDataExists.name} data deleted successfully!`
            });
        }
        return res.status(404).json({ error: 'User not found!' })

    } catch (error) {
        return res.status(404).json({ error: 'Error while deleting the User...!' })
    }
}

/**
 * Delete mutiple users information
 * 
 * DELETE: https://websiteurl/api/users/[ids]
 *
 * @param   {NextApiRequest}         req   [Next Api Request]
 * @param   {NextApiResponse<Data>}  res   [Next Api Response]
 * @param   {[type]}                 Data  [type definition]
 *
 * @return  {<req><Data>}  
 */
const deleteUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    try {

        let { userIds: ids } = req.query;
        ids = String(ids);
        ids = ids.replace(/\[|\]/g, '').split(',');

        if (ids!.length) {
            await Users.deleteMany({ _id: { $in: ids } });
            return res.status(200).json({
                successMessage: 'Selected record deleted successfully!'
            });
        }
        return res.status(404).json({ error: 'User not found!' })

    } catch (error) {
        return res.status(404).json({ error: `Error while deleting the Users...! ${error}` })
    }


}
export { getUsers, getUserById, addUser, updateUser, deleteUser, deleteUsers };
