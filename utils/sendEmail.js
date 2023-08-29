const nodemailer = require("nodemailer");
let mails ={
  emailVerify :{
      subject:"Email Activation",
      body:`Hello,\n\n you can open the link below to active your account: \n${process.env.SERVER_URL}/api/users/auth/activeaccount/:token`
  },
  passwordReset:{
    subject:"Password Reset",
    body:`Hello,\n\n you can open the link below to reset your account password: \n${process.env.CLIENT_DOMAIN}/resetpassword/:token`
  }
}
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.CLIENT_EMAIL_SENDER,
    pass: process.env.CLIENT_EMAIL_SENDER_PASSWORD,
  },
});

function sendEmail({ name, email, subject, message }) {
  // console.log(name, email, message, subject);
  const options = {
    from: name,
    to: "EcoCharge.ITI@gmail.com",
    subject,
    html: `<div>
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>${message}</p>
        </div>`,
  };

  transporter.sendMail(options);
}
async function sendEmailActivation(mailType,to,token){
    

      // create reusable transporter object using the default SMTP transport
      
 
  
  
  let mailDetails = {
    from:process.env.CLIENT_EMAIL_SENDER,
      to,
      subject:mails[mailType].subject ,
      text: mails[mailType].body.replace(':token',token)
  };
  
await transporter.sendMail(mailDetails, function(err, data) {
  if(err) {
      console.log(err);
  } else {
      console.log('Email sent successfully');
  }
});
}
async function sendPasswordReset(mailType,to,token){
  
  let mailDetails = {
    from:process.env.CLIENT_EMAIL_SENDER,
      to,
      subject:mails[mailType].subject ,
      text: mails[mailType].body.replace(':token',token)
  };
  
await transporter.sendMail(mailDetails, function(err, data) {
  if(err) {
      console.log(err);
  } else {
      console.log('Email sent successfully');
  }
});
}
module.exports = {sendEmail,sendEmailActivation,sendPasswordReset};
