"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var funC_temp_1 = require("./funC.temp");
// let alg = require("./func.temp.js");
var alg = funC_temp_1.funC;
console.log(alg);
// alg.globalConfig(config);
// alg.funC(funcConfiguration);
// alg.instance(name,instanceConfiguration);
// alg.instance(name).funC(funCconfiguration);
// alg.instance(name).funC(funCconfiguration);
console.log("Setting global configuration");
var globalConfigure = {
    // name: 			"add",		// function name
    // description:    "sums two digits together", 	// what the function does
    author: "djtinkers365@gmail.com",
    // notes: 			["nothing","to","report"],   // no comments allowed in code, data inputs only 
    isStrict: true,
    isAsync: true,
    isThis: true,
    // isAnonymous:    false,
    isCapsule: false,
    inputType: "number",
    outputType: "number",
    params: ["a", "b"],
    inputBehavior: "arguments",
    outputBehavior: "return",
    onError: "throw",
};
alg.globalConfig(globalConfigure);
console.log("Setting instance configuration");
alg.instance("instance 1", {
    isStrict: false,
});
alg.instance("instance 2", {
    isAsync: false,
    validations: function () { return !Number.isNaN(a) && !Number.isNaN(b); },
});
alg.instance("instance 3", {
    isThis: false,
});
alg.instance("instance 4", {
    inputType: "boolean",
    outputType: "boolean"
});
var catchedE = false;
try {
    alg.instance("instance 4", {});
    console.log("failed overwrite throw error");
}
catch (error) {
    catchedE = true;
    console.log('passed overwrite');
}
if (catchedE === false) {
    throw new Error();
}
console.log("Testing individual differences");
var a = alg.instance("instance 2").funC({
    name: "add",
    description: "sums two digits together",
    block: function () { return a + b; },
    spec: function () { } // unit tests performed on the function  
});
console.log(a.toString());
a(4, 5) === 9 || (function () { throw new Error(); })();
var b = alg.instance("instance 2").funC({
    name: "sub",
    description: "subtracts two digits together",
    block: function () { return a - b; },
    spec: function () { } // unit tests performed on the function  
});
b(4, 5) === -1 || (function () { throw new Error(); })();
var c = alg.instance("instance 2").funC({
    name: "div",
    description: "divides two digits together",
    block: function () { return a / b; },
    spec: function () { } // unit tests performed on the function  
});
c(4, 5) === .8 || (function () { throw new Error(); })();
var d = alg.instance("instance 2").funC({
    name: "mul",
    description: "multiplies two digits together",
    block: function () { return a * b; },
    spec: function () { } // unit tests performed on the function  
});
d(4, 5) === 20 || (function () { throw new Error(); })();
console.warn("test capsule");
