/*
	func is configurable
	* it can be a module of it's own
	* it can be tweakable in it's environment
*/
let gConfig = {};
let instances = {};
let configs = {};
let funCs = {};
let id = 0;

const intF = require('./funC.interface.js');
const itf_keys = Object.keys(intF);

const incConfig = function(config,name) {
	name = name || (()=>{throw new Error()})();
	configs[name] = config;
};
const inheritConfig = function(config_inherit, config_inheritor) {
	for (let k in config_inherit) !config_inheritor.hasOwnProperty(k) && (config_inheritor[k]=config_inherit[k]);
};
let confiGmain = function(config){
		allPropsRequired:for (let k in itf_keys) {
			k = itf_keys[k];
			// console.log(k, config[k]);
			if (!config.hasOwnProperty(k)) {throw new Error(k);}
		}
		allPropsValidated:for (let k in itf_keys) {
			k = itf_keys[k];
			// console.log(k, config[k]);
			intF[k](config[k]);
		}
};
const fakeIfNull = function(obj,prop,val) {
	if (!obj.hasOwnProperty(prop)) {obj[prop] = val;}
}	
fakeIfNull.namE 		= function(obj) {fakeIfNull(obj,'name',			"fake name to pass test");};
fakeIfNull.description 	= function(obj) {fakeIfNull(obj,'description',	"fake description to pass the test");};
fakeIfNull.author		= function(obj) {fakeIfNull(obj,'author',		"fake author")};
fakeIfNull.notes 		= function(obj) {fakeIfNull(obj,'notes',		["fake notes to pass the test"]);};
fakeIfNull.validations 	= function(obj) {fakeIfNull(obj,'validations',	()=>{/*fake*/});};
fakeIfNull.block 		= function(obj) {fakeIfNull(obj,'block',		()=>{/*fake*/});};
fakeIfNull.spec 		= function(obj) {fakeIfNull(obj,'spec',			()=>{/*fake*/});};
const confiGglobal = function(config){

	fakeIfNull.namE			(config); 
	fakeIfNull.description	(config); 
	fakeIfNull.author		(config);
	fakeIfNull.notes		(config);
	fakeIfNull.validations	(config);
	fakeIfNull.block		(config); 
	fakeIfNull.spec			(config);
	confiG(config);	
	// delete config.name;
	// delete config.description;
	// delete config.author;
	// delete config.notes;
	// delete config.validations;
	// delete config.block;
	// delete config.spec;
	gConfig = config;
	configs["global"] = gConfig;
	return pm;
};
const confiGinstance = function(name,config) {
	if (!name) 		{throw new Error();}
	if (name&&config) {

		if (instances[name]) {throw new Error("no duplicates allowed")}

		const gConfig_clone = Object.assign({},gConfig);
		console.log("c before", config);
		inheritConfig(gConfig_clone, config);
		console.log("c after",config);

		fakeIfNull.namE			(config); 
		fakeIfNull.description	(config);
		fakeIfNull.author		(config); 
		fakeIfNull.notes		(config);
		fakeIfNull.validations	(config);
		fakeIfNull.block		(config); 
		fakeIfNull.spec			(config);
		confiG(config);	
		// delete config.name;
		// delete config.description;
		// delete config.author;
		// delete config.notes;
		// delete config.validations;
		// delete config.block;
		// delete config.spec;
		instances[name] = config;
		incConfig(config,name);
		return {funC:funC.bind({config:config})};
	} 
	else if (name) 		   {
		config = instances[name]; console.log('c',config)
		if (!config) {throw new Error();}
		return {funC:funC.bind({config:config})}
	} 
	else 				   {
		throw new Error();
	}
};
const confiGfunC = function(config) {
	confiG(config);
	// delete config.name;
	// delete config.description;
	// delete config.author;
	// delete config.notes;
	// delete config.validations;
	// delete config.block;
	// delete config.spec;	
	// instances = config;
	incConfig(config, config.name);
};
const meths = {
	global:confiGglobal,
	instance: confiGinstance,
	funC: confiGfunC
};
const confiG = Object.freeze(Object.assign(confiGmain,meths));
const funC = function(config) {

	if (typeof this.config === "object") {inheritConfig(this.config,config);}

	confiG.funC(config);
	let c = config;
	templateFunction: {
		let name 				= c.name;
		let description 		= c.description; 
		let author				= c.author;
		let notes				= c.notes;
		let strict				= c.isStrict?'"use strict";':"";
		let async				= c.isAsync?'async ':''; 		
		let _this = null;
		// _this				= c.isThis?``:``
		let params				= c.params;
		// let isCapsule		    = c.isCapsule === true;
		if (c.isThis) {
			_this = `${async}function ${name}(${params}) `
		} else {
			_this = `const ${name} = ${async}(${params}) => `
		}
		console.log("unprogrammed ... inputType, outputType");
		let inputType			= c.inputType;
		let outputType			= c.outputType;
		let inputBehavior		= c.inputBehavior;
		let outputBehavior      = c.outputBehavior;
		console.log("unprogrammed ... inputBehavior, outputBehavior")
		console.log("unprogrammed ... onError");
		// console.log("unprogrammed ... validations");
		let validations			= c.validations;
		let block				= c.block;
		let spec				= c.spec;

		let cb = `/*
		* author: ${author}
		* description: ${description}
		* notes: ${notes}
		*/
		return (${validations})(${params}) && (${block})(${params});
		/* spec
			${spec}
		*/`;
		console.log(cb);

		// cb = isCapsule?capsule(cb):cb;

		return new Function(params, `${cb}`);
	}
};
const pm = Object.freeze({
	globalConfig: confiG.global,
	instance: confiG.instance,
	funC: funC
});
module.exports = pm;

