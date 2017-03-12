var resource = require('../../resource.api.js').get_resource;


var run_search 		 	= resource('execution', 'standard').run_search;
var tabu 				= resource('search','tabu');
var assignmentShop 		= resource('objective','assignmentShop').getTotalSetupTime;
var neighborhood 	 	= resource('neighborhood','create');
var ranking 		 	= resource('ranking','create');
var evaluate 		 	= resource('evaluation','create');




exports.config = run_search({
	general : {
		number_of_iterations : 20,
	},
	objective_function : {
		run : assignmentShop, 
		params : {
			initial_value : "4213",
		}
	},
	neighborhood : {
		run : neighborhood.permutation.exchange,
		params : {
			size_of_neighborhood : 4
		}
	},
	search_type : {
		run : tabu,
		params : {
			tabu_length : 3,
		}
	},
	ranking : {
		run : ranking.maxObjectiveValue
	},
	evaluate : {
		run : evaluate.greaterThan
	}
});