const express = require('express');
const chalk = require('chalk');
const axios = require('axios');

function log(component, msg) {
	console.log(`${chalk.green(`:: ${component} ::`)} ${msg}`);
}

function error(component, msg) {
	console.log(`${chalk.red(`:: ${component} ::`)} ${msg}`);
}

function today() {
	const d = new Date;
	return String(d.getFullYear()) + ((d.getMonth()+1) > 9 ? (d.getMonth()+1) : String(0) + (d.getMonth()+1)) + (d.getDate() > 9 ? d.getDate() : String(0) + d.getDate());
}

const app = express();

app.use(express.static('static'));

app.get('/api/:article', (req, res) => {
	log('Express', `${req.params.article} 🕔`);
	const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/all-agents/${req.params.article}/daily/20180101/${today()}`;
	axios.get(url).then(response => {
		log('Express', `${req.params.article} ✔️`);
		res.send(response.data.items);
	}).catch(err => {
		error('Express', `${req.params.article} ❌`);
		res.status(500).send();
	})
});

app.listen(8080, () => {
	log('Express', 'Listening on port 8080');
});