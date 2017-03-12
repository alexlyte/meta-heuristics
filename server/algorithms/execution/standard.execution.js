// var Q = require('q')

// exports.run_search = function(searchParams){
// 	return Q.Promise(function(resolve, reject, notify) {	 
// 	        try {
// 	        	if(!current_best){
// 	        		var current_best = searchParams.objective_function.run(searchParams.objective_function.params.inital_value);
// 	        	};
// 	        	for (j = 0; j < searchParams.general.number_of_iterations; j++) {
// 	        		var p_set = searchParams.neighborhood.run(searchParams);
// 	        		var bestValue = searchParams.ranking.run(p_set, searchParams.objective_function.run);
// 	        		var evaluation = searchParams.evaluate.run(current_best, bestValue.value, searchParams.search_type.params);
// 	        		searchParams.search_type.params.iteration += 1;
// 	        		searchParams.objective_function.params.inital_value = bestValue.seq
// 	        		if(evaluation){
// 	        			current_best = bestValue.value;
// 	        			searchParams.search_type.params.current_best = current_best;
// 	        			searchParams.search_type.run.update(bestValue.move, searchParams.search_type.params)
// 	        		} else {
// 	        			searchParams.search_type.run.update(bestValue.move, searchParams.search_type.params)			
// 	        		}
// 	        		notify(current_best)
// 	        	};
// 	        	resolve(current_best)
// 	        } catch(e){
// 	        	console.log('run_search err')
// 	        	console.log(e)
// 	        	reject(e)
// 	        }
//     });
// };

// for GRASP, the alg may go like so: 
// - create an initial empty set
// - create a potential Restricted Candidate List (objective function)
// - evaluate potential candidates, choose the minimum (GRASP)
// - iterate until all nodes created (GRASP)
// - get spanning tree cost (objective function)
// - compare spanning tree cost to current best







exports.run_search = function(searchParams){

	try {
		if(!current_best){
			var current_best = searchParams.objective_function.run(searchParams.objective_function.params.initial_value);
		};
		for (j = 0; j < searchParams.general.number_of_iterations; j++) {

			var p_set = searchParams.neighborhood.run(searchParams);
			console.log("p_set")
			console.log(p_set)
			var bestValue = searchParams.ranking.run(p_set, searchParams.objective_function.run);
			console.log("bestValue: " + bestValue.value)
			console.log("current_best: " + current_best)
			// console.log(bestValue)
			var evaluation = searchParams.evaluate.run(current_best, bestValue.value, searchParams.search_type.params);
			console.log("evaluation: " + evaluation)
			// console.log(evaluation)
			console.log("\n")
			searchParams.search_type.params.iteration += 1;
			searchParams.objective_function.params.initial_value = bestValue.seq
			if(evaluation){
				current_best = bestValue.value;
				 searchParams.search_type.params.current_best = current_best;
				searchParams.search_type.run.update(bestValue.move, searchParams.search_type.params)
			} else {
				searchParams.search_type.run.update(bestValue.move, searchParams.search_type.params)			
			}
		};
		return current_best

	} catch(e){
		console.log(e)
	}

};
