// take the npm run input
// use it to call one of the problem scripts

var myArgs = process.argv.slice(2);
console.log(myArgs)
var p_name = "./lib/" + myArgs[0] + ".problem.js";
var problem = require(p_name).config;
console.log(problem)


