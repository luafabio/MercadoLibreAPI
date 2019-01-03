'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
const Astronomico = require('./astronomico');
const Connections = require('./connections');
const conn = new Connections({});
var database;

var app = express();

const Planet = require('./planet');
const Dia = require('./dia');

const PX1 = 500;
const PY1 = 0;
const PX2 = 2000;
const PY2 = 0;
const PX3 = 1000;
const PY3 = 0;

const V1 = 1;
const V2 = 3;
const V3 = 5;

const S1 = -1;
const S2 = -1;
const S3 = +1;

const D1 = 500;
const D2 = 2000;
const D3 = 1000;

const CNT_DIAS = 3652;

app.get('/start', async function(req, res){

	if (database === undefined) {
		database = await conn.getMySQL();
	}

	const estrella = new Astronomico('Estrella', 0, 0);
	var p1 = new Planet('Ferengi', PX1, PY1, V1, S1, D1);
	var p2 = new Planet('Betasoide', PX2, PY2, V2, S2, D2);
	var p3 = new Planet('Vulcano', PX3, PY3, V3, S3, D3);

	
	await database.beginTransaction();
	await database.execute('TRUNCATE TABLE `calendar`;');
		
	try {
		for (let i=0; i <= CNT_DIAS; i++) {
			let p1cord = p1.calcPos();
			let p2cord = p2.calcPos();
			let p3cord = p3.calcPos();
	
			await database.execute('INSERT INTO `calendar` (`p1x`, `p1y`, `p2x`, `p2y`, `p3x`, `p3y`) VALUES (?, ?, ?, ?, ?, ?);', [p1cord[0],p1cord[1],p2cord[0],p2cord[1],p3cord[0],p3cord[1]]);

		}

		await database.commit();
		res.status(200).send('Success');
	} catch {
		res.status(403).send('Error');
	}
	
	
});

app.get('/stats', async function(req, res){

	let cs = 0;
	let cl = 0;
	let pm = 0;
	let cm = 0;
	let dm = 0;
	let co = 0;

	if (database === undefined) {
		database = await conn.getMySQL();
	}

	try {
		for (let i=0; i <= CNT_DIAS; i++) {
			const [pos] = await database.execute('SELECT * FROM `calendar` where id = ?;', [i+1]);

			if (pos[0] === undefined) {
				res.status(403).send('Incorrecto');	
				return
			}

			let clima = '';
			let p1x = pos[0].p1x;
			let p1y = pos[0].p1y;
			let p2x = pos[0].p2x;
			let p2y = pos[0].p2y;
			let p3x = pos[0].p3x;
			let p3y = pos[0].p3y;

			const estrella = new Astronomico('Estrella', 0, 0);
			var p1 = new Planet('Ferengi', p1x, p1y, V1, S1, D1);
			var p2 = new Planet('Betasoide', p2x, p2y, V2, S2, D2);
			var p3 = new Planet('Vulcano', p3x, p3y, V3, S3, D3);

			var dia = new Dia(i, estrella, p1, p2, p3);
			dia.obtenerClima();
			if (dia.clima === 'lluvia') {
				cl++;
				if (dia.lluvia > cm) {
					cm = dia.lluvia;
					dm=i+1;
				}
			}

			if (dia.clima === 'sequia') {
				cs++;
				
			}
			
			if (dia.clima === 'optimo') {
				co++;
			}
		}
		
		res.status(200).json({'lluvia': cl, 'lluvia_max': Math.round(cm), 'lluvia_max_dia': dm,'sequia': cs, 'optimo': co});
	} catch {
		res.status(403).send('Incorrecto');
	}
});

app.get('/clima', async function(req, res){
	let dias = req.query.dias;

	if (dias === undefined) {
		res.status(403).send('Incorrecto');	
		return
	}

	if (database === undefined) {
		database = await conn.getMySQL();
	}

	const [pos] = await database.execute('SELECT * FROM `calendar` where id = ?;', [dias]);

	if (pos[0] === undefined) {
		res.status(403).send('Incorrecto');	
		return
	}

	let clima = '';
	let id = pos[0].id
	let p1x = pos[0].p1x;
	let p1y = pos[0].p1y;
	let p2x = pos[0].p2x;
	let p2y = pos[0].p2y;
	let p3x = pos[0].p3x;
	let p3y = pos[0].p3y;

	const estrella = new Astronomico('Estrella', 0, 0);
	const p1 = new Planet('Ferengi', PX1, PY1, V1, S1, D1);
	const p2 = new Planet('Betasoide', PX2, PY2, V2, S2, D2);
	const p3 = new Planet('Vulcano', PX3, PY3, V3, S3, D3);

	const dia = new Dia(1, estrella, p1, p2, p3);
	dia.obtenerClima();

	res.status(200).json({'dia': id, 'clima':dia.clima});
});

app.get('/test', async function(req, res){
	const estrella = new Astronomico('Estrella', 0, 0);
	const p1 = new Planet('Ferengi', 300, 0, V1, S1, D1);
	const p2 = new Planet('Betasoide', 0, 2000, V2, S2, D2);
	const p3 = new Planet('Vulcano', -750, -750, V3, S3, D3);

	const dia = new Dia(1, estrella, p1, p2, p3);
	dia.obtenerClima();

	res.status(200).json({'clima':dia.clima});
});

app.listen(3000, function () {
	console.log('Server started on Port 3000...')
})	