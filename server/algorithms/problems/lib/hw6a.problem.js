var resource = require('../../resource.api.js').get_resource;


var run_search 		 	= resource('execution', 'atc').run_job_search;
var ATC 				= resource('search','ATC').run;
var flexibleFlowShop 	= resource('objective','flexibleFlowShop').getWeightedTardinessAndCompletion;
var neighborhood 	 	= resource('neighborhood','create');
var ranking 		 	= resource('ranking','create');
var evaluate 		 	= resource('evaluation','create');




exports.config = run_search({
	general : {
		number_of_iterations : 20,
	},
	objective_function : {
		run : flexibleFlowShop, 
		params : {
			initial_value : "21435",
			jobs : {
				"1" : {
					'p' : 13,
					'd' : 6,
					'w' : 2
				},
				"2" : {
					'p' : 9,
					'd' : 18,
					'w' : 4
				},
				"3" : {
					'p' : 13,
					'd' : 10,
					'w' : 2
				},
				"4" : {
					'p' : 10,
					'd' : 11,
					'w' : 5
				},
				"5" : {
					'p' : 8,
					'd' : 13,
					'w' : 4
				}
			}
		}
	},
	neighborhood : {
		run : neighborhood.permutation.exchange,
		params : {
			size_of_neighborhood : 4
		}
	},
	search_type : {
		run : ATC,
		params : {
			tabu_length : 3,
			K : 1
		}
	},
	ranking : {
		run : ranking.minObjectiveValue
	},
	evaluate : {
		run : evaluate.lessThan
	}
})