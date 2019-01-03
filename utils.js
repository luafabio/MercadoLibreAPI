'use strict';

class Utils {
    
    /**
     * Realiza el calculo de un angulo de un punto con el origen a partir de sus coordenadas cartesianas. 
     * @param {*} p 
     */
    static angulo(p) {
		return Math.atan2(p.y, p.x);
    }
    

}
module.exports = Utils;