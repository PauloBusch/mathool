const { bindAll } = require('../utils/helpers/context');
const { merge } = require('../utils/helpers/errors');
const { MailDetails } = require('../models/smtp/email-detail');
const mailService = require('./email.service');
const emailValidator = require('../utils/validators/email');

class ContactService {
    async sendEmailAsync(req, res) {
        const { body } = req;
        const errors = this.getSendEmailErrors(body);
        if (errors.length) return res.status(400).json({ errors });
    
        const detail = new MailDetails(
            'Mathool - Contato',
            `<h3>Uma mensagem de contato foi submetida no site Mathool.</h3>` + 
            `<h3>Informações do remetente:</h3>` +
            `<strong>Nome: </strong> ${body.name}<br />` +
            `<strong>Email: </strong> ${body.email}<br />` +
            `<strong>Mensagem: </strong> ${body.message}<br />`,
            process.env.SMTP_CONTACT
        );
        mailService.sendAsync(detail, (err, _) => {
          if (err) return res.status(400).json({ errors: ['Fail to send email'] });
          res.status(200).json({});
        });
    }
    
    getSendEmailErrors(data) {
        const errors = [];
        if (!data.name) errors.push('Parameter name is required');
        if (!data.email) errors.push('Parameter email is required');
        if (data.email) {
            const emailErrors = emailValidator.validate(data.email);
            merge(errors, emailErrors);
        }
        if (!data.message) errors.push('Parameter message is required');
        return errors;
    }
}

module.exports = bindAll(ContactService, new ContactService());