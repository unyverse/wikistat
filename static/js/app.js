const qS = q => document.querySelector(q);
const qSA = q => document.querySelectorAll(q);
const eE = (e, t, c) => e.addEventListener(t, c);
const qE = (q, t, c) => eE(qS(q), t, c);
const wait = t => new Promise(r => setTimeout(r, t));

qE('.search-btn', 'click', e => {
	qS('.graph-cont').classList.add('hidden');
	wait(500).then(() => {
		qS('.graph-cont').classList.remove('hidden');
	})
});