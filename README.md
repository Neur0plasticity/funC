# funC

What function should be, total rewrite. Automated function writing. Promotes reusable code.

Designed language agnostic. Transpilers need to be programmed.


# Why?
* effortless complete total codebase configurable control
* strongly enforced codebase design patterns
* paves reusable pathway

# Documentation

    methods usage
        funC.globalConfig(config);
        funC.funC(funcConfiguration);

        funC.instance(name,instanceConfiguration);

        funC.instance(name).funC(funCconfiguration);
        funC.instance(name).funC(funCconfiguration);

    configs:{
        name,                   // functions name
        description,            // functions brief explanation
        author,                 // the code creator
        notes,                  // important must read notes
        isStrict,               // javascripts strict mode "use strict" 
        isAsync,                // javascripts async function prefix modifier
        isThis,                 // function(){}   vs    ()=>{}
        isCapsule,              // UNFINISHED
        // isAnonymous,         // UNFINISHED
        inputType,              // allowed input datatypes
        outputType,             // allowed output datatypes
        params,                 // required parameters
        inputBehavior,          // the way in which input is received into the function
        outputBehavior,         // the way in which output is received into the function
        onError,                // does what on Error
        validations,            // do these validations before invoking block code
        block,                  // the functions main code
        spec                    // code asserting expected inputs & outputs
    }

# Code Demo

    let funC = require("funC");

	let globalConfigure = {
		author: 		"djtinkers365@gmail.com", 	// who signed this
		isStrict:       true,
		isAsync:        true, 	
		isThis:     	true,	
		isCapsule:      false,
		inputType:      "number",
		outputType: 	"number", 
		params: 		["a","b"],
		inputBehavior: "arguments",    
		outputBehavior: "return",
		onError: 		"throw",
	};

	alg.globalConfig(globalConfigure);

    // all further configs/objects inputs describe globalConfigure differences/tweaks

	alg.instance("instance 1",{
		isStrict: false,
	});

	alg.instance("instance 2",{
		isAsync: false,
		validations: ()=>{return !Number.isNaN(a) && !Number.isNaN(b)}, // these should not contain the same validation that params does. 
	});

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
