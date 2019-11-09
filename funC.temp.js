/*
	func is configurable

	* it can be a module of it's own
	* it can be tweakable in it's environment

*/
module.exports = function(config) {


if (typeof config !== 'object') {throw new Error();}

let sd = {};
let pm = {};

let interface = require('./funC.interface.js');
// all interfaces required for now

//let configKeys = Object.keys(config);
//let configVals = Object.values(values);


for (let k in interface) {

	if (String(interface[k]).toLowerCase() !== typeof config[k]) {
		throw new Error();
	}
}




};
