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
module.exports = {
	name,
	description,
	author,
	notes,
	isStrict,
	isAsync,
	isThis,
	isCapsule,
	// isAnonymous,
	inputType,
	outputType,
	params,
	inputBehavior,
	outputBehavior,
	onError,
	validations,
	block,
	spec
};
function throwE(msg) {throw new Error(msg);}
function name(val) {
	val 					|| throwE("missing arg");
	typeof val === "string" || throwE("string required");
	val.length > 0 			|| throwE("len must be gt 0");
}
function description(val) {
	val 					|| throwE("missing arg");
	typeof val === "string" || throwE("string required");
	val.length > 0 			|| throwE("len must be gt 0");
}
function author(val) {
	val 					|| throwE("missing arg");
	typeof val === "string" || throwE("string required");
	val.length > 0 			|| throwE("len must be gt 0");
}
function notes(val) {
	val 					|| throwE("missing arg");
	Array.isArray(val) 		|| throwE("string required");
	val.forEach(description);
}
function isStrict(val) {
	typeof val === "boolean" || throwE("boolean expected");
}
function isAsync(val) {
	typeof val === "boolean" || throwE("boolean expected");
}
function isThis(val) {
	typeof val === "boolean" || throwE("boolean expected");
}
function isCapsule(val) {
	typeof val === "boolean" || throwE("boolean expected");
}
// function isAnonymous(val) {
// 	typeof val === "boolean" || throwE("boolean expected");
// }
function inputType(val) {
	["boolean","string","number","object","array","symbol","function"]
	 
	 .includes(val) || throwE("unexpected datatype");
}
function outputType(val) {inputType(val);}

function params(val) {
	Array.isArray(val) 		 || throwE("expected array");
	val.forEach(description);
}
function inputBehavior(val) {
	["arguments","console"].includes(val) || throwE();
}
function outputBehavior(val) {
	["return", "callback", "onError/onSuccess","onTrue/onFalse","console"].includes(val) || throwE();
}
function onError(val) {
	["function", "string"].includes(typeof val) || throwE();
}
function validations(val) {
	if (typeof val === "function") {/** pass */} 
	// else if (Array.isArray(val))   { val.forEach((e)=>{
	// 	typeof e === "function" || throwE("expected function");
	// }); }
	else {throwE("unexpected handler")}
}
function block(val) {
	typeof val === "function" || throwE("expected block to be function");
}
function spec(val) {
	typeof val === "function" || throwE("expected spec to be function")
}
