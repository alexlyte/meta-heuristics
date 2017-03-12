exports.run_job_search = function(params) {

	// using an initial population of job sequences
	// try each of the orderings
	// for each one, evaluate the job time
	// return the population job times
	// call the ranking function, and choose the top 2
	// crossover one of the elements in each one
	// mutate one of the elements in each one
	// do this for 5 iterations

	var objective_function = params.objective_function;
	var obj_params = objective_function.params;
	var obj = objective_function.run;

	var neighborhood = params.neighborhood;
	var neighborhood_params = neighborhood.params;
	var nbh = neighborhood.run;

	var search = params.search_type;
	var ga_params = search.params;
	var ga = search.run;

	var ranking = params.ranking.run;
	var evaluate = params.evaluate.run;

	var iterations = params.general.number_of_iterations;

	// for each iteration
	var current_best;
	for (var i = iterations-1; i >= 0; i--) {
		// evaluate the current population
		var outcomes = obj_params.initial_pop.map(function(d) {
			return {
				seq : d,
				obj : obj(d, obj_params.cities)
			}
		});

		// rank it and grab the best 2 
		var ranked = ranking(outcomes);
		console.log("ranked")
		console.log(ranked)
		var new_seq = ga.do_genetics(ranked, 0.6);
		obj_params.initial_pop = new_seq.map(function(d) {
			return d.join("");
		})	
		console.log('new obj_params.initial_pop ')
		console.log(obj_params.initial_pop )
		console.log("\n")		
	};
};