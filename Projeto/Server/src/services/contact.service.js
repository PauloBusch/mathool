const { MailDetails, MailSmtp } = require('../utils/models/mail-smtp.model');

async function sendEmail(req, res) {
    const { body } = req;
    const errors = getSendEmailErrors(body);
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
    new MailSmtp(detail).Send((err, _) => {
      if (err) return res.status(400).json({ errors: ['Fail to send email'] });
      res.json({ });
    });
}

function getSendEmailErrors(data) {
    const errors = [];
    if (!data.name) errors.push('Parameter name is required');
    if (!data.email) errors.push('Parameter email is required');
    if (!data.message) errors.push('Parameter message is required');
    return errors;
}

module.exports = { sendEmail }