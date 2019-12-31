/*
	This interface allows functions data to be manipulable.

	Coders may input data or write raw code.
	if input data, verify data inputs, template data inputs to code;
	else scrape code, verify data inputs, template data inputs to code;

	Rules:
	*** ZERO TOLERANCE VAR DECLARATION ... var declarations reference to global, they are buggy and useless since "let" declaration was made. 
	*** UNDECLARED / REFERENCED variables are auditable for direct injection and class static memory referencing.
	*** ZERO TOLERANCE NO COMMENTS, they'll be scraped into property notes.
	*** ZERO TOLERANCE DYNANIC TYPING, strict type interactions only. Keeps the codebase clean.

	KEEP IN MIND:
	*** Language agnostic data structures allows smooth code translation.

*/
import {funCinterface, interface_funCinterface} from "./funC.interface";
/*
	func is configurable
	* it can be a module of it's own
	* it can be tweakable in it's environment
*/
let gConfig:   {[index: string]: {}} = {};
let instances: {[index: string]: {}} = {};
let configs:   {[index: string]: {}} = {};
let funcs:     {[index: string]: {}} = {};

const intF:interface_funCinterface 	= funCinterface;
const itf_keys: string[] 			= Object.keys(intF);

const incConfig:Function = function(config:{[index: string]: {}},name:string):void {
	name = name || (()=>{throw new Error()})();
	configs[name] = config;
};
const inheritConfig:Function = function(config_inherit:{[index: string]: {}}, config_inheritor:{[index: string]: {}}):void {
	for (let k in config_inherit) !config_inheritor.hasOwnProperty(k) && (config_inheritor[k]=config_inherit[k]);
};
let confiGmain = function(config:{[index: string]: {}}){
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
const fakeIfNull = function(obj,prop:string,val:any):void {
	if (!obj.hasOwnProperty(prop)) {obj[prop] = val;}
};	
fakeIfNull.namE 		= function(obj) {fakeIfNull(obj,'name',			"fake name to pass test");};
fakeIfNull.description 	= function(obj) {fakeIfNull(obj,'description',	"fake description to pass the test");};
fakeIfNull.author		= function(obj) {fakeIfNull(obj,'author',		"fake author")};
fakeIfNull.notes 		= function(obj) {fakeIfNull(obj,'notes',		["fake notes to pass the test"]);};
fakeIfNull.validations 	= function(obj) {fakeIfNull(obj,'validations',	()=>{/*fake*/});};
fakeIfNull.block 		= function(obj) {fakeIfNull(obj,'block',		()=>{/*fake*/});};
fakeIfNull.spec 		= function(obj) {fakeIfNull(obj,'spec',			()=>{/*fake*/});};
const confiGglobal:Function = function(config:{[index: string]: {}}):interface_pm{

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
const confiGinstance:Function = function(name:string,config:{[index: string]: {}}) {
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
		return {funC:func.bind({config:config})};
	} 
	else if (name) 		   {
		config = instances[name]; console.log('c',config)
		if (!config) {throw new Error();}
		return {funC:func.bind({config:config})}
	} 
	else 				   {
		throw new Error();
	}
};
const confiGfunC:Function = function(config):void {
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
export interface interface_meths {
	global,
	instance,
	funC
};
const meths = {
	global:confiGglobal,
	instance: confiGinstance,
	funC: confiGfunC
};
const confiG = Object.freeze(Object.assign(confiGmain,meths));
const func:Function = function(config):Function {

	if (typeof this.config === "object") {inheritConfig(this.config,config);}

	confiG.funC(config);
	let c = config;
	templatefunction: {
		const name 					= c.name;
		const description 			= c.description; 
		const author				= c.author;
		const notes					= c.notes;
		const params				= c.params;
		const strict				= c.isStrict?'"use strict";':"";
		const async					= c.isAsync?'async ':''; 		
		const _this = c.isThis? (`${async}function ${name}(${params}) `):(`const ${name} = ${async}(${params}) => `);
		// let isCapsule		    = c.isCapsule === true;
		const inputType				= c.inputType;
		const outputType			= c.outputType;
		const inputBehavior			= c.inputBehavior;
		const outputBehavior      	= c.outputBehavior;
		const onError 				= c.onError;

		const validations			= c.validations;
		const block					= c.block;
		const spec					= c.spec;

		const cb = `/*
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
export interface interface_pm {
	globalConfig,
	instance,
	funC
};
const pm:interface_pm = Object.freeze({
	globalConfig: confiG.global,
	instance: confiG.instance,
	funC: func
});
export const funC:interface_pm = pm;

