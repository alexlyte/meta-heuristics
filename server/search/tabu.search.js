exports.check = function(set){
	var condition = (exports.tabuList.indexOf(set) === -1);
	if(condition){
		return true
	} else {
		return false
	}
};

exports.update = function(elm, params){
	if(exports.tabuList.indexOf(elm) === -1){
		if(exports.tabuList.length >= params.tabu_length){
			exports.tabuList.pop()
			exports.tabuList.splice(0,0,elm)
		} else {
			exports.tabuList.push(elm)		
		}		
	}
};

exports.tabuList = [];



