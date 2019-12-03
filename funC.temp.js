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
	let itf_keys = Object.keys(interface);

	allPropsRequired:for (let k in itf_keys) {
		k = itf_keys[k];
		// console.log(k, config[k]);
		if (!config.hasOwnProperty(k)) {throw new Error(k);}
	}
	allPropsValidated:for (let k in itf_keys) {
		k = itf_keys[k];
		// console.log(k, config[k]);
		interface[k](config[k]);
	}

	let c = config;

	templateFunction: {
		name 				= c.name;
		description 		= c.description; 
		author				= c.author;
		notes				= c.notes;

		strict				= c.isStrict?'"use strict";':"";
		async				= c.isAsync?'async ':''; 		
		_this = null;
		// _this				= c.isThis?``:``


		params				= c.params;

		if (c.isThis) {
			_this = `${async}function ${name}(${params}) `
		} else {
			_this = `const ${name} = ${async}(${params}) => `
		}

		console.log("unprogrammed ... inputType, outputType");
		inputType			= c.inputType;
		outputType			= c.outputType;

		inputBehavior		= c.inputBehavior;
		outputBehavior      = c.outputBehavior;
		console.log("unprogrammed ... inputBehavior, outputBehavior")
		console.log("unprogrammed ... onError");
		// console.log("unprogrammed ... validations");


		validations			= c.validations;
		block				= c.block;
		spec				= c.spec;


		console.log(`
		${strict}
		${_this}{
		/*
		* author: ${author}
		* description: ${description}
		* notes: ${notes}
		*/
			return (${validations})(${params}) 
				&& 
					(${block})(${params});
		/* spec
			${spec}
		*/
		}
		`);

		let cb = `/*
		* author: ${author}
		* description: ${description}
		* notes: ${notes}
		*/
			return (${validations})(${params}) 
				&& 
					(${block})(${params});
		/* spec
			${spec}
		*/`;

		cb = isCapsule?capsule(cb):cb;

		return new Function(params, `${cb}`);
	}


};
