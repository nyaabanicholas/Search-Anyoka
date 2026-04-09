const express = require('express');
const { MailtrapClient } = require("mailtrap");
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


// Mailtrap Client Configuration
const client = new MailtrapClient({
  token: process.env.MAILTRAP_API_TOKEN,
});

const sender = {
  email: process.env.MAILTRAP_SENDER_EMAIL,
  name: process.env.MAILTRAP_SENDER_NAME,
};

// Verify Mailtrap connection on startup
client.send({
  from: sender,
  to: [{ email: process.env.MAILTRAP_TO_EMAIL }],
  subject: "Mailtrap Connection Test",
  text: "Testing Mailtrap connection on startup",
})
.then(() => {
  console.log('🚀 Mailtrap Client is ready to take our messages');
})
.catch((error) => {
  console.log('❌ Mailtrap Connection Error:', error);
});


// Contact Form Endpoint
app.post('/api/contact', (req, res) => {
    const { fname, lname, email, phone, message } = req.body;

    const mailOptions = {
        from: sender,
        to: [{ email: process.env.MAILTRAP_TO_EMAIL }],
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

    client.send(mailOptions)
        .then((info) => {
            console.log('✅ Email sent successfully!');
            console.log('Response:', info);
            res.status(200).send('success');
        })
        .catch((error) => {
            console.error('❌ Error sending email:', error);
            return res.status(500).send('error');
        });
});


// Audit Form Endpoint
app.post('/api/audit', (req, res) => {
    const { name, email, website, service, msg } = req.body;

    const mailOptions = {
        from: sender,
        to: [{ email: process.env.MAILTRAP_TO_EMAIL }],
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

    client.send(mailOptions)
        .then((info) => {
            console.log('✅ Email sent successfully!');
            console.log('Response:', info);
            res.status(200).send('success');
        })
        .catch((error) => {
            console.error('❌ Error sending email:', error);
            return res.status(500).send('error');
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
