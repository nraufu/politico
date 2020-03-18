import nodemailer from 'nodemailer';

async function sendMail(receiverEmail) {
	let transporter = nodemailer.createTransport({
	  host: "smtp.mailspons.com",
	  port: 587,
	  secure: false,
	  auth: {
		user: '64df3262e765428780b80fdf266daafb',
		pass: 'fdcd986e70c842329747012132878660'
	  }
	});
  
	let info = await transporter.sendMail({
	  from: '"Politico ✔" <politico@example.com>',
	  to: `${receiverEmail}`,
	  subject: "Password reset🔓",
	  text: "You can recover you account by clicking the following this link https://nraufu.github.io/Politico/UI/changePassword.html",
	  html: "You can recover you account by clicking the following this link https://nraufu.github.io/Politico/UI/changePassword.html"
	});
  }

  export default sendMail;
