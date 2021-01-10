import { getRepository } from 'typeorm';
import UsersRepository from '../../repositories/Users/UsersRepository';

import UsersToken from '../../models/UsersToken'

import MailProvider from '../../providers/MailProvider'

import path from 'path'

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmail {
  public async run({email}: IRequest): Promise<void> {
    const usersRepository = new UsersRepository();
    const usersTokenRepository = getRepository(UsersToken);
    const mailProvider = new MailProvider();


    const user = await usersRepository.findByEmail(email);
    if(!user) throw new Error('Ivalid user email')

    const createUserToken = usersTokenRepository.create({
      user_id: user.id,
    })

    await usersTokenRepository.save(createUserToken);

    const template = path.resolve(__dirname, 'Views', 'forgot_password.hbs');

    await mailProvider.sendEmail({
      to: {
        name: user.username,
        address: user.email
      },
      subject: "[Equipe RentX] - Email de recuperação de senha",
      templateData: {
        file: template,
        variables: {
          name: user.username,
          link: `http://localhost:3000/reset-password?token=${createUserToken.token}`
        }
      }
    })

  }
}