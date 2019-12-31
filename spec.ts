
import {funC} from "./funC.temp";

// let alg = require("./func.temp.js");

let alg = funC;

console.log(alg); 
// alg.globalConfig(config);
// alg.funC(funcConfiguration);
// alg.instance(name,instanceConfiguration);
// alg.instance(name).funC(funCconfiguration);
// alg.instance(name).funC(funCconfiguration);
console.log("Setting global configuration");
	let globalConfigure = {
		// name: 			"add",		// function name
		// description:    "sums two digits together", 	// what the function does
		author: 		"djtinkers365@gmail.com", 	// who signed this
		// notes: 			["nothing","to","report"],   // no comments allowed in code, data inputs only 
		isStrict:       true,
		isAsync:        true, 	
		isThis:     	true,	
		// isAnonymous:    false,
		isCapsule:      false,
		inputType:      "number",
		outputType: 	"number", 
		params: 		["a","b"],
		inputBehavior: "arguments",    
		outputBehavior: "return",
		onError: 		"throw",
		// validations: 	()=>{return !Number.isNaN(a) && !Number.isNaN(b)}, // these should not contain the same validation that params does. 
		// block: 			()=>{return a+b;},   // the actual function to execute
		// spec: ()=>{} // unit tests performed on the function  
	};
	alg.globalConfig(globalConfigure);
console.log("Setting instance configuration");
	alg.instance("instance 1",{
		isStrict: false,
	});
	alg.instance("instance 2",{
		isAsync: false,
		validations: ()=>{return !Number.isNaN(a) && !Number.isNaN(b)}, // these should not contain the same validation that params does. 
	});
	alg.instance("instance 3",{
		isThis: false,
	});
	alg.instance("instance 4",{
		inputType: "boolean",
		outputType:"boolean"
	});
	let catchedE = false;
	try {
		alg.instance("instance 4",{});
		console.log("failed overwrite throw error");
	} catch (error) {
		catchedE = true;
		console.log('passed overwrite');
	}
	if (catchedE === false) {throw new Error();}

console.log("Testing individual differences");
	let a = alg.instance("instance 2").funC({
	name: 			"add",		// function name
	description:    "sums two digits together", 	// what the function does
	block: 			()=>{return a+b;},   // the actual function to execute
	spec: 			()=>{} // unit tests performed on the function  
	});

	console.log(a.toString());

	a(4,5) === 9 || (()=>{throw new Error();})();

	let b = alg.instance("instance 2").funC({
	name: 			"sub",		// function name
	description:    "subtracts two digits together",
	block: 			()=>{return a-b;},   // the actual function to execute
	spec: ()=>{} // unit tests performed on the function  
	});
	b(4,5) === -1 || (()=>{throw new Error();})();

	let c = alg.instance("instance 2").funC({
	name: 			"div",		// function name
	description:    "divides two digits together", 	// what the function does
	block: 			()=>{return a/b;},   // the actual function to execute
	spec: ()=>{} // unit tests performed on the function  
	});
	c(4,5) === .8 || (()=>{throw new Error();})();

	let d = alg.instance("instance 2").funC({
	name: 			"mul",		// function name
	description:    "multiplies two digits together", 	// what the function does
	block: 			()=>{return a*b;},   // the actual function to execute
	spec: ()=>{} // unit tests performed on the function  
	});
	d(4,5) === 20 || (()=>{throw new Error();})()
console.warn("test capsule");
