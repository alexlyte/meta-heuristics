
exports.evalSolution = function(y){
	var a = parseInt(y, 2);
	var regs = /y/ 
	var formula = ("Math.pow(y, 2)-30*y*Math.cos(50*y)+20*y*Math.sin(70*y)").replaceAll(regs,a);
	var obj = eval(formula);
	return obj
};


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
