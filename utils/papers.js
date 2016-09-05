"use strict";

const fs = require('fs');
const path = require('path');
const download = require('download-github-repo');

let updating = false;

function updatePapers() {
	updating = true;
	console.log('Deleting old papers...');
	deleteFolderRecursive('./papers');
	console.log('Dowloading papers...');
	download('papers-we-love/papers-we-love', './papers', function() {
		updating = false;
		console.log('Papers updated!');
	});
}
module.exports.updatePapers = updatePapers;

function updatingPapers() {
	return updating;
}
module.exports.updatingPapers = updatingPapers;

function getRandomPDF() {
	const papers = fromDir('./papers', '.pdf');
	const index = Math.floor(Math.random() * papers.length);
	return papers[index];
}
module.exports.getRandomPDF = getRandomPDF;

function fromDir(startPath, filter){
	const found = [];

	if (!fs.existsSync(startPath)){
		console.log("no dir ", startPath);
		return;
	}

	let files = fs.readdirSync(startPath);
	for(let i = 0; i < files.length; i++){
		let filename = path.join(startPath, files[i]);
		let stat = fs.lstatSync(filename);
		if (stat.isDirectory()){
			const subdir = fromDir(filename,filter);
			subdir.forEach((file) => {found.push(file);})
		} else if (filename.indexOf(filter) >= 0) {
			found.push(filename);
		};
	};

	return found;
};

function deleteFolderRecursive(folder) {
	if( fs.existsSync(folder) ) {
		fs.readdirSync(folder).forEach(function(file, index){
			let curPath = path.join(folder, file);
			if(fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(folder);
	}
};
