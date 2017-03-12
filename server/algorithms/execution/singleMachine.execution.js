
exports.run_search = function(searchParams){

	try {
		var objective = searchParams.objective_function.run;
		var config = searchParams.objective_function.params;
		var iterations = searchParams.general.number_of_iterations;
		var neighborhood = searchParams.neighborhood.run;
		var ranking = searchParams.ranking.run;
		var evaluate = searchParams.evaluate.run;
		var heuristic = searchParams.search_type.run;
		var heuristic_params = searchParams.search_type.params;



		if(!current_best){
			var current_best = objective(config);
			// console.log("initial current_best: ");
			// console.log(current_best)
		};
		var best_seq = "";
		for (j = 0; j < iterations; j++) {

			var p_set = neighborhood(searchParams);
			// console.log("p_set")
			// console.log(p_set)
			var bestValue = ranking(p_set, objective, config);
			// console.log("newBestValue: " + bestValue.value);
			// console.log("current_best: " + current_best.value);
			var evaluation = evaluate(bestValue.value, current_best.value,  heuristic_params);
			// console.log("evaluation: " + evaluation)
			// console.log("\n")
			searchParams.search_type.params.iteration += 1;
			// config.initial_value = bestValue.seq;
			if(evaluation && (searchParams.seq !== '')){
				current_best.value = bestValue.value;
				// console.log('test')
				current_best.seq = (bestValue.seq==='')?(config.initial_value):(bestValue.seq);
				heuristic_params.current_best = current_best;
				heuristic.update(bestValue.move, heuristic_params)
			} else {
				heuristic.update(bestValue.move, heuristic_params)			
			}
		};
		return current_best

	} catch(e){
		console.log(e)
	}

};
