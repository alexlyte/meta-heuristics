
// var jobs = {
// 	"1" : {
// 		'p' : 10,
// 		'd' : 4,
// 		'w' : 14
// 	},
// 	"2" : {
// 		'p' : 10,
// 		'd' : 2,
// 		'w' : 12
// 	},
// 	"3" : {
// 		'p' : 13,
// 		'd' : 1,
// 		'w' : 1
// 	},
// 	"4" : {
// 		'p' : 4,
// 		'd' : 12,
// 		'w' : 12
// 	},
// };
 


var runJob = function(current_day, job_info){
	var td = (current_day + job_info.p - job_info.d);
	// var td = (current_day + job_info.p);
	var tardiness = td>0?td:0;
	// var weighted_tardiness = job_info.w * tardiness;
	var completion_day = (current_day + job_info.p);

	return {
		// weighted_tardiness : weighted_tardiness, 
		tardiness : tardiness,
		completion_day : completion_day
	}
};


exports.getLateness = function(params){
	// for a given machine
	// a sequence will be tried
	// the total release date of that job
	// will be compared to the due date of the job
	// the difference will be the thing to return 


	// determine the maximum lateness 
	// for all jobs on this machine

	// how to determine the maximum lateness?
	// well, is lateness just (release time + processing time - due date)

	// console.log(params)

	// make a jobs object
	// where the keys are job numbers
	// and the values are p and d

	var jobs = {}; 
	// console.log(params)
	params.table.forEach(function(d) {
		jobs[(d.job)] = {
			p : d.p,
			d : d.d
		}
	})

	// console.log(jobs)

	var sequence = params.initial_value;

	var seq = sequence.split("");
	var t = 0;
	var cd = 0;
	// var p = 0;
	// console.log(seq)
	var job_set = [];
	seq.forEach(function(s,i){
		var job_info = jobs[s];
		// console.log("job_info")
		// console.log(job_info)
		if(job_info){
			var job = runJob(cd, job_info);
			// console.log('job')
			// console.log(job)
			job_info.tardiness = job
			// p += job.p;
			job_set.push({
				t : job_info.tardiness.tardiness,
				job : s
			})
			cd = job.completion_day;
			// t += (job_info.tardiness.tardiness)
		}
	});
	// console.log("job_set")
	// console.log(job_set)
	// var job_data = {
	// 	value : 0,
	// 	seq : ''
	// };

	// instead of returning the cumulative t
	// return the largest t
	var seq = '';
	job_set.forEach(function(d) {
		// job_data.value += d.t;
		// job_data.seq += d.job;
		seq += d.job;
	});

	// console.log("\n")
	// return {job_set : job_set, value : t}
	var min_L = job_set.sort(function(a,b) {
			return b.t - a.t
		})[0];

	return 	{
		value : min_L.t,
		seq : seq
	}
};

