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
module.exports = interface_funC = {

	name: 			String,		// function name
	description:    String, 	// what the function does
	author: 		String, 	// who signed this
	notes: 			[String],   // no comments allowed in code, data inputs only 

	isStrict:       Boolean,
	isAsync:        Boolean, 	// optionally sequential
	isThis:     	Boolean,	// optionally allows "this" object

	outputType: 	String, // needs to be an acceptable interface/datatype/etc

	params: 		String | [String], // paramaters has it's own validations and definitions specific to project

	onError: 		Function, 		   // how the program reacts when an error occurs

	outputBehavior: ["return", "callback", "onError/onSuccess","onTrue/onFalse","console"] // think of console as stdin/stdout

	validations: 	[Function], // these should not contain the same validation that params does. 
	block: 			Function,   // the actual function to execute

	spec: [Function], // unit tests performed on the function  
};	