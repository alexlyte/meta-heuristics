// the tabu search 
// var jobs = {
// 	"1" : {
// 		'p' : 13,
// 		'd' : 6,
// 		'w' : 2
// 	},
// 	"2" : {
// 		'p' : 9,
// 		'd' : 18,
// 		'w' : 4
// 	},
// 	"3" : {
// 		'p' : 13,
// 		'd' : 10,
// 		'w' : 2
// 	},
// 	"4" : {
// 		'p' : 10,
// 		'd' : 11,
// 		'w' : 5
// 	},
// 	"5" : {
// 		'p' : 8,
// 		'd' : 13,
// 		'w' : 4
// 	},
// };

// in the flexible flow shop, 
// jobs move between machine 1 and 2
// when each job is done, add it to the next machine
// when all jobs are done, add up the total tardiness. 
// and return that value


// now, the way the job shop is computed
// each job is put on the machine
// and the runtime is added

// so we can just run it again on our machine
// and then add the weighted tardiness and completion time

var runJob = function(current_day, job, jobs){
	var job_info = jobs[job];
	var td = (current_day + job_info.p - job_info.d);
	var tardiness = td>0?td:0;
	var weighted_tardiness = job_info.w * tardiness;
	var completion_day = (current_day + job_info.p);

	return {
		weighted_tardiness : weighted_tardiness, 
		tardiness : tardiness,
		completion_day : completion_day
	}
};


exports.getWeightedTardiness = function(sequence, jobs){
	var seq = sequence.split("");
	var wt = 0;
	var cd = 0;
	seq.forEach(function(s,i){
		var job1 = runJob(cd, s, jobs);
		cd = job1.completion_day;
		wt += job1.weighted_tardiness;

		var job2 = runJob(cd, s, jobs);
		cd = job1.completion_day;
		wt += job1.weighted_tardiness;

	});
	return wt
};


exports.getWeightedTardinessAndCompletion = function(sequence, jobs){
	var seq = sequence.split("");
	var wt = 0;
	var cd = 0;
	seq.forEach(function(s,i){
		var job1 = runJob(cd, s, jobs);
		cd = job1.completion_day;
		wt += job1.weighted_tardiness;

		var job2 = runJob(cd, s, jobs);
		cd = job1.completion_day;
		wt += job1.weighted_tardiness;

	});
	return {wt : wt, cd : cd}
};
