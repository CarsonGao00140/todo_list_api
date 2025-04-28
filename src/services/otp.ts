import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import 'dotenv/config'

const records: Record<string, { code: string, expiry: number }> = {};
const mailerSend = new MailerSend({ apiKey: process.env['MAILERSEND_API_KEY']! });

export const send = async (email: string) => {
    const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

    const params = new EmailParams()
        .setFrom(new Sender("noreply" + `@${process.env['MAILERSEND_DOMAIN']}`, "Todo List"))
        .setTo([new Recipient(email)])
        .setSubject("Login Code")
        .setText("Enter this code into the app to continue: " + code);

    await mailerSend.email.send(params);
    records[email] = { code, expiry: Date.now() + 15 * 60 * 1000 }
};

export const verify = (email: string, code: string): boolean => {
    const record = records[email];
    if (record && record.code === code && Date.now() < record.expiry) {
        delete records[email];
        return true
    };
    return false
}
