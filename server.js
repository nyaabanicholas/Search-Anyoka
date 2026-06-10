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


// Nodemailer Transporter using Mailtrap SMTP
const transporter = nodemailer.createTransport({
    host: 'live.smtp.mailtrap.io',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
    }
});



// Contact Form Endpoint
app.post('/api/contact', (req, res) => {
    const { fname, lname, email, phone, message } = req.body;

    const mailOptions = {
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
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
        from: process.env.MAIL_FROM,
        to: process.env.MAIL_TO,
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
