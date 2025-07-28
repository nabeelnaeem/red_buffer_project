import nodemailer from 'nodemailer';

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "62572bf962145b",
        pass: "f30605142b1b31"
    }
});

const sender = {
    address: process.env.MAILTRAP_FROM_EMAIL,
    name: process.env.MAILTRAP_FROM_NAME,
};

export const sendOrderConfirmation = async (to, subject, html) => {
    try {
        await transport.sendMail({
            from: sender,
            to,
            subject,
            html,
            category: 'Order Confirmation',
        });
    } catch (error) {
        console.log('Email send error:', error);
    }
};
