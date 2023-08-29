const sendEmailUtil = require("../../utils/sendEmail");

const sendEmail = async (req, res) => {
  try {
    await sendEmailUtil.sendEmail(req.body);
    res.json({message:"success email"})
  } catch (err) {
res.json({message:"failed Email",...err})
    
  }

};

module.exports = sendEmail;
