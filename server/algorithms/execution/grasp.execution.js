exports.run_grasp_search = function(searchParams){

	try {

		// if(!current_best){
		var new_graph = searchParams.objective_function.params.graph;
		// console.log("new_graph")
		// console.log(new_graph)
		var new_grasp = searchParams.search_type.run.run(new_graph);
		console.log("current_path: " + new_grasp.join(", "))
		// console.log(new_grasp)
		// console.log("old_graph")
		// console.log(searchParams.objective_function.params.graph)
		var current_best = searchParams.objective_function.run(new_graph, new_grasp);
		console.log("current_best: " + current_best)
			// searchParams.search_type.params.current_best = current_best;
		// };
		for (j = 0; j < searchParams.general.number_of_iterations; j++) {

			var new_grasp = searchParams.search_type.run.run(new_graph);
			console.log("current_path: " + new_grasp.join(", "))
			var obj = searchParams.objective_function.run(new_graph, new_grasp);
			console.log("obj: " + obj)
			var evaluation = searchParams.evaluate.run(current_best, obj);
			// console.log("evaluation: " + evaluation)
			// console.log(evaluation)
			// console.log("\n")
			// searchParams.search_type.params.iteration += 1;
			// searchParams.objective_function.params.inital_value = bestValue.seq
			if(evaluation){
				current_best = obj;
				searchParams.search_type.params.current_best = current_best;
				// searchParams.search_type.run.update(bestValue.move, searchParams.search_type.params)
			// } else {
			// 	searchParams.search_type.run.update(bestValue.move, searchParams.search_type.params)			
			// }
			};
		}
		return current_best

	} catch(e){
		console.log(e)
	}

};
