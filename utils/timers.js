"use strict";

function getPaperUpdateInterval() {
	// Every 2 months
	return '0 0 29 */2 *';
}
module.exports.getPaperUpdateInterval = getPaperUpdateInterval;

function getEmailSentInterval() {
	// Every week
	return '0 0 */7 * *';
}
module.exports.getEmailSentInterval = getEmailSentInterval;
