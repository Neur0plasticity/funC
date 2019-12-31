"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var funC_interface_1 = require("./funC.interface");
/*
    func is configurable
    * it can be a module of it's own
    * it can be tweakable in it's environment
*/
var gConfig = {};
var instances = {};
var configs = {};
var funcs = {};
var intF = funC_interface_1.funCinterface;
var itf_keys = Object.keys(intF);
var incConfig = function (config, name) {
    name = name || (function () { throw new Error(); })();
    configs[name] = config;
};
var inheritConfig = function (config_inherit, config_inheritor) {
    for (var k in config_inherit)
        !config_inheritor.hasOwnProperty(k) && (config_inheritor[k] = config_inherit[k]);
};
var confiGmain = function (config) {
    allPropsRequired: for (var k in itf_keys) {
        k = itf_keys[k];
        // console.log(k, config[k]);
        if (!config.hasOwnProperty(k)) {
            throw new Error(k);
        }
    }
    allPropsValidated: for (var k in itf_keys) {
        k = itf_keys[k];
        // console.log(k, config[k]);
        intF[k](config[k]);
    }
};
var fakeIfNull = function (obj, prop, val) {
    if (!obj.hasOwnProperty(prop)) {
        obj[prop] = val;
    }
};
fakeIfNull.namE = function (obj) { fakeIfNull(obj, 'name', "fake name to pass test"); };
fakeIfNull.description = function (obj) { fakeIfNull(obj, 'description', "fake description to pass the test"); };
fakeIfNull.author = function (obj) { fakeIfNull(obj, 'author', "fake author"); };
fakeIfNull.notes = function (obj) { fakeIfNull(obj, 'notes', ["fake notes to pass the test"]); };
fakeIfNull.validations = function (obj) { fakeIfNull(obj, 'validations', function () { }); };
fakeIfNull.block = function (obj) { fakeIfNull(obj, 'block', function () { }); };
fakeIfNull.spec = function (obj) { fakeIfNull(obj, 'spec', function () { }); };
var confiGglobal = function (config) {
    fakeIfNull.namE(config);
    fakeIfNull.description(config);
    fakeIfNull.author(config);
    fakeIfNull.notes(config);
    fakeIfNull.validations(config);
    fakeIfNull.block(config);
    fakeIfNull.spec(config);
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
var confiGinstance = function (name, config) {
    if (!name) {
        throw new Error();
    }
    if (name && config) {
        if (instances[name]) {
            throw new Error("no duplicates allowed");
        }
        var gConfig_clone = Object.assign({}, gConfig);
        console.log("c before", config);
        inheritConfig(gConfig_clone, config);
        console.log("c after", config);
        fakeIfNull.namE(config);
        fakeIfNull.description(config);
        fakeIfNull.author(config);
        fakeIfNull.notes(config);
        fakeIfNull.validations(config);
        fakeIfNull.block(config);
        fakeIfNull.spec(config);
        confiG(config);
        // delete config.name;
        // delete config.description;
        // delete config.author;
        // delete config.notes;
        // delete config.validations;
        // delete config.block;
        // delete config.spec;
        instances[name] = config;
        incConfig(config, name);
        return { funC: func.bind({ config: config }) };
    }
    else if (name) {
        config = instances[name];
        console.log('c', config);
        if (!config) {
            throw new Error();
        }
        return { funC: func.bind({ config: config }) };
    }
    else {
        throw new Error();
    }
};
var confiGfunC = function (config) {
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
;
var meths = {
    global: confiGglobal,
    instance: confiGinstance,
    funC: confiGfunC
};
var confiG = Object.freeze(Object.assign(confiGmain, meths));
var func = function (config) {
    if (typeof this.config === "object") {
        inheritConfig(this.config, config);
    }
    confiG.funC(config);
    var c = config;
    templatefunction: {
        var name_1 = c.name;
        var description = c.description;
        var author = c.author;
        var notes = c.notes;
        var params = c.params;
        var strict = c.isStrict ? '"use strict";' : "";
        var async = c.isAsync ? 'async ' : '';
        var _this = c.isThis ? (async + "function " + name_1 + "(" + params + ") ") : ("const " + name_1 + " = " + async + "(" + params + ") => ");
        // let isCapsule		    = c.isCapsule === true;
        var inputType = c.inputType;
        var outputType = c.outputType;
        var inputBehavior = c.inputBehavior;
        var outputBehavior = c.outputBehavior;
        var onError = c.onError;
        var validations = c.validations;
        var block = c.block;
        var spec = c.spec;
        var cb = "/*\n\t\t* author: " + author + "\n\t\t* description: " + description + "\n\t\t* notes: " + notes + "\n\t\t*/\n\t\treturn (" + validations + ")(" + params + ") && (" + block + ")(" + params + ");\n\t\t/* spec\n\t\t\t" + spec + "\n\t\t*/";
        console.log(cb);
        // cb = isCapsule?capsule(cb):cb;
        return new Function(params, "" + cb);
    }
};
;
var pm = Object.freeze({
    globalConfig: confiG.global,
    instance: confiG.instance,
    funC: func
});
exports.funC = pm;
