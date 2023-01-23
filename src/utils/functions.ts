import { IFormData } from '@/components/AddEmployeeDialog';
import { BASE_URL } from './constant';
import mongoose from 'mongoose';
import { Data } from 'types';
import axios from 'axios';



const capitalizeFirstLetter = (str: string): string => {
    const arr = str.split(' ');

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const result = arr.join(' ');
    return result;
}

const isValidMongoId = (id: any) => {
    try {
        const objectID = new mongoose.Types.ObjectId(id);
        const objectIDString = objectID.toString();
        return objectIDString === id;
    } catch (e) {
        return false;
    }
}

export { capitalizeFirstLetter, isValidMongoId }

