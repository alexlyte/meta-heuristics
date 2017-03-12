var resource = require('../../resource.api.js').get_resource;


var run_search 		 	= resource('execution', 'standard').run_search;
var simulatedAnnealing 	= resource('search','simulatedAnnealing');
var minimizeFunction 	= resource('objective','minimizeFunction').evalSolution;
var neighborhood 	 	= resource('neighborhood','create');
var ranking 		 	= resource('ranking','create');
var evaluate 		 	= resource('evaluation','create');




exports.config = run_search({
	general : {
		number_of_iterations : 100,
	},
	objective_function : {
		run : minimizeFunction, 
		params : {
			initial_value : "00011",
		}
	},
	neighborhood : {
		run : neighborhood.binary.flip,
		params : {
			size_of_neighborhood : 1
		}
	},
	search_type : {
		run : simulatedAnnealing,
		params : {
			 T : 500,
			 t_min : 100,
			 t_max : 500,
			 sigma : 0.9,
			 beta : 0.5,
			 alpha : 0.5,
			 cooling_schedule : "linear",
			 iteration : 0
		}
	},
	ranking : {
		run : ranking.minObjectiveValue
	},
	evaluate : {
		run : simulatedAnnealing.run
	}
});