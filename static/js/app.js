const qS = q => document.querySelector(q);
const qSA = q => document.querySelectorAll(q);
const eE = (e, t, c) => e.addEventListener(t, c);
const qE = (q, t, c) => eE(qS(q), t, c);
const wait = t => new Promise(r => setTimeout(r, t));

qE('.search-btn', 'click', e => {
	qS('.graph-cont').classList.add('hidden');

	fetch(`/api/${qS('.search-input').value.replace(/\s/g, '_')}`).then(r => r.json()).then(r => {
		const data = r.map(x => x.views);
		const labels = r.map(x => x.timestamp);

		const ctx = qS('.graph').getContext('2d');

		const gradient = ctx.createLinearGradient(0, 0, 640, 360);
		gradient.addColorStop(0, "#036ED9");
		gradient.addColorStop(1, "#0FF0B3");

		const chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels,
				datasets: [{
					data,
					backgroundColor: gradient,
					pointRadius: 0,
					pointHitRadius: 3,
					borderColor: '#f0f0f0'
				}]
			},
			options: {
				legend: false,
				scales: {
					yAxes: [{
						display: false
					}],
					xAxes: [{
						display: false
					}]
				}
			}
		});
		qS('.graph-cont').classList.remove('hidden');
	});
});