// a function which takes two values and evaluates them

exports.greaterThan = function(v1,v2){
	if(v1 > v2){
		return true
	} else {
		return false
	}
};

exports.lessThan = function(v1,v2){
	// console.log("v1: " + v1)
	// console.log("v2: " + v2)
	var result = "meh";
	if(v1 < v2){
		result = false
	} else {
		result = true
	}
	return result
};


exports.lessThanSB = function(v1,v2){
	var result = "meh";
	if(v1 > v2){
		result = false
	} else {
		result = true
	}
	return result
};
