import { Gender } from './gender';

export class User {
    id: string;
    userName: string;
    password: string;
    fullName: string;
    age: number;
    birthDate: Date;
    gender: Gender;
    token?: string;
}