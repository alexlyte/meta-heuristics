


// Shifting Bottleneck Notes: 


// M is the set of all machines. 

// In each iteration:
// - Assume in previous iterations a selection
//   of disjunctive arcs has been fixed for a subset
//   of Mo., each of which has a predetermined set
//   of operations. 
// - the result of the iteration is the selection of 
//   a machine M - Mo. for insertion into Mo.
// - the sequence of the jobs on the machine are generated
// - the task of the iteration is to determine 
//   which unscheduled machine causes the severest 
//   disruption. This is done by modifying the original
//   graph by deleting all disjunctive arcs on machines 
//   still to be scheduled, and keeping only the 
//   relevant disjunctive arcs of the machines in set Mo.
//   Call this graph G*. Thus, all jobs can be done 
//   in parallel, and the critical paths can be determined. 
//   Call this makespan Cmax(Mo.)


////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////






////////////////////////////////////////////////////////
// Initial Setup: 
////////////////////////////////////////////////////////

// Set Mo = {}; This will be the set of nodes (machines) 
//	in the graph that have been fixed
					
// Set G  = { nodes : [], edges : []}; This will be the original 
// graph with all conjunctive edges and no disjunctive edges
// (e.g. the routes of the jobs, not jobs that have to be 
// processed on the same machine)

// Set Cmax(Mo) equal to the longest path in graph G

////////////////////////////////////////////////////////



////////////////////////////////////////////////////////
// Step 2. Analysis of machines still to be scheduled 
////////////////////////////////////////////////////////

// for each machine i in set M − M0 the following:
//   (get critical path and makespan)

// - formulate a single machine problem with all operations 
//   subject to release dates and due dates

// makespan: maximum total processing time required for any job
// 


// Calculate the makespan of G, the graph, using the 
// conjunctive arcs

// (CP - pj) is the processing times of the jobs succeeding 
// the job on the respective machine

// therefore CP is the processing time of all jobs
// including the job on the respective machine


//  dj = LB − (CP − pj)

// 10 = 22 - (CP - 10)
// CP = 22

// 11 = 22 - (CP - 3)
// CP = 14

// 12 = 22 - (CP - 4)
// CP = 14

// So, add up the processing time of all the machines
// in this job that come after the machine you are on

// - the release date of operation (i,j) is determined 
//   by the longest path in graph G from the source to node (i,j)

// - the due date of operation (i,j) can be computed 
//   by considering the longest path in graph G from node (i,j) 
//   to the sink and subtracting pij

// - The due date, denoted dij, is determined by subtracting 
//   the processing times of the jobs succeeding the job on 
//   the respective machine from the makespan. 


// - Minimize the Lmax in each one of these single 
//   machine subproblems


// - Let Lmax(i) denote the minimum Lmax in the subproblem 
//   corresponding to machine i (Maximum Lateness)

// create array of Lmax(i) variables L

////////////////////////////////////////////////////////





////////////////////////////////////////////////////////
// Step 3. (Bottleneck selection and sequencing)
////////////////////////////////////////////////////////

// Let Lmax(h) = max (Lmax(i)) 
//                  i ∈ {M − M0 }

// getMaxLmax(L)

// Sequence machine h according to the sequence generated 
// for it in Step 2.



// Insert all the corresponding disjunctive arcs in graph G.

// Insert machine h in M0

////////////////////////////////////////////////////////



////////////////////////////////////////////////////////
// Step 4. (Resequencing of all machines scheduled earlier)
////////////////////////////////////////////////////////

// Do for each machine l ∈ {M0 − h} the following:
// - Delete the corresponding disjunctive arcs from G;
// - formulate a single machine subproblem for machine l 
//   with release dates and due dates of the operations 
//   determined by longest path calculations in G
// - Find the sequence that minimizes Lmax(l) and insert 
//   the corresponding disjunctive arcs in graph G


////////////////////////////////////////////////////////



function testOtherMachines(argument) {
	// body...
}



function visualizeGanttChart(gantt){
	var machines = Object.keys(gantt);

	function getJob(s, data) {
		return data.filter(function(f) {
			return f.source === s
		})[0];
	};

	function fill_the_void(current, start, fill) {
		while(current.length < start){
			current.push(fill)
		};
		return current
	};

	var gantt_seq = [];
	machines.forEach(function(m){
		var m_msg = [];
		// console.log(m)
		// console.log(gantt[m].seq)
		// console.log(gantt[m].data)
		gantt[m].seq.forEach(function(si) {
			// console.log(si)
			var job = getJob(si, gantt[m].data);
			var job_name = job.source.split("_")[1];
			if(m_msg.length < job.start_time){
				m_msg = fill_the_void(m_msg, job.start_time, "_")
			};
			m_msg = fill_the_void(m_msg, job.end_time, job_name)
		})
		gantt_seq.push((m+": "+m_msg.join("") ))
	})
	return (gantt_seq)
};

function makeGanttChart(edges, dis) {

	function match_edge(name) {
		return edges.filter(function(edge) {
			return edge.source === name
		})[0]
	};


	function determine_start_time(job) {
		// check the Gantt chart
		// see if the job exists anywhere else
		// if it does, check the start and 
		// end date. If the job can be sequenced
		// and finish before the start date, then 
		// add it to the sequence
		// if it can't then make the start time
		// equal to the time that the job is free 
		// from it's obligation... 
		var job_num = job.source.split("_")[1];
		var machines = Object.keys(job_sequence);
		var scheduled_jobs = [];
		console.log('made it here')
		console.log(machines)
		machines.forEach(function(mac) {
			var seq = job_sequence[mac].data;
			console.log("seq")
			console.log(seq)
			var matches = seq.filter(function(f) {
				console.log('f')
				console.log(f)
				var job_nm = f.source.split('_')[1];
				return job_nm === job_num
			});
			console.log(matches)
			matches.forEach(function(d) {
				scheduled_jobs.push(d)
			})
		})
		console.log('determining time for:')
		console.log(job.source)
		console.log('matching sequences:')
		console.log(scheduled_jobs)
	};


	if(dis.length === 0){
		return undefined
	} else {
		var job_sequence = {};
		console.log('making gantt chart')

		dis.forEach(function(d) {
			var machine_name = d.source.split("_")[0];
			var source = match_edge(d.source);
			console.log('source')
			console.log(source)
			var target = match_edge(d.target_name);
			console.log('target')
			console.log(target)
			// if the machine is already in the set
			// add the job to it

			// however, if a job has already been 
			// sequenced for that time, add an object
			// to the array representing the difference


			if(job_sequence[machine_name]){
				if((job_sequence[machine_name]["seq"].indexOf(d.source) === -1)){
					job_sequence[machine_name]["seq"].push(d.source)
					job_sequence[machine_name]["data"].push(source)
					job_sequence[machine_name]["p"] += source.p;
					source.start_time = job_sequence[machine_name]["p"];
					job_sequence[machine_name]["p"] += source.p;
					source.end_time = job_sequence[machine_name]["p"];
				}
				if( (job_sequence[machine_name]["seq"].indexOf(d.target_name) === -1)  ){
					job_sequence[machine_name]["seq"].push(d.target_name)
					job_sequence[machine_name]["data"].push(target)
					job_sequence[machine_name]["p"] += target.p;

					target.start_time = job_sequence[machine_name]["p"];
					job_sequence[machine_name]["p"] += target.p;
					target.end_time = job_sequence[machine_name]["p"];
				}
			} else {
				var source = match_edge(d.source);
				var target = match_edge(d.target_name);

				job_sequence[machine_name] = {};
				job_sequence[machine_name]["p"] = 0;
				job_sequence[machine_name]["seq"] = [];
				job_sequence[machine_name]["data"] = [];

				job_sequence[machine_name]["seq"].push(d.source)
				job_sequence[machine_name]["seq"].push(d.target_name)

				job_sequence[machine_name]["data"].push(source)
				job_sequence[machine_name]["data"].push(target)
				console.log('determining start time')
				var starter = determine_start_time(d);
				source.start_time = job_sequence[machine_name]["p"];
				job_sequence[machine_name]["p"] += source.p;
				source.end_time = job_sequence[machine_name]["p"];

				target.start_time = job_sequence[machine_name]["p"];
				job_sequence[machine_name]["p"] += target.p;
				target.end_time = job_sequence[machine_name]["p"];
				// console.log(match_edge(d.target_name))
			}
		});			
	}
	return job_sequence
};



////////////////////////////////////////////////////////
// Step 5. (Stopping criterion)
////////////////////////////////////////////////////////

// - If M0 = M then STOP, otherwise go to Step 2.

////////////////////////////////////////////////////////



exports.run_job_search = function(searchParams){

	try {


		var resource 		= require('../resource.api.js').get_resource;
		var run_search 		= resource('execution', 'singleMachine').run_search;
		var SB 				= resource('search','shiftingBottleneck');
		var tabu 			= resource('search','tabu');
		var neighborhood 	= resource('neighborhood','create');
		var ranking 		= resource('ranking','create');
		var evaluate 		= resource('evaluation','create');

		
		var objective = searchParams.objective_function.run;
		var initial_value = searchParams.objective_function.params.initial_value;
		var config = searchParams.objective_function.params;
		var heuristic = searchParams.search_type.run;
		var heuristic_params = searchParams.search_type.params.K;


		// Step 1: Determine the first node to add to the set Mo; Add it to Mo.
		// Step 2: Perform Step 1, given the nodes in Mo;
		// Step 3: Remove the node in Mo with the largest Makespan; Repeat Step 2;
		// Step 4: Repeat Steps 2 and 3 until all nodes are in Mo;


		var G = SB.initialize(config.jobs, config.sequence)
		G = SB.step1(G, run_search, objective, neighborhood, tabu, ranking, evaluate)
		G = SB.step2(G, run_search, objective, neighborhood, tabu, ranking, evaluate)

		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
		console.log("G.disjunctive_edges")
		console.log(G.disjunctive_edges)
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!")
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!")



		// console.log("G.edges")
		// console.log(G.disjunctive_edges)

		var gantt = makeGanttChart(G.edges, G.disjunctive_edges)
		console.log('Gantt')
		console.log(gantt['1'].data)
		console.log(gantt['2'].data)
		console.log(gantt['3'].data)
		console.log(gantt['4'].data)
		var vis = visualizeGanttChart(gantt);
		console.log('Gantt chart')
		console.log(vis.map(function(d) {
			return { s : d, p : d.length}
		}))

		// Object.keys(gantt).forEach(function(k) {
		// 	var val = gantt[k]
		// })

		// add that machine to Mo
		// remove it from G, to create G"
		// use G" to get the max lateness

		// then resequence machine 1, 
		// see if it gives you any improvement






// jobs that get scheduled should be only those that
// are availavle on the current machine
// so if, for this machine, for this job, 
// it is possible to schedule this job, 
// then go ahead
// so, for a given job, you must determine if it
// is available or not, based on it's current
// place in the sequence

// so, if a job requires the sequence 123, and 
// it hasn't run on anything, it is only available
// to run on machine 1
// if it is not on machine 1, then the job can't be sequenced








		// First, determine the makespan and critical path of 
		// the entire graph

		// 

		// for each machine in the network, 
		// - get all the jobs that run on that machine
		// - get the makespan of those jobs (the total processing time)
		// - 



		// var seq = "";
		// var cd = 0;
		// console.log(config)
		// var jobs = Object.keys(config).map(function(job, i){config[job].index_num = (i+1);return (config[job]) })
		// console.log(jobs)
		// // console.log(job)

		// while (jobs.length > 0){
		// 	var job = heuristic(cd, jobs, heuristic_params);
		// 	seq += job.index_num;
		// // console.log('job')
		// 	// console.log(job)
		// 	// console.log(jobs)
		// 	jobs.splice(job.max_index, 1);
		// 	console.log(jobs)
		// }
		// console.log("seq")
		// console.log(seq)
		// console.log(config)
		// // if(!current_best){
		// var current_best = objective(seq, config);
		// // };
		// return current_best

	} catch(e){
		console.log(e)
	}

};





Array.prototype.findIndex = Array.prototype.findIndex || function(evaluator, thisArg) {
    'use strict';
    if (!this) {
        throw new TypeError('Array.prototype.some called on null or undefined');
    }
    
    if (typeof(evaluator) !== 'function') {
        if (typeof(evaluator) === 'string') {
            if ( ! (evaluator = eval(evaluator)) ){
                throw new TypeError();
            }
        } else {
            throw new TypeError();
        }
    }
    
    var i;
    if (thisArg===undefined){   
        for (i in this) {
            if (evaluator(this[i], i, this)) {
                return i;
            }
        }
        return -1;
    }
    for (i in this) {
        if (evaluator.call(thisArg, this[i], i, this)) { return i;}
    }
    return -1;
};


