export interface interface_funCinterface {
	name, description, author,
	notes,
	isStrict,isAsync,isThis,isCapsule,
	inputType,outputType,
	params,
	inputBehavior,outputBehavior,
	onError,
	validations,block,spec
};
let obj = {};
const d = ["arguments","console","return","callback","onError/onSuccess","onTrue/onFalse","throw"];
const datatypes:string[] = ["boolean","string","number","object","array","symbol","function"];
const throwE				:Function = (msg:string):void    => {throw new Error(msg);}
const standardString		:Function = (val:string):void    => {typeof val === "string"   || throwE("string required"); val.length > 0 || throwE("len must be gt 0");};
const standardStringArray	:Function = (val:string[]):void  => {Array.isArray(val) 	   || throwE("array required");val.forEach(standardString);};
const arrayIncludes			:Function = (arr:any[]):Function => {return (val:any):void=>{arr.includes(val) || throwE("unexpected value");}};
const standardBoolean		:Function = (val:string):void 	 => {typeof val === "boolean"  || throwE("boolean expected");};
const vFunction				:Function = (val:string):void    => {typeof val === "function" || throwE("expected 0arg to be function");};
["name","description","author"]				.forEach((e)=>{ obj[e] = standardString;});
["notes","params"]					   		.forEach((e)=>{ obj[e] = standardStringArray;});
["isStrict","isAsync","isThis","isCapsule"]	.forEach((e)=>{ obj[e] = standardBoolean;});
["inputType","outputType"]					.forEach((e)=>{ obj[e] = arrayIncludes(datatypes);});
["inputBehavior"]							.forEach((e)=>{ obj[e] = arrayIncludes([d[0],d[1]]);});
["outputBehavior"]							.forEach((e)=>{ obj[e] = arrayIncludes([d[1],d[2],d[3],d[4],d[5]]);});
["onError"]									.forEach((e)=>{ obj[e] = arrayIncludes([d[6]]);});
["validations","block","spec"]				.forEach((e)=>{ obj[e] = vFunction;});
export const funCinterface:interface_funCinterface = obj;
