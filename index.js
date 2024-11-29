const express = require('express');
const axios = require('axios');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})


app.post('/send-email', async (req, res) => {
    let secureOption;
    const { from, to, subject, message, smtp } = req.body;
    const { host, port, user, pass } = smtp;
    if (port == 465) {
        secureOption = true
    } else if (port == 587) {
        secureOption = false
    }
    // Configure the SMTP transport
    const transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: secureOption,
        auth: {
            user: user,
            pass: pass,
        },
    });

    /* // Configure the Default SMTP transport
      const transporter = nodemailer.createTransport({
          host: 'smtppro.zoho.com', // Replace with your SMTP server
          port: 465, // Use 587 for TLS, or 465 for SSL
          secure: true, // Set to true if using port 465
          auth: {
              user: 'support@bitapps.pro',
              pass: 'GsjNzh1c1RUd',
          },
      });*/

    // Test the connection (optional)
    /*transporter.verify((error, success) => {
        if (error) {
            console.error('SMTP Connection Error:', error);
        } else {
            console.log('SMTP Connected Successfully!');
        }
    });*/

    try {
        const info = await transporter.sendMail({
            from,
            to,
            subject,
            text: message
        });

        res.send({ status: true })
    } catch (error) {
        //    console.log({"Error Sending Email": error});
        res.send({ status: false })
    }

});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});