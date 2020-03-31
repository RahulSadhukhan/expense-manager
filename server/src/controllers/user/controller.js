import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserRepository from '../../repositories/user/repository';
import config from '../../config';

class UserController {
    constructor() {
        this.userRepository = new UserRepository();
        this.create = this.create.bind(this);
        this.login = this.login.bind(this);
        this.me = this.me.bind(this);
    }

    async create(req, res) {
        const { body: data } = req;
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        const user = await this.userRepository.create({
            username: data.username,
            firstname: data.firstname,
            lastname: data.lastname,
            password: hashedPassword,
            email: data.email
        });
        delete user.password;
        res.status(200).json(user);
    }
    
    async me(req, res) {
        const { claims: { id } } = req;
        const user = await this.userRepository.findById(id);
        const { password, ...rest } = user;
        res.status(200).json(rest);
    }

    async login(req, res) {
        const { body: { email, password } } = req;
        if (!(email && password)) {
            res.status(400).send('Email or Password is not provided!');
        }
        const user = await this.userRepository.findByEmail(email);

        if (!bcrypt.compareSync(password, user.password)) {
            res.status(400).send('Wrong password');
        } else {
            const token = jwt.sign({ user: user.username, id: user._id }, config.secret);
            res.send({
                token,
                message: 'Login Successful',
                status: 200
            });
        }
    }
}

export default new UserController();