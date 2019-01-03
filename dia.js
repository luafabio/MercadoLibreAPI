'use strict';

const Utils = require('./utils');

class Dia {
	constructor(dia, sol, p1, p2, p3){
		this.dia = dia;
		this.sol = sol;
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;
		this.lluvia = 0;
		this.clima = '';
	}

	/**
	 * Calcula los posibles climas descriptos en el ejercicio
	 */
	obtenerClima() {
		if (this.area() != 0) {
			let d1 = this.signo(this.sol, this.p1, this.p2);
	    	let d2 = this.signo(this.sol, this.p2, this.p3);
			let d3 = this.signo(this.sol, this.p3, this.p1);
			
			let tiene_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
			let tiene_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);
			if  (!(tiene_neg && tiene_pos)) {
				this.lluvia = this.perimetro(this.p1, this.p2, this.p3);
				this.clima = 'lluvia';
			}
		} else {
			this.diaSeco()
		}	
	}

	/**
	 * Devuelve el producto vectorial entre un punto de origen y una recta.
	 * 
	 * @param {*} p1 
	 * @param {*} p2 
	 * @param {*} p3 
	 */
	signo(p1, p2, p3) {
	    return ((p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y));
	}

	/**
	 * Calcula si el dia sera de clima seco
	 */
	diaSeco() {
		let c = 0
		
		if (Utils.angulo(this.p1)=== Utils.angulo(this.p2)){
			c++;
		}
		if (Utils.angulo(this.p2)=== Utils.angulo(this.p3)){
			c++;
		}
		if (Utils.angulo(this.p3)=== Utils.angulo(this.p1)){
			c++;
		}
		if (c >= 1) {
			this.clima = 'sequia';
		} else {
			this.diaOptimo();
		}
	}

	/**
	 * Calcula si el dia sera optimo
	 */
	diaOptimo() {
		this.clima = 'optimo';
	}


	/**
	 * Devuelve el area de un triangulo
	 */
	area(){
		return ((this.p1.x*(this.p3.y-this.p2.y)+this.p3.x*(this.p2.y-this.p1.y)+this.p2.x*(this.p1.y-this.p3.y))/2);
	}

	/**
	 * Devuelve el perimetro de un triangulo
	 */
	perimetro(p1,p2,p3) {
		return this.distancia(p1) + this.distancia(p2) + this.distancia(p3) 
	}

	/**
	 * Devuelve la distancia de un punto hacia el origen
	 */
	distancia(p) {
		return Math.sqrt(Math.pow(p.x,2) + Math.pow(p.y,2))
	}
		
}

module.exports = Dia;