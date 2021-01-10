import { Request, Response } from 'express';

import SendForgotPasswordEmailService from '../../services/Users/SendForgotPasswordEmail'

export default class SendForgotPasswordEmailController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {

      const sendForgotPassword = new SendForgotPasswordEmailService();

      const { email } = request.body;

      await sendForgotPassword.run({
        email
      })

      return response.status(200).json({ success: 'your password recovery email has been sent' })

    } catch(err) {
      return response.status(400).json({ error: err.message })
    }
  }
}