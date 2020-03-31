import jwt from 'jsonwebtoken';

import UserRepository from '../repositories/user/repository';
import config from '../config';

export default async (req, res, next) => {
    const token = req.header('Authorization');
    const userRepository = new UserRepository();

    if (!token) {
        res.status(400).send('User not logged in!');
    } else {
        try {
            let decode;
            try {
                decode = jwt.verify(token, config.secret);
            } catch(error) {
                throw new Error('Invalid token!')
            }
            const { user, id } = decode;
            const userData = await userRepository.findById(id);
            if (!userData) {
                throw new Error('User does not exist!');
            }
            req.claims = {
                user,
                id,
            };
            next();
        } catch (error) {
            res.status(400).send(error.message || 'Unknown error!');
        }
    }
}