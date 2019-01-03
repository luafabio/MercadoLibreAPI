'use strict';

const Astronomico = require('./astronomico');
const Utils = require('./utils');
const DIA_RATIO_TERRESTRE = 1

class Planet extends Astronomico{
	constructor(nombre, x, y, vel, sentido, radio){
		super(nombre, x, y);
		this.vel = vel * Math.PI/180 * DIA_RATIO_TERRESTRE;
		this.sentido = sentido;
		this.radio = radio;
	}

	/**
	 * Calcula la posicion de un planeta y actualiza la posicion del objeto.
	 */
	calcPos(){
		let vrdx = Math.cos(Utils.angulo(this) + (this.sentido * this.vel)) * this.radio;
		let vrdy = Math.sin(Utils.angulo(this) + (this.sentido * this.vel)) * this.radio;
		
		this.x = vrdx;
		this.y = vrdy;
		return [this.x, this.y];
	}
}

module.exports = Planet;
