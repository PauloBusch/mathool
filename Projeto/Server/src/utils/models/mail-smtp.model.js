const nodemailer = require('nodemailer');

class MailDetails {
  constructor(
    subject,
    body,
    to,
    attachments
  ) {
    this.subject = subject;
    this.body = body;
    this.to = to;
    this.attachments = attachments;
  }
}

class MailAttachment {
  constructor(
    filename,
    content
  ) {
    this.filename = filename;
    this.content = content;
  }
}

class MailSmtp {
    constructor(
        details
    ) {
        this.details = details;
        this.sender = nodemailer.createTransport({
            host: process.env.SMTP_SERVICE,
            port: 465,
            secure: true,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            }
        });
        this.config = {
            from: process.env.SMTP_USER,
            to: this.details.to,
            subject: this.details.subject,
            attachments: this.details.attachments,
            html: this.details.body
        };
    }

    async Send(callback) {
        await this.sender.sendMail(this.config, async (err, inf) => {
            await callback(err, inf);
            this.sender.close();
        });
    }
}

module.exports = {
    MailSmtp,
    MailDetails,
    MailAttachment
}
