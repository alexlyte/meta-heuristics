// At each iteration obtain a neighbor in a random or organized way
// Moves that improve the solution are always accepted
// Moves that do not improve the solution are accepted using a probability. 



// tabu list asks 'is this in the restricted set?'
// sa says 'is it greater than some percentage?'

exports.run = function(current_best, new_value, params){
	// if this improves the solution, then accept it
	// if it doesn't, use the formula to create a probability
	// if the probability is greater than a random 01, accept

	if(current_best > new_value){
		return true
	} else if((params.t_min <= params.T)  && (params.t_max >= params.T)){
		// if it doesn't, use the formula to create a probability
		var rand_prob = Math.random();
		// if(  ){
			var delta = current_best - new_value;
			var exp_p = Math.exp((delta/params.T))
			// console.log()
			console.log("rand_prob: " + rand_prob)
			console.log("exp_p: " + exp_p)
			return exp_p > rand_prob
		// } else {
		// 	return false
		// }

	} else {
		return false		
	}

};


exports.check = function(set, sa_params){


	// var condition = (exports.tabuList.indexOf(set) === -1);
	// if(condition){
		return true
	// } else {
	// 	return false
	// }
};

exports.update = function(elm, params){
	// this function will update the T value
	// which forms the denominator in the 'check' function

	// the 'elm' will be the current T value 
	// and the current index
	// we mix that with the alphas and betas for cooling schedules
	// and return a new T value

	if(params.cooling_schedule == "linear"){
		params['T'] = params['T'] - params.iteration*params.beta
	}

	// if(exports.tabuList.indexOf(elm) === -1){
	// 	if(exports.tabuList.length >= params){
	// 		exports.tabuList.pop()
	// 		exports.tabuList.splice(0,0,elm)
	// 	} else {
	// 		exports.tabuList.push(elm)		
	// 	}		
	// }
};

exports.tabuList = [];



