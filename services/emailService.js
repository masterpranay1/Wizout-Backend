import nodemailer from 'nodemailer';
import { google } from 'googleapis';

class EmailService {

  async sendEmail(to, subject, text) {

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    )

    oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    })

    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.ADMIN_EMAIL,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken
      }
    })

    console.log(accessToken, transporter);

    try {
      const isVerified = await transporter.verify();
      if(!isVerified) {
        console.log('Transporter not verified');
        return;
      }
      console.log('Transporter verified');

      try {
        const mailOptions = {
          from: `Pranay Raj ${process.env.ADMIN_EMAIL}`,
          to: to,
          subject: subject,
          text: text
        }
        const result = await transporter.sendMail(mailOptions)
        console.log(result);
        return result;
      } catch (error) { 
        console.log(error);
      }
    } catch(err) {
      console.log('Transporter not setup correctly.');
      return err
    }
  }
}

export default new EmailService();
