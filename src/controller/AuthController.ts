import { getRepository } from 'typeorm'
import {Request, Response } from 'express'
import { User } from '../entity/User'

class AuthController {
	static login = async (req: Request, res: Response) => {
		const {username, password } = req.body;

		if( !(username && password)){
			res.status(400).json({ message: 'Username & password are Required'})
		
		}

		const userRepository = getRepository(User);

		let user: User;

		try{
			user = await userRepository.findOneOrFail({ where:{username}});
		}catch(e){
			return res.status(400).json({message: 'Username or Password incorrect'})
		}

		if(!user.checkPassword(password)){
			return res.status(400).json({message: 'Username or password are incorrect!'})
		}

		return res.send(user)

	}
}

export default AuthController
