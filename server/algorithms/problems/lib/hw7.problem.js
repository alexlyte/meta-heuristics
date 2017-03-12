





var resource = require('../../resource.api.js').get_resource;


var run_search 		 	= resource('execution', 'shiftingBottleneck').run_job_search;
var tabu 				= resource('search','tabu');
var singleMachineShop 	= resource('objective','singleMachineShop').getLateness;
var neighborhood 	 	= resource('neighborhood','create');
var ranking 		 	= resource('ranking','create');
var evaluate 		 	= resource('evaluation','create');


// the shifting bottleneck heuristic
// will use a graph as the parameter
// and will calculate the makespan of the sequence. 

// much in the same way as the ATC heuristic, 
// it will be producing a single best sequence
// for the machines. 




exports.config = run_search({
	general : {
		number_of_iterations : 20,
	},
	objective_function : {
		run : singleMachineShop, 
		params : {
			initial_value : "21435",
			jobs : [
				[10,8,4],
				[8,3,5,6],
				[4,7,3]
			],
			sequence : [
				[1,2,3],
				[2,1,4,3],
				[1,2,4]
			]
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
		run : ranking.minObjectiveValue
	},
	evaluate : {
		run : evaluate.lessThan
	}
})






