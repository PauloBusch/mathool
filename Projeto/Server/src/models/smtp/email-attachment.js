class MailAttachment {
    constructor(
      filename,
      content
    ) {
      this.filename = filename;
      this.content = content;
    }
}

module.exports = { MailAttachment };