
var inits = require('./SB/initialize.SB.js');
var step1 = require('./SB/step1.SB.js');
var step2 = require('./SB/step2.SB.js');

exports.initialize = function(jobs, sequence) {
	var G = {};
	var Graph = inits.createGraph(jobs, sequence);
	var init = inits.initialize(Graph);
	var G = init.G;
	G.initial_graph = Graph;
	G.Mo = init.Mo;
	G.all_machines = inits.get_Machines(G);
	G.machines = inits.get_Machines(G);
	return G
};


exports.step1 = function(G, execute, objective, neighborhood, search, ranking, evaluate) {
		var makespan = 0;

	var L = G.machines.map(function(machine) {

		console.log("iteration 1")
		console.log("machine "+machine)
		// console.log("G.initial_graph")
		// console.log(G.initial_graph)
		var table = step1.analyze_machine(G.initial_graph, machine, G.disjunctive_edges);
		console.log("table: ")
		console.log(table)
		console.log("\n")
		makespan = table[0].m;

		// console.log("G")
		// console.log(G)

		var Lmax = execute({
			general : {
				number_of_iterations : 1
			},
			objective_function : {
				run : objective, 
				params : {
					initial_value : "321",
					table : table
				}
			},
			neighborhood : {
				run : neighborhood.permutation.exchange,
				params : {
					size_of_neighborhood : 4
				}
			},
			search_type : {
				run : search,
				params : {
					tabu_length : 3
				}
			},
			ranking : {
				run : ranking.minObjectiveValueSB
			},
			evaluate : {
				run : evaluate.lessThanSB
			}
		});

		return {Lmax : Lmax.value, seq : Lmax.seq, machine : machine}
	})

	// ultimately we want to minimize the max lateness
	// so min not max this number

	console.log("L")
	console.log(L)

	var Max_Lmax = step1.get_Max_Lmax(L);
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log('machine chosen: ')
		console.log(Max_Lmax)
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
	G.Mo.push(Max_Lmax);
	G = step1.get_DisjunctiveEdges(G,Max_Lmax);	
	G.NEW_MAKESPAN_ADDER = Max_Lmax.Lmax + makespan;
	console.log("NEW_MAKESPAN_ADDER")
	console.log(G.NEW_MAKESPAN_ADDER)
	return G
};

exports.step2 = function(G, execute, objective, neighborhood, search, ranking, evaluate) {
	// These new paths can be considered the disjunctive constraints 
	// and they need to be taken into consideration when determining the new makespan. 
	// The disjunctive constraints are the machine constraints in our job shop. 
	// The new makespan will be the old makespan plus the maximum lateness of the machine 
	// determined to be the bottleneck.
	// console.log("ghg NEW_MAKESPAN_ADDER")
	// console.log(G.NEW_MAKESPAN_ADDER)


	// Get the remaining machines to be sequenced
	G.machines = step2.get_Remaining_Machines(G);
	var counter = 1;
	while(G.machines.length !== 0){
		G.disjunctive_edges.forEach(function(edge){
			G.initial_graph.edges.push(edge)
		});

		// For each machine
		// get the job stats (compare them to the walkthrough)

		var makespan = 0;
		var L = G.machines.map(function(machine) {
			// in this step we determine the 
			// release date, processing time, and due date
			// for the job
			console.log("iteration "+(counter+1))
			console.log("machine "+machine)
			// console.log("G.initial_graph")
			// console.log(G.initial_graph)
			G.initial_graph.NEW_MAKESPAN_ADDER = G.NEW_MAKESPAN_ADDER;
			var table = step1.analyze_machine(G.initial_graph, machine,  G.disjunctive_edges);
				console.log("iteration "+(counter+1))
				console.log("machine "+machine)
				console.log("table: ")
				console.log(table)
				console.log("\n")
				makespan = table[0].m;
			// release date of machine 3 is 17, I have 14
			// due date of machine 1 is 23, I have 13
			// 


			// for each job that has already been assigned, 
			// find the release date of that job
			// and add that to the due date
			// 



			// In this step, we try to syncronize all jobs on 
			// this machine, and determine the ordering of 
			// machines that maximizes the lateness
			var Lmax = execute({
				general : {
					number_of_iterations : 10
				},
				objective_function : {
					run : objective, 
					params : {
						initial_value : "123",
						table : table
					}
				},
				neighborhood : {
					run : neighborhood.permutation.exchange,
					params : {
						size_of_neighborhood : 4
					}
				},
				search_type : {
					run : search,
					params : {
						tabu_length : 3
					}
				},
				ranking : {
					run : ranking.maxObjectiveValueSB
				},
				evaluate : {
					run : evaluate.lessThanSB
				}
			});
			return {Lmax : Lmax.value, seq : Lmax.seq, machine : machine}
		})
		console.log("L")
		console.log(L)
		var Max_Lmax = step1.get_Max_Lmax(L);
		G.Mo.push(Max_Lmax);
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log('machine chosen: ')
		console.log(Max_Lmax)
		console.log('makespan')
		console.log(makespan)
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		console.log("yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
		G = step1.get_DisjunctiveEdges(G,Max_Lmax);	
		G.NEW_MAKESPAN_ADDER = Max_Lmax.Lmax + makespan;
		G.machines = step2.get_Remaining_Machines(G);
		counter++;
	}
	return G





	// BUT, each time you add a machine to the set Mo
	// do a step where you determine the largest bottleneck machine in Mo, 
	// and test it again... Not sure if this is a required feature yet


	// The next step is to perform a new analysis for each of the remaining machines. 
	
	// 




	// The due dates will be the time that the given job can be finished on the respective machine and 
	// still have enough time to finish the job on the proceeding machines within the makespan. 
	// The proceeding jobs are known from the precedence constraints.

	// Draw out the new disjunctive constraints on your drawing (see Iteration 2). 
	// This is considered the second iteration.

	// Again, determine which machine is the new bottleneck. 
	// The new makespan is the old makespan plus the maximum lateness from the new bottleneck. 
	// Again, if the maximum lateness on all machines is zero then use all the paths for the 
	// disjunctive constraints on the drawing and the makespan is still the same as it was before.





};


