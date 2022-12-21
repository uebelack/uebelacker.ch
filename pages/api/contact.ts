import Mailgun from 'mailgun.js';
import FormData from 'form-data';
import axios from 'axios';
import * as Yup from 'yup';

Yup.addMethod(Yup.string, 'captcha', function captcha() {
  return this.test('captcha', 'Captcha validation failed', async (value) => {
    const data = new FormData();
    data.append('secret', process.env.RECAPTCHA_SECRET);
    data.append('response', value);
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', data, { headers: data.getHeaders() });
    return response.data.success;
  });
});

declare module 'yup' {
  interface DateSchema {
    captcha(): DateSchema
  }
}

interface CaptchaSchema extends Yup.StringSchema {
  captcha(): Yup.StringSchema
}

const messageSchema = Yup.object({
  email: Yup.string().email().required(),
  subject: Yup.string().required(),
  message: Yup.string().required(),
  captcha: (Yup.string().required() as CaptchaSchema).captcha(),
  privacy: Yup.bool().oneOf([true]),
});

export default async function handler(request:{ method: string, body: { email: string, subject: string, message: string, } }, response: any) {
  if (request.method === 'POST') {
    const message = request.body;
    try {
      await messageSchema.validate(message);
      const mailgun = new Mailgun(FormData);
      await mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY! })
        .messages.create('mg.codecowboys.io', {
          from: message.email,
          to: ['support@codecowboys.io'],
          subject: message.subject,
          text: message.message,
        });
      response.status(204).send();
    } catch (error : any) {
      if (error.errors) {
        response.status(400).send(JSON.stringify({ error: 'validation failed', causes: error.errors }));
      } else {
        response.status(400).send(JSON.stringify({ error: 'unknown error' }));
      }
    }
  } else {
    response.status(404);
  }
}
