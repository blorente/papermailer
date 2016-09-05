"use strict";

const nodemailer = require('nodemailer');
const papers = require('./papers.js');

const pass = process.env.MAILERPASS;
const mailer = process.env.MAILERNAME;
const recipient = process.env.RECIPIENT;

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(`smtps://${mailer}%40gmail.com:${pass}@smtp.gmail.com`);

function sendMail() {
	if (papers.updatingPapers()) {
		setTimeout(sendMail, 1000 * 60);
		return;
	}
	let paperToSend = papers.getRandomPDF();
	console.log('Sending: ', paperToSend);
	const mailOptions = {
		from: `"Papermailer" <${mailer}@gmail.com>`,
		to: recipient,
		subject: 'Fancy a pdf? ✔',
		text: 'Fancy a pdf?',
		html: '<b>Interesting PDFs right to your door</b>',
		attachments: [{
			path: paperToSend
		}]

	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Message sent: ' + info.response);
	});
}
module.exports.sendMail = sendMail;
