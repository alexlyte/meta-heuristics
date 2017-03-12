var jobs = {
	"1" : {
		'p' : 10,
		'd' : 4,
		'w' : 14
	},
	"2" : {
		'p' : 10,
		'd' : 2,
		'w' : 12
	},
	"3" : {
		'p' : 13,
		'd' : 1,
		'w' : 1
	},
	"4" : {
		'p' : 4,
		'd' : 12,
		'w' : 12
	},
};



var runJob = function(current_day, job){
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


exports.getWeightedTardiness = function(sequence){
	var seq = sequence.split("");
	var wt = 0;
	var cd = 0;
	seq.forEach(function(s,i){
		var job = runJob(cd, s);
		cd = job.completion_day;
		wt += job.weighted_tardiness;
	});
	return wt
};



// var runSearch = function(init, its, size_of_neighborhood, max_len){
// 	if(!current_best){
// 		var current_best = getWeightedTardiness(init);
// 	}
// 	for (j = 0; j < its; j++) { 
// 		var perm1 = createPermutationSet(init, size_of_neighborhood);
// 		var p1 = createPermutationValues(perm1, init);
// 		var bestValue = rankObjectiveValue(p1, perm1);
// 		// console.log("bestValue: " + bestValue.value)
// 		// console.log("current_best: " + current_best)
// 		init = bestValue.seq
// 		if(current_best > bestValue.value){
// 			current_best = bestValue.value;
// 			add_to_Tabu(bestValue.move, max_len)
// 		} else {
// 			add_to_Tabu(bestValue.move, max_len)			
// 		}
// 	};
// 	return current_best
// };

// Now that we know how to get the weighted tardiness, 
// We want to iterate through solutions
// so, we start with an initial value

// tabuList.push(bestValue)



// console.log("inital_value: " + inital_value);
// console.log("perm1: " + perm1);
// console.log("p1: " + p1);
// console.log('bestValue: ' + bestValue)

// now that we have a way to get a fresh set, we want to iterate through
// the set and get the weighted tardiness
// then have a function to choose the lowest tardiness, 
// and verify it's not worse that the last best;
// otherwise choose the second lowest tardiness











