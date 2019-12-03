let alg = require("./func.temp.js");

console.log(alg);

let a = alg({
	name: 			"add",		// function name
	description:    "sums two digits together", 	// what the function does
	author: 		"djtinkers365@gmail.com", 	// who signed this
	notes: 			["nothing","to","report"],   // no comments allowed in code, data inputs only 

	isStrict:       true,
	isAsync:        true, 	
    isThis:     	true,	
    // isAnonymous:    false,

    inputType:      "number",
	outputType: 	"number", 

	params: 		["a","b"],

    inputBehavior: "arguments",    
	outputBehavior: "return",
    
    onError: 		"throw",

	validations: 	()=>{return !Number.isNaN(a) && !Number.isNaN(b)}, // these should not contain the same validation that params does. 
	block: 			()=>{return a+b;},   // the actual function to execute

	spec: ()=>{} // unit tests performed on the function  
});

a(4,5) === 9 || (()=>{throw new Error();})();

let b = alg({
	name: 			"sub",		// function name
	description:    "sums two digits together", 	// what the function does
	author: 		"djtinkers365@gmail.com", 	// who signed this
	notes: 			["nothing","to","report"],   // no comments allowed in code, data inputs only 

	isStrict:       true,
	isAsync:        true, 	
    isThis:     	true,	
    // isAnonymous:    false,

    inputType:      "number",
	outputType: 	"number", 

	params: 		["a","b"],

    inputBehavior: "arguments",    
	outputBehavior: "return",
    
    onError: 		"throw",

	validations: 	()=>{return !Number.isNaN(a) && !Number.isNaN(b)}, // these should not contain the same validation that params does. 
	block: 			()=>{return a-b;},   // the actual function to execute

	spec: ()=>{} // unit tests performed on the function  
});

b(4,5) === -1 || (()=>{throw new Error();})();

let c = alg({
	name: 			"div",		// function name
	description:    "sums two digits together", 	// what the function does
	author: 		"djtinkers365@gmail.com", 	// who signed this
	notes: 			["nothing","to","report"],   // no comments allowed in code, data inputs only 

	isStrict:       true,
	isAsync:        true, 	
    isThis:     	true,	
    // isAnonymous:    false,

    inputType:      "number",
	outputType: 	"number", 

	params: 		["a","b"],

    inputBehavior: "arguments",    
	outputBehavior: "return",
    
    onError: 		"throw",

	validations: 	()=>{return !Number.isNaN(a) && !Number.isNaN(b)}, // these should not contain the same validation that params does. 
	block: 			()=>{return a/b;},   // the actual function to execute

	spec: ()=>{} // unit tests performed on the function  
});

c(4,5) === .8 || (()=>{throw new Error();})();


let d = alg({
	name: 			"sub",		// function name
	description:    "sums two digits together", 	// what the function does
	author: 		"djtinkers365@gmail.com", 	// who signed this
	notes: 			["nothing","to","report"],   // no comments allowed in code, data inputs only 

	isStrict:       true,
	isAsync:        true, 	
    isThis:     	true,	
    // isAnonymous:    false,

    inputType:      "number",
	outputType: 	"number", 

	params: 		["a","b"],

    inputBehavior: "arguments",    
	outputBehavior: "return",
    
    onError: 		"throw",

	validations: 	()=>{return !Number.isNaN(a) && !Number.isNaN(b)}, // these should not contain the same validation that params does. 
	block: 			()=>{return a-b;},   // the actual function to execute

	spec: ()=>{} // unit tests performed on the function  
});

// b(4,5) === -1 || (()=>{throw new Error();})()

console.warn("test capsule");
