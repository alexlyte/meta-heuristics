

// Each machine has a setup time for each job
// the question is, what is the best ordering of jobs?
// the initial solution is '4213', which, evaluated on machines 1234, 

// the algorithm should compute the time of the ordering of jobs on machines
// it should receive a proposed sequence and evaluate the total setup time




var runJob = function(machines, job_in_question){
	// the delay in start time comes from 
	// when a job is added to a machine, but it can't start
	// until it finishes it's previous machine

	// but it also 
	Object.keys(job_in_question).forEach(function (machine_name) {
		if(machine_name !== "job"){

			var machine_in_question = machines.filter(function(f) {
				return f.name === machine_name
			})[0];

			job_in_question.finish_time = job_in_question.finish_time?job_in_question.finish_time:0;
			var last_machine_end_time = machine_in_question.stack[machine_in_question.stack.length-1].end_time;

			if(job_in_question.finish_time > last_machine_end_time){
				var start_time = job_in_question.finish_time
			} else if(job_in_question.finish_time < last_machine_end_time){
				var start_time = last_machine_end_time
			} else if(job_in_question.finish_time === last_machine_end_time){
				var start_time = job_in_question.finish_time
			} else {
				console.log("finish_time: "+job_in_question.finish_time)
				console.log("last_machine_end_time: "+last_machine_end_time)

			};

			// console.log("start_time: " + start_time)
			// console.log(job_in_question)
			var job_data = {
				job : job_in_question.job,
				start_time : (start_time),
				end_time : (start_time+ job_in_question[machine_in_question.name].setup_time + job_in_question[machine_in_question.name].processing_time),
				setup_time : job_in_question[machine_in_question.name].setup_time,
				processing_time : job_in_question[machine_in_question.name].processing_time
			};
			machine_in_question.stack.push(job_data);
			job_in_question.finish_time = job_data.end_time;
			// console.log(job_in_question)
			// console.log(machine_in_question)
		}
	})
	return machines
};


exports.getTotalSetupTime = function(sequence){
	// this thing will run each job and calculate 
	// the total amount of setup time
	// setup time will accumulate as things are added to the machines
	var jobs = [
		{
			'job' : "1",
			'm1' : {
				setup_time : 14,
				processing_time : 0,
			},
			'm2' : {
				setup_time : 2,
				processing_time : 0,
			},
			'm3' : {
				setup_time : 7,
				processing_time : 0,
			},
			'm4' : {
				setup_time : 2,
				processing_time : 0,
			},
		},
		{
			'job' : "2",
			'm1' : {
				setup_time : 5,
				processing_time : 0,
			},
			'm2' : {
				setup_time : 12,
				processing_time : 0,
			},
			'm3' : {
				setup_time : 8,
				processing_time : 0,
			},
			'm4' : {
				setup_time : 4,
				processing_time : 0,
			},
		},
		{
			'job' : "3",
			'm1' : {
				setup_time : 8,
				processing_time : 0,
			},
			'm2' : {
				setup_time : 6,
				processing_time : 0,
			},
			'm3' : {
				setup_time : 3,
				processing_time : 0,
			},
			'm4' : {
				setup_time : 6,
				processing_time : 0,
			},
		},
		{
			'job' : "4",
			'm1' : {
				setup_time : 7,
				processing_time : 0,
			},
			'm2' : {
				setup_time : 5,
				processing_time : 0,
			},
			'm3' : {
				setup_time : 9,
				processing_time : 0,
			},
			'm4' : {
				setup_time : 10,
				processing_time : 0,
			},
		},
	];


	var machineNames = [];
	Object.keys(jobs[0]).forEach(function(machine_name) {
		if(machine_name !== "job"){
			machineNames.push(machine_name)			
		}
	});
	var machines = [];
	machineNames.forEach(function(machine){
		machines.push({
			name : machine,
			stack : [{
				job : "none",
				start_time : 0,
				end_time : 0,
				setup_time : 0					
			}]
		})
	});


	var seq = sequence.split("");
	var tt = [];

	seq.forEach(function(s,i){
		var job_info = jobs.filter(function(f){
			return f.job === s
		})[0];
		machines = runJob(machines, job_info);
	});
	machines.forEach(function(m){
		// sum the total setup time of each machine
		// var ss = 0;
		// m.stack.forEach(function(stack_item){
		// 	ss += stack_item.end_time
		// });
		var last_machine_job = m.stack[m.stack.length-1];
		tt.push(last_machine_job.end_time);
	});
	// return the greatest setup time
	var max_response_time = tt.sort(function(a,b){
		return b-a
	})[0];
	// console.log(tt)
	// console.log(machines)
	// console.log("max_response_time: " + max_response_time)
	return max_response_time
};





// exports.getTotalSetupTime("4132")






