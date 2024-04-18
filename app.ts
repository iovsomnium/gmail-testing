import { createTransport } from 'nodemailer';
import config from './config'; // config 파일에서 설정을 가져옴

interface RegisterUserDTO {
  email: string;
  // 다른 필요한 사용자 정보 필드 추가
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
}

const tempUser: RegisterUserDTO = {
  email: 'example@example.com',
};

UserService.register(tempUser);
