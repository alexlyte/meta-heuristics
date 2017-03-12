
exports.analyze_machine = function(Graph, machine, disjunctive_edges) {

// for a given job, there is an earliest possible 
// starting time, which is incorporated into the 


// ____________________________________________________________
// Calculate for each operation on an unscheduled machine 
// the earliest possible starting time and the minimal delay 
// between the end of the operation and the end of the complete 
// schedule based on the fixed schedules on the machines in
// M0 and the job orders

// for each job on the machine, determine:
// - the earliest possible starting time
// - the minimal delay (due date) between the end of the operation 
//   and the end of the complete schedule based on 
//   the fixed schedules on the machines in Mo and the job orders

// Due date = makespan - (CP - p) + r
// this amounts to the total time of the longest job (ie lower bound on the time)
// plus the difference between the release date of this job and the 
// processing time of the remaining machines for that job.

// so the due date is the smallest amount of time
// that this job could take, given the release date
// and the time of the other jobs
// so it's a metric that is brutally realistic about the 
// time it should take to do this job
// not taking into account any of the lag that would
// be introduced in the course of scheduling

// And we want to find the job with the largest due date
// and schedule that one first




	function makeGanttChart(G) {

		function match_edge(name) {
			return G.edges.filter(function(edge) {
				return edge.source === name
			})[0]
		};


		var dis = G.edges.filter(function(edge) {
			return edge.type === "disjunctive"
		});

		if(dis.length === 0){
			return undefined
		} else {
			var job_sequence = {};
			dis.forEach(function(d) {
				var machine_name = d.source.split("_")[0];
				if(job_sequence[machine_name]){
					if((job_sequence[machine_name]["seq"].indexOf(d.source) === -1)){
						job_sequence[machine_name]["seq"].push(d.source)
						job_sequence[machine_name]["data"].push(match_edge(d.source))
					}
					if( (job_sequence[machine_name]["seq"].indexOf(d.target_name) === -1)  ){
						job_sequence[machine_name]["seq"].push(d.target_name)
						job_sequence[machine_name]["data"].push(match_edge(d.target_name))
					}
				} else {
					job_sequence[machine_name] = {};
					job_sequence[machine_name]["seq"] = [];
					job_sequence[machine_name]["data"] = [];
					job_sequence[machine_name]["seq"].push(d.source)
					job_sequence[machine_name]["seq"].push(d.target_name)
					job_sequence[machine_name]["data"].push(match_edge(d.source))
					job_sequence[machine_name]["data"].push(match_edge(d.target_name))
					// console.log(match_edge(d.target_name))
				}
			});			
		}
		return job_sequence
	};




	function getMakespan(G, jobs, Gantt) {
		// determine the makespan of the graph
		// by adding up the total processing time
		// for each job on all machines in the subgraph
		// and returning the largest one

		// makespan needs to take preceding jobs into consideration
		// The differences now are there is a new makespan, and the precedence constraints 
		// need to be considered as well as the disjunctive constraints when determining 
		// the release date of each job on the machine. 


		// to calculate makespan 
		// The new makespan is the old makespan plus 
		// the maximum lateness from the new bottleneck.

		// to create the new makespan, 
		// we need to add up the processing time of 
		// each job, given the order precedence
		// so, if, for a given machine, we know that 
		// the machines in Mo are already going first, 
		// and the sequence on them is determined
		// so we know that we can start placing things
		// on the Gantt chart

		// so, take each machine already determined
		// and add the sequences to that list
		// further, each machine is done in order
		// so as each machine is done, the order of the previous
		// machines must be taken into account
		// so the first step is to compute the existing
		// Gantt chart, and then do each machine
		// based on whats left
		// so, basically, the Gantt chart is an array of machines
		// where each machine is an array of jobs (basically a matrix)
		// the array is filled with objects, each of which has a processing time 
		// and other properties. The matrix represents M, the composition of Mo and 
		// all the remaining machines. 
		// Now, for each machine in Mo, the jobs need to be placed on the Gantt chart.
		// So for each disjunctive edge, grab the machine and job, and place an object there
		// with the processing time of the job on the machine. 

	// console.log("NEW_MAKESPAN_ADDER")
	// console.log(G.NEW_MAKESPAN_ADDER)

		if(G.NEW_MAKESPAN_ADDER){
			return G.NEW_MAKESPAN_ADDER
		} else {
			var job_time = jobs.map(function(job) {
				var job_edges = G.edges.filter(function(edge) {
					var job_name = edge.source[2];
					return ((job_name === job))
				});
				var total = 0;
				job_edges.forEach(function(d) {
					total += d.p
				});
				return total
			})
			var makespan = job_time.sort(function(a,b) {
				return b-a
			})[0];
			return makespan	
		}

		// so for this job, determine the total runtime of 
		// the jobs in Mo

		// if(Gantt){
		// 	console.log('computing makespan')
		// 	console.log("sequence: ")
		// 	console.log((Gantt))
		// 	var dis_jobs = [];
		// 	var ret = Object.keys(Gantt).map(function(key) {
		// 		var mkspn = 0;
		// 		// console.log("job edges:")
		// 		var dj = Gantt[key].data;
		// 		// console.log(dj)

		// 		dis_jobs.push(dj)
		// 		// here we're just adding up the jobs on this machine
		// 		// instead, we should use these spoken-for jobs 
		// 		// to add to the processing time
		// 		// of the other jobs
		// 		// so, for each job that is being checked, 
		// 		// we need to add that job and the jobs before it
		// 		// to the processing time of each of the sequences

		// 		Gantt[key].data.forEach(function(job) {
		// 			mkspn += job.p
		// 		})
		// 		// console.log("job_makespan")
		// 		// console.log(mkspn)
		// 		return mkspn
		// 	})
		// 	console.log('previous jobs')
		// 	console.log(dis_jobs)


		// 	// if it hasnt, then add the processing time




		// 	// for each sequence
		// 	var job_time = jobs.map(function(job) {
		// 		// for each job
		// 		// determine if it's got a job on a machine that's
		// 		// already been sequenced. 
		// 		// if it has, then add the processing time of the job and all jobs before it (the release time)

		// 		var ddj = dis_jobs.filter(function(machine_sequences) {
		// 			return machine_sequences.filter(function(jb) {
		// 				console.log('job')
		// 				console.log(job)
		// 				console.log('jb')
		// 				console.log(jb)
		// 				return jb.source.split("_")[1] === job
		// 			})[0]
		// 		})
		// 		console.log("ddj")
		// 		console.log(ddj)

		// 		var job_edges = G.edges.filter(function(edge) {
		// 			var job_name = edge.source[2];
		// 			return ((job_name === job))
		// 		});
		// 		var total = 0;

		// 		job_edges.forEach(function(d) {
		// 			// if there are any 
		// 			// if(){

		// 			// }
		// 			total += d.p
		// 		});
		// 		return total
		// 	})
		// 	var makespan = job_time.sort(function(a,b) {
		// 		return b-a
		// 	})[0];
		// 	return makespan			

		// 	// var ret_srt = ret.sort(function(a,b) {
		// 	// 	return a - b
		// 	// })[0];
		// 	// console.log("makespan")
		// 	// console.log(ret_srt)
		// 	// return ret

		// } else {
		// 	var job_time = jobs.map(function(job) {
		// 		var job_edges = G.edges.filter(function(edge) {
		// 			var job_name = edge.source[2];
		// 			return ((job_name === job))
		// 		});
		// 		var total = 0;
		// 		job_edges.forEach(function(d) {
		// 			total += d.p
		// 		});
		// 		return total
		// 	})
		// 	var makespan = job_time.sort(function(a,b) {
		// 		return b-a
		// 	})[0];
		// 	return makespan			
		// }

	};

	function getJobsOnMachine(G) {
		// take the graph
		// filter the nodes to just those
		// that have a name
		// with the machine number
		// return the names of each of the nodes


		var jobs = [];
		G.nodes.forEach(function(node) {
			if(
				(node.name) &&
				(node.name !== "source") &&
				(node.name !== "sink") 
			){
				var job = node.name.split("_")[1];
				if(jobs.indexOf(job) === -1){
					jobs.push(job)				
				}
			}
		})
		return jobs
	};


	function get_ProcessingTime(G, j) {
		// filter graph edges to just those that
		// have a source node of machine m and job j
		// return the processing time of job j

		var job_times = G.edges.filter(function(f) {
			if(f.source){
				var job_name = f.source.split("_")[1];				
				var mac_name = f.source.split("_")[0];				
				if((job_name === j)&&(mac_name === machine)){
					return true
				} else {
					return false
				}
			}
		})
		.map(function(d) {
			return d.p
		});

		// console.log("jobs")
		// console.log(job_time)
		return job_times[0]


	};

	function get_CriticalPath(G, j) {
		// find the nodes in the graph 
		// that have job j
		// return the sum of the processing 
		// times for each of those nodes

		// the critical path should also include 
		// the time of machine jobs that are
		// predetermined to go before them
		// so, basically, what I tried to do in makespan




		var job_time = 0;
		var all_jobs = [];
		G.edges.filter(function(f) {
			if(f.type === "conjunctive"){
				if(f.source){
					var job_name = f.source.split("_")[1];				
					if(job_name === j){
						return true
					} else {
						return false
					}
				}				
			}
		})
		.forEach(function(d) {
			// check if job has predecesors
			// if so, add their times

			if(Gantt){
				// console.log('computing critical path')
				// console.log("sequence: ")
				// console.log((Gantt))
				var dis_jobs = Object.keys(Gantt).map(function(key) {
					var dj = Gantt[key].data;
					return (dj)
				});
				// console.log('previous jobs')
				// console.log(dis_jobs)
				// console.log("d")
				// console.log(d)
				dis_jobs.forEach(function(seq) {
					// console.log("seq")
					// console.log(seq)
					var job_index = seq.findIndex(function(j) {
						return j.source === d.source
					});
					// console.log("job_index")
					// console.log(job_index)
					if(job_index === -1){
						job_time += d.p	
						// all_jobs.push(d)
						// console.log('a_job_time: ' + job_time)
					} else {
						var mac_seq_time = 0
						for (var i = 0; i <= job_index; i++) {							
							// console.log('it: '+i )
							// console.log('val: '+seq[i].p )
							mac_seq_time += seq[i].p;
							if(i < job_index){
								if(mac_seq_time > job_time){
									job_time +=  (mac_seq_time - job_time);
								}
							} else {
								job_time += seq[i].p;
							}
							// all_jobs.push(seq[i])
							// console.log('b_job_time: ' + job_time)
						}
					}
				});

				// if the amount of time of preceding machines 
				// is greater than the amount of time of
				// pre-sequence machines, then the 
				// machine is free when the sequence ends
				// otherwise, add the difference between 
				// the last job in the sequence and the 
				// last job in the machine sequence

				// console.log("all_jobs")
				// console.log(all_jobs)



			} else {
				job_time += d.p
				// console.log('c_job_time: ' + job_time)
			};


		});

		// console.log("job_time")
		// console.log(job_time)
		return job_time
	};

	function get_ReleaseDate(G, job) {
		// find all edges that are the job
		// then, figure out the subset that are
		// before the one that you care about
		// add up all the ones before
		// thats the release date

		// release date needs to consider preceding jobs as well
		// The longest path to get to the respective job, coming from comparing the 
		// processing times of the preceding jobs for disjunctive constraints and precedence constraints, 
		// will be the new release date.


		// so for this job, on this machine, 
		// determine the set of machines that come before
		// this machine for this job
		// for each of the machines that precede the 



		function getMachines(j) {
			var current_edge = G.edges.filter(function(f) {
				if(f.source && f.target){
					var source_job = f.source.split("_")[1];						
					var target_job = f.target.split("_")[1];
					if(
						((source_job === j) || (target_job === j))
						&&
						((f.source !== 'source'))
					){
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			});
			return current_edge
		};

		function getPreviousJobsOnMachine(G, machine) {
			var jobs = [];
			G
			.edges
			.filter(function(f) {
				if(f.source){
					var mac = f.source.split("_")[0];
					return ((mac === machine)&&(f.type === "disjunctive"))
				}
			})
			.forEach(function(d) {
				// this needs to return the 
				// sequence of jobs
				// on this machine
				// we hve the sequence from the set
				// console.log('jobs:')
				// console.log(jobs)
				var source = jobs.filter(function(f) {
					if(f && d){
						if(f.source && d.source){
							return ( (f.source === d.source))
						}
					}
				});
				// console.log("source")
				// console.log(source)


				if(source.length === 0){
					// console.log(d.source)
					if(d.source){
						// console.log(d)
						var node = G.edges.filter(function(f) {
							return f.source === d.source
						})[0];
						jobs.push(node)						
					}
				};
				// console.log('yut')
				var target = jobs.filter(function(f) {
					if(f && d){
						if(f.target){
							return ( (f.source === d.target_name))
						}
					}
				});

				// console.log("target")
				// console.log(target)
				if(target.length === 0){
					// console.log(d)
					if(d.target_name){
						// console.log(d)
						var node = G.edges.filter(function(f) {
							return f.source === d.target_name
						})[0];
						// console.log("node")
						// console.log(node)
						jobs.push(node)						
						// jobs.push(d)						
					}
				};
				// console.log('final jobs: ')
				// console.log(jobs)
			});
			// console.log('joim')
			return jobs.map(function(d) {
				return G.edges.filter(function(f) {
					return f.source === d.source
				})[0]
			})
		}

		function getMachineNumber(machine, seq) {
			var j_index = seq.findIndex(function(d){
				// console.log('d.source')
				// console.log(d.source)
					var node = d.source.split("_");			
					var m_name = node[0];
					var j_name = node[1];
					return ((m_name === machine))
			});
			return j_index
		};
		function getJobNumber(job, seq) {
			var j_index = seq.findIndex(function(d){
					var node = d.source.split("_");			
					var m_name = node[0];
					var j_name = node[1];
					return ((j_name === job))
			});
			return j_index
		};

		var job_sequence = getMachines(job);
		console.log('Sequence: ' + job)
		console.log("Machine: " + machine)
		console.log('jobs in sequence: ')		
		console.log(job_sequence.map(function(d) {
			return d.source.split("_")[0]
		}))
		// console.log("\n")
		// console.log("machine: " + machine)
		// console.log("machines in job:")
		var m_index = getMachineNumber(machine, job_sequence)
		// console.log('current machine index: ' + m_index)

		// for this job
		// this adds up the times of the jobs 
		// that come before it

		// we need to inject into this logic that says
		// if the prior machine job is on a machine
		// that has already been sequenced, grab that machine sequence
		// and determine the sum of the processing times of 
		// the jobs on that machine that happen prior to 
		// the job in question

		// so for each machine in the sequence
		// between the first machine and this one
		// take each machine
		// if it has, grab it's sequence
		// and determine the sum of the processing times of 
		// the jobs on that machine that happen prior to 
		// the job in question


		var release_time = 0;
		for (var i = 0; i < m_index; i++) {
			var jb = (job_sequence[i]);
			// console.log("jb")
			// console.log(jb)
			release_time += jb.p;
			var machine_nm = jb.source.split("_")[0];
			// console.log('machine name: ' + machine_nm)
			var previousJobs = getPreviousJobsOnMachine(G, machine_nm)
			// console.log('previous jobs:')
			// console.log(previousJobs)

			var nm = machine_nm + "_" + jb.source.split("_")[1];
			var job_index = previousJobs.findIndex(function(f) {
				return f.source === nm
			});
			if(job_index === -1){
				// console.log('no previous jobs')
			} else {

				// for (var i = 0; i <= job_index; i++) {							
				// 	// console.log('it: '+i )
				// 	// console.log('val: '+seq[i].p )
				var mac_seq_time = 0;
				previousJobs.forEach(function(d, i) {
					// console.log("nm: " + nm)
					// console.log("job_index: " + job_index)
					// console.log("machine job index: " + i)
					mac_seq_time += d.p;
					if(i <= job_index){
						// console.log('mac_seq_time: ' + mac_seq_time)
						// console.log('release_time: ' + release_time)
						if(mac_seq_time > release_time){
							release_time +=  (mac_seq_time - release_time );
						}
					} 
				})


				// 	// all_jobs.push(seq[i])
				// 	console.log('b_job_time: ' + job_time)
				// }


				// if(i < job_index){
				// 	release_time += d.p					
				// }
			}
		};
		// console.log("release_time:")
		// console.log(release_time)
		// console.log('\n')
		// console.log('\n')
		// console.log('\n')
		// console.log('\n')
		return release_time
	};

	function get_DueDate(makespan, CP, p, r) {

		return (makespan - (CP - p) + r)
	};

	var table = [];
	var jobs = getJobsOnMachine(Graph);
	var Gantt = makeGanttChart(Graph);
	Graph.gantttt = Gantt

	// Now, we can't schedule two jobs at the same time
	// so the way this algorithm works, we have to
	// determine the characteristics of each job
	// relative to what has already been determined
	// then, when the jobs are being sequenced, they can
	// only be sequenced at times when other machines are not occupied

	var makespan = getMakespan(Graph, jobs, Gantt);
	jobs.forEach(function(job) {
		// console.log("machine: " + machine);
		// console.log("job: " + job)
		var Cj = get_CriticalPath(Graph, job);
		var Pj = get_ProcessingTime(Graph, job);
		if(Pj){
			var Rj = get_ReleaseDate(Graph, job);
			var Dj = get_DueDate(makespan, Cj, Pj, Rj);

			console.log("makespan");
			console.log(makespan);
			console.log("CP");
			console.log(Cj);
			console.log("p");
			console.log(Pj);
			console.log("r");
			console.log(Rj);
			console.log('Dj')
			console.log(Dj)
			// var Lj = get_Lateness(w)
			var obj = {
				m : makespan,
				c : Cj, 
				p : Pj, 
				d : Dj, 
				r : Rj,
				machine : machine,
				job : job
				// l : Lj
			};
			// console.log("obj")			
			// console.log(obj)			
			table.push(obj)
		}
		// table.push({
		// 	p : Pj, 
		// 	d : Dj, 
		// 	r : Rj,
		// 	l : Lj
		// })		
	});

	return (table)
};



exports.get_Min_Lmax = function(Lmax_array) {
	var top = Lmax_array.sort(function(a,b) {
		return a.Lmax-b.Lmax
	})[0];
	return top
};




exports.get_Max_Lmax = function(Lmax_array) {
	var top = Lmax_array.sort(function(a,b) {
		return b.Lmax-a.Lmax
	})[0];
	return top
};


exports.get_DisjunctiveEdges = function(G, Max_Lmax) {
	var seq = Max_Lmax.seq.split("");
	if(!G.disjunctive_edges){
		G.disjunctive_edges = [];		
	}
	seq.forEach(function(s,i) {
		var source_name = (Max_Lmax.machine + "_" + s);
		var target_name = (Max_Lmax.machine + "_" + seq[(i+1)]);
		if(seq[(i+1)]){
			G.disjunctive_edges.push({
				type : "disjunctive",
				source : source_name,
				target_name : target_name
			})				
		}
	})
	return G
}
