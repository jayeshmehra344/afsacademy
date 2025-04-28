import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');

  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!req.body) {
      return res.status(400).json({ error: 'Missing request body' });
    }

    console.log('Received request:', JSON.stringify(req.body, null, 2));

    // reCAPTCHA Verification
    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.recaptcha}`,
      { method: 'POST' }
    );
    const recaptchaData = await recaptchaResponse.json();
    console.log('reCAPTCHA response:', recaptchaData);

    if (!recaptchaData.success) {
      return res.status(400).json({
        error: 'reCAPTCHA verification failed',
        details: recaptchaData['error-codes'],
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"AFS Academy" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVING_EMAIL,
      subject: req.body.subject || "New Contact Form Submission",
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${req.body.message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Email sent successfully' });

  } catch (error: any) {
    console.error('Server error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message,
    });
  }
}
