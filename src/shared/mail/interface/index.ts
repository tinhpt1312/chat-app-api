export interface MailDetails {
  recipient: string;
  subject: string;
  messageBody: string;
  attachment?: IMailAttachment[];
}

export interface IMailAttachment {
  filename: string;
  path: string;
}
