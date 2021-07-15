const nodemailer = require('nodemailer');
const { bindAll } = require('../utils/helpers/context');

class EmailService {
    async sendAsync(details, callback) {
        const config = {
            from: process.env.SMTP_USER,
            to: details.to,
            subject: details.subject,
            attachments: details.attachments,
            html: details.body
        };
        const client = this.createClient();

        await client.sendMail(config, async (err, inf) => {
            client.close();
            if (callback) await callback(err, inf);
        });
    }

    createClient() {
        return nodemailer.createTransport({
            host: process.env.SMTP_SERVICE,
            port: 465,
            secure: true,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            }
        });
    }
}

module.exports = bindAll(EmailService, new EmailService());