
exports.run_search = function(searchParams){

	try {
		if(!current_best){
			var current_best = searchParams.objective_function.run(searchParams.objective_function.params.inital_value);
		};
		for (j = 0; j < searchParams.general.number_of_iterations; j++) {

			var p_set = searchParams.neighborhood.run(searchParams);
			// console.log("p_set")
			// console.log(p_set)
			var bestValue = searchParams.ranking.run(p_set, searchParams.objective_function.run);
			console.log("bestValue: " + bestValue.value)
			console.log("current_best: " + current_best)
			// console.log(bestValue)
			var evaluation = searchParams.evaluate.run(current_best, bestValue.value, searchParams.search_type.params);
			console.log("evaluation: " + evaluation)
			// console.log(evaluation)
			console.log("\n")
			searchParams.search_type.params.iteration += 1;
			searchParams.objective_function.params.inital_value = bestValue.seq
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

