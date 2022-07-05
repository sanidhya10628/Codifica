const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'merncodifica@gmail.com',
        pass: process.env.GOOGLE_GMAIL_SECRET_KEY
    }
});




const send = async (email, link) => {
    try {
        const result = await transporter.sendMail({
            from: 'merncodifica@gmail.com',
            to: `${email}`,
            subject: 'Reset your Password',
            text: 'Hello World',
            html: `<h1> Forgot your Password ? </h1> 
                    <p> We have recieved a request to reset your password. If you didn't make this request, simply ignore this email. </p>
                    <hr>
                    <p> If you did make this request just click the one time link to reset password : <a href=${link}> click on this link to reset your password </a> </p>`
        });

        // console.log(JSON.stringify(result, null, 4));
        return {
            status: 'OK'
        }
    } catch (error) {
        // console.log(error);
        return {
            status: 'ERROR'
        }
    }
}


module.exports = {
    send
}
// send('sanidhya', 'https://merncodifica.netlify.app/')
