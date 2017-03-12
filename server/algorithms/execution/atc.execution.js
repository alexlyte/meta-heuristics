
// ok, so while normally we would just generate 
// a sequence and then run it to get the 
// weighted tardiness of it
// in this case we need to evaluate the weighted tardiness
// of each job, as it is being run
// and re-order the jobs based on the metric. 

// like in GRASP, this heuristic provides
// one single 'optimal' sequence
// rather than a bunch of sequences that each need to be tried

// so rather than looping through iterations
// just run the ATC, and for each job, remove it from 
// the stack, run it, calculate the weightedTardiness
// and return it. 
// then run the ATC again with the updated figures. 


exports.run_job_search = function(searchParams){

	try {
		var objective = searchParams.objective_function.run;
		var initial_value = searchParams.objective_function.params.initial_value;
		var config = searchParams.objective_function.params.jobs;
		var heuristic = searchParams.search_type.run;
		var heuristic_params = searchParams.search_type.params.K;

		var seq = "";
		var cd = 0;
		console.log(config)
		var jobs = Object.keys(config).map(function(job, i){config[job].index_num = (i+1);return (config[job]) })
		console.log(jobs)
		// console.log(job)

		while (jobs.length > 0){
			var job = heuristic(cd, jobs, heuristic_params);
			seq += job.index_num;
		// console.log('job')
			// console.log(job)
			// console.log(jobs)
			jobs.splice(job.max_index, 1);
			console.log(jobs)
		}
		console.log("seq")
		console.log(seq)
		console.log(config)
		// if(!current_best){
		var current_best = objective(seq, config);
		// };
		return current_best

	} catch(e){
		console.log(e)
	}

};
