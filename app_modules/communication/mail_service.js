import nodemailer from 'nodemailer';

var transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD
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
