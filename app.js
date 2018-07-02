const express = require('express');
const chalk = require('chalk');

function log(component, msg) {
	console.log(`${chalk.green(`:: ${component} ::`)} ${msg}`);
}

function error(component, msg) {
	console.log(`${chalk.red(`:: ${component} ::`)} ${msg}`);
}

const app = express();

app.use(express.static('static'));

app.listen(8080, () => {
	log('Express', 'Listening on port 8080');
});