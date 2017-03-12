var resource = require('../../resource.api.js').get_resource;


var run_search 		 = resource('execution', 'standard').run_search;
var tabu 			 = resource('search','tabu');
var minimizeFunction = resource('objective','minimizeFunction').evalSolution;
var neighborhood 	 = resource('neighborhood','create');
var ranking 		 = resource('ranking','create');
var evaluate 		 = resource('evaluation','create');




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
			size_of_neighborhood : 4
		}
	},
	search_type : {
		run : tabu,
		params : {
			tabu_length : 1,
		}
	},
	ranking : {
		run : ranking.minObjectiveValue
	},
	evaluate : {
		run : evaluate.lessThan
	}
});