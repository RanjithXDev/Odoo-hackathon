const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

// Send password reset email
const sendPasswordResetEmail = async (email, resetToken) => {
    const transporter = createTransporter();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const message = {
        from: `Globe Trotter <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Password Reset Request - Globe Trotter',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🌍 Globe Trotter</h1>
                        <p>Password Reset Request</p>
                    </div>
                    <div class="content">
                        <h2>Hello!</h2>
                        <p>You requested to reset your password for your Globe Trotter account.</p>
                        <p>Click the button below to reset your password. This link will expire in 10 minutes.</p>
                        <div style="text-align: center;">
                            <a href="${resetUrl}" class="button">Reset Password</a>
                        </div>
                        <p>Or copy and paste this link into your browser:</p>
                        <p style="word-break: break-all; color: #667eea;">${resetUrl}</p>
                        <p><strong>If you didn't request this, please ignore this email.</strong></p>
                    </div>
                    <div class="footer">
                        <p>© ${new Date().getFullYear()} Globe Trotter. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(message);
        console.log('✅ Password reset email sent successfully');
        return { success: true };
    } catch (error) {
        console.error('❌ Error sending email:', error);
        return { success: false, error: error.message };
    }
};

// Send welcome email (optional)
const sendWelcomeEmail = async (email, name) => {
    const transporter = createTransporter();

    const message = {
        from: `Globe Trotter <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: 'Welcome to Globe Trotter! 🌍',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🌍 Welcome to Globe Trotter!</h1>
                    </div>
                    <div class="content">
                        <h2>Hello ${name}!</h2>
                        <p>Thank you for joining Globe Trotter - your ultimate travel planning companion.</p>
                        <p>Start planning your next adventure today and create unforgettable memories!</p>
                        <p>Happy travels! ✈️</p>
                    </div>
                    <div class="footer">
                        <p>© ${new Date().getFullYear()} Globe Trotter. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(message);
        console.log('✅ Welcome email sent successfully');
    } catch (error) {
        console.error('❌ Error sending welcome email:', error);
    }
};

module.exports = {
    sendPasswordResetEmail,
    sendWelcomeEmail
};
