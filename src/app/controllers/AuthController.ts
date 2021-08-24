import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userViews from '../views/userViews';

class AuthController {
    async authenticate(req: Request, res: Response) {
        const repository = getRepository(User);
        const { email, password } = req.body;

        const user = await repository.findOne({ where: { email } });

        if (!user) {
            return res.sendStatus(401);
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.sendStatus(401);
        }

        /*
            O segredo é uma informação sensível, logo, é melhor substituí-la 
            por alguma constante protegida em um .env
        */
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

        /*
            userViews é onde eu defino quais informações serão retornadas (no caso, id e email).        
        */
        return res.json({
            user: userViews.render(user),
            token
        });

    }
}

export default new AuthController();