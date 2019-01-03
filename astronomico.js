'use strict';

class Astronomico {
	constructor(nombre, x, y){
		this.nombre = nombre;
		this.x = x;
		this.y = y;
	}

    /**
     * Devuelve la posicion del objeto x, y
     */
	getPos(){
		return [this.x, this.y];
	}

}

module.exports = Astronomico;
