'use strict';
const nodemailer = require('nodemailer');
const helper = require('sendgrid').mail;

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
exports.sendMail = function(user){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '*********', // generated ethereal user
            pass: '********' // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <>', // sender address
        to: '', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
} 
var sg = require('sendgrid')('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');
    
exports.sendMailUsingSendgrid = function(email,subject,message,cb){
    console.info("i am here ---")
    var fromEmail = new helper.Email('noreply@gmail.com');
    var toEmail = new helper.Email(email);
    var subject = subject;
    var content = new helper.Content('text/html', message);
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);
     
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });
     
    sg.API(request, function (error, response) {
        console.info(response);
      if (error) {
        return cb(true,error);
      }
      return cb(false,response);
    });

}