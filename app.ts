import { createTransport } from 'nodemailer';
import config from './config';

const receiver: string = 'ksw09157@naver.com';

interface RegisterUserDTO {
  email: string;
}

class UserService {
  static register = async (userDTO: RegisterUserDTO) => {
    try {
      const transporter = createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: config.mailer.gmailUser,
          clientId: config.mailer.gmailClientId,
          clientSecret: config.mailer.gmailClientSecret,
          refreshToken: config.mailer.gmailRefreshToken,
        },
      });

      const mailOptions = {
        to: userDTO.email,
        subject: 'testing',
        html: 'for testing',
      };

      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error(err);
    }
  };

  static sendMail = async () => {
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'ksw09157.5212@gmail.com',
        pass: config.mailer.gmailPassword,
      },
    });

    const mailOptions = {
      from: 'ksw09157.5212@gmail.com',
      to: receiver,
      subject: '이메일 제목',
      text: 'Node.js의 Nodemailer + Google SMTP를 사용해서 보낸 메일입니다!',
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  };
}

const tempUser: RegisterUserDTO = {
  email: receiver,
};

UserService.register(tempUser);
UserService.sendMail();
