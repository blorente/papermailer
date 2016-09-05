"use strict";

const mailer = require('./utils/mailer.js');
const papers = require('./utils/papers.js');
const timers = require('./utils/timers.js');
const schedule = require('node-schedule');
const express = require('express');
const app = express();

papers.updatePapers();
mailer.sendMail();

schedule.scheduleJob(timers.getEmailSentInterval(), function() {
	mailer.sendMail();
});

schedule.scheduleJob(timers.getPaperUpdateInterval(), function() {
	papers.updatePapers();
});

schedule.scheduleJob('10 * * * *', function() {
	console.log('Tick');
});

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
	res.send('Welcome to PaperMailer!');
});

app.listen(app.get('port'), function () {
	console.log(`PaperMailer listening on port ${app.get('port')}!`);
});
