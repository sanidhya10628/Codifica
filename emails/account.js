const sendGridAPIKey = process.env.sendGridAPIKey;


const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email, name) => {

    sgMail.send({
        to: email,
        from: 'codificacode@gmail.com',
        subject: 'Welcome to Codifica!.. Place to write editorial',
        text: `Welcome to our platform, ${name}. You can checkout our website for the features.`
    })
}

module.exports = {
    sendWelcomeEmail
}