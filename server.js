const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Root route to check if server is running
app.get('/', (req, res) => {
    res.send('Search Anyoka Email API is running. API endpoints: /api/contact, /api/audit');
});


// Nodemailer Transporter using Mailjet SMTP
const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.MAILJET_API_KEY,
        pass: process.env.MAILJET_SECRET_KEY
    }
});

// Verify SMTP connection on startup
transporter.verify(function(error, success) {
    if (error) {
        console.log('❌ SMTP Connection Error:', error);
    } else {
        console.log('🚀 SMTP Server is ready to take our messages');
    }
});


// Contact Form Endpoint
app.post('/api/contact', (req, res) => {
    const { fname, lname, email, phone, message } = req.body;

    const mailOptions = {
        from: process.env.MAILJET_FROM_EMAIL,
        to: process.env.MAILJET_TO_EMAIL,
        subject: `New Contact Request from ${fname} ${lname}`,
        text: `
            First Name: ${fname}
            Last Name: ${lname}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
        `,
        html: `
            <h3>New Contact Request</h3>
            <p><strong>First Name:</strong> ${fname}</p>
            <p><strong>Last Name:</strong> ${lname}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('❌ Error sending email:', error);
            return res.status(500).send('error');
        }
        console.log('✅ Email sent successfully!');
        console.log('Response:', info.response);
        console.log('Message ID:', info.messageId);
        res.status(200).send('success');
    });
});


// Audit Form Endpoint
app.post('/api/audit', (req, res) => {
    const { name, email, website, service, msg } = req.body;

    const mailOptions = {
        from: process.env.MAILJET_FROM_EMAIL,
        to: process.env.MAILJET_TO_EMAIL,
        subject: `New Free Audit Request from ${name}`,
        text: `
            Full Name: ${name}
            Email: ${email}
            Website: ${website}
            Service of Interest: ${service}
            Message: ${msg}
        `,
        html: `
            <h3>New Free Audit Request</h3>
            <p><strong>Full Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Website:</strong> ${website}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Message:</strong></p>
            <p>${msg}</p>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send('error');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('success');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
