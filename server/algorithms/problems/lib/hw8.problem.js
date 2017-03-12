var resource = require('../../resource.api.js').get_resource;

var run_search 		 	= resource('execution', 'ga_tsp').run_job_search;
var ga 					= resource('search','ga');
var tsp 				= resource('objective','tsp').getLateness;
var neighborhood 	 	= resource('neighborhood','mutate');
var ranking 		 	= resource('ranking','create');
var evaluate 		 	= resource('evaluation','create');

exports.config = run_search({
	general : {
		number_of_iterations : 5,
	},
	objective_function : {
		run : tsp, 
		params : {
			initial_pop : [ "3214","2143", "3412"],
			cities : [
				[0, 13, 16, 8],
				[13, 0, 14, 15],
				[16, 14, 0, 9],
				[8, 15, 9, 0],
			],
		}
	},
	neighborhood : {
		run : neighborhood,
		params : {
			size_of_population : 3
		}
	},
	search_type : {
		run : ga,
		params : {
			population_size : 3,
			mutations_per_iteration : 1,
			crossover_points : 1
		}
	},
	ranking : {
		run : ranking.minObjectiveValueGA
	},
	evaluate : {
		run : evaluate.lessThan
	}
});

