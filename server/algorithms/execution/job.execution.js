

exports.run_job_search = function(searchParams){

	try {
		var objective = searchParams.objective_function.run;
		var initial_value = searchParams.objective_function.params.initial_value;
		var config = searchParams.objective_function.params.jobs;
		var neighborhood = searchParams.neighborhood.run;
		var iterations = searchParams.general.number_of_iterations;
		var iteration = searchParams.search_type.params.iteration;
		var ranking = searchParams.ranking.run;
		var evaluate = searchParams.evaluate.run;

		var search_type = searchParams.search_type.run;
		var search_params = searchParams.search_type.params;
		var cb = searchParams.search_type.params.current_best;


		if(!current_best){
			var current_best = objective(initial_value, config);
			var cbs = "";
		};
		for (j = 0; j < iterations; j++) {
			// console.log('getting neighborhood')
			// console.log(neighborhood)
			var p_set = neighborhood(searchParams);
			// console.log("p_set")
			// console.log(p_set)
			var bestValue = ranking(p_set, objective, config);
			// console.log("bestValue: " + bestValue.value)
			// console.log("current_best: " + current_best)
			// console.log(bestValue)
			var evaluation = evaluate(current_best, bestValue.value);
			// console.log("evaluation: " + evaluation)
			// console.log(evaluation)
			// console.log("\n")
			iteration += 1;
			initial_value = bestValue.seq
			if(evaluation){
				console.log('new best time: ' + bestValue.value);
				console.log('new best sequence: ' + initial_value);
				console.log("\n")
				current_best = bestValue.value;
				cb = current_best;
				cbs = initial_value;
				search_type.update(bestValue.move, search_params)
			} else {
				search_type.update(bestValue.move, search_params)			
			}
		};
		return current_best

	} catch(e){
		console.log(e)
	}

};
