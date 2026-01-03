import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body;

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p>This message was sent from the Shriyans Lotus Seeds contact form.</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Shriyans Lotus Seeds',
      html: `
        <h2>Thank you for your message, ${name}!</h2>
        <p>We have received your inquiry and will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <hr>
        <p>Best regards,<br>Shriyans Lotus Seeds Team</p>
      `
    };

    await transporter.sendMail(userMailOptions);

    res.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
});

export default router;