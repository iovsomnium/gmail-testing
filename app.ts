import { createTransport } from 'nodemailer';
import config from './config';

// 수신자 이메일 주소 설정
const receiver: string = 'ksw09157@naver.com';

interface RegisterUserDTO {
  email: string;
}

// 사용자 서비스 클래스 정의
class UserService {
  // OAuth를 사용하여 메일을 보내는 static 메소드
  static sendMailWithOAuth = async (userDTO: RegisterUserDTO) => {
    try {
      // nodemailer의 createTransport를 사용하여 메일 전송자 설정
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

      // 메일 옵션 설정
      const mailOptions = {
        to: userDTO.email,
        subject: 'testing',
        html: 'for testing',
      };

      // 메일 전송
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error(err); // 에러 발생 시 콘솔에 출력
    }
  };

  // 비밀번호를 사용하여 메일을 보내는 static 메소드
  static sendMailWithPassword = async () => {
    // nodemailer의 createTransport를 사용하여 메일 전송자 설정(기본 인증 사용)
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: 'ksw09157.5212@gmail.com',
        pass: config.mailer.gmailPassword,
      },
    });

    // 메일 옵션 설정
    const mailOptions = {
      from: 'ksw09157.5212@gmail.com',
      to: receiver,
      subject: '이메일 제목',
      text: 'Node.js의 Nodemailer + Google SMTP를 사용해서 보낸 메일입니다!', // 메일 내용(텍스트 형식)
    };

    try {
      // 메일 전송
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.log(error);
    }
  };
}

const tempUser: RegisterUserDTO = {
  email: receiver,
};

UserService.sendMailWithOAuth(tempUser);
UserService.sendMailWithPassword();
