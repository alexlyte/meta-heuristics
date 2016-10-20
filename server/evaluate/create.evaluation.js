// a function which takes two values and evaluates them

exports.greaterThan = function(v1,v2){
	if(v1 > v2){
		return true
	} else {
		return false
	}
};

exports.lessThan = function(v1,v2){
	if(v1 < v2){
		return false
	} else {
		return true
	}
};
