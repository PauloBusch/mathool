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

module.exports = { MailDetails };