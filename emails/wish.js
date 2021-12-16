const sgMail = require('@sendgrid/mail')
const sendGridAPIKey = process.env.sendGridAPIKey;


sgMail.setApiKey(sendGridAPIKey);


const sendBirthdayWishEmail = (email, name) => {

    sgMail.send({
        to: email,
        from: 'codificacode@gmail.com',
        subject: 'Greetings from Codifica Project',
        text: `Wishing you a day filled with happiness and a year filled with joy. Happy birthday! ${name} ” “Sending you smiles for every moment of your special day…Have a wonderful time and a very happy birthday!” “Hope your special day brings you all that your heart desires! Here's wishing you a day full of pleasant surprises! `
    })
}

sendBirthdayWishEmail('aryaman.m09@gmail.com', 'Aryaman Mishra')
