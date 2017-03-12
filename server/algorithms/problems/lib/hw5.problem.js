var resource = require('../../resource.api.js').get_resource;


var run_search 		 	= resource('execution', 'grasp').run_grasp_search;
var GRASP 				= resource('search','GRASP');
var weightedGraph 		= resource('objective','weightedGraph').getSpanningTreeCost;
var neighborhood 	 	= resource('neighborhood','create');
var ranking 		 	= resource('ranking','create');
var evaluate 		 	= resource('evaluation','create');




exports.config = run_search({
	general : {
		number_of_iterations : 20,
	},
	objective_function : {
		run : weightedGraph, 
		params : {
			graph : {
				nodes : [
					{
						id : 'r',
						capacity : 0,		
					},
					{
						id : '1',
						capacity : 3,		
					},
					{
						id : '2',
						capacity : 2,		
					},
					{
						id : '3',
						capacity : 4,		
					},
					{
						id : '4',
						capacity : 1,		
					},
					{
						id : '5',
						capacity : 3,		
					},
				],
				edges : [
					{
						source : 'r',
						target : '1', 
						weight : 1
					},
					{
						source : 'r',
						target : '2', 
						weight : 6
					},
					{
						source : 'r',
						target : '3', 
						weight : 3
					},
					{
						source : 'r',
						target : '4', 
						weight : 2
					},
					{
						source : 'r',
						target : '5', 
						weight : 4
					},





					{
						source : '1',
						target : '2', 
						weight : 3
					},
					{
						source : '1',
						target : '3', 
						weight : 3
					},
					{
						source : '1',
						target : '4', 
						weight : 1
					},
					{
						source : '1',
						target : '5', 
						weight : 2
					},





					{
						source : '2',
						target : '3', 
						weight : 1
					},
					{
						source : '2',
						target : '4', 
						weight : 2
					},
					{
						source : '2',
						target : '5', 
						weight : 4
					},




					{
						source : '3',
						target : '4', 
						weight : 1
					},
					{
						source : '3',
						target : '5', 
						weight : 3
					},




					{
						source : '4',
						target : '5', 
						weight : 3
					},
				]
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
		run : GRASP,
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