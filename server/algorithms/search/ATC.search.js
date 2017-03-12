// Apparent Tardiness Cost heuristic is a dispatching rule
// that is computed each time a job is run

// every time the machine is freed 
// a ranking index is computed for each remaining job

// This index is a function of the time t 
// when the machine becomes free, and the pj, wj and dj 
// of the remaining jobs. 

// computes the index for each job
// returns the one with the highest rank

function get_p(jobs) {
	var pr = 0;
	jobs.forEach(function(j) {
		pr += j.p;
	});
	return (pr/jobs.length)
};

function get_max_index(indices) {
	var max_val = 0;
	var max_index = "";
	var index_num = "";
	indices.forEach(function(job, i) {
		var test = (job.index > max_val);
		if(test){
			max_val = Math.max(job.index, max_val);	
			max_index = i;
			index_num = job.job_index;
		}
	});
	return {max_val : max_val, max_index : max_index, index_num : index_num}
};

exports.run = function(cd, jobs, K) {

	var highest = '';
	var _p = get_p(jobs);
		// console.log("_p")
		// console.log(_p)

	var indices = [];
	jobs.forEach(function(job, i) {

		// console.log("\n")
		// console.log("i:" + i);
		// console.log('cd: ' + cd);

		var w_j = job.w;
		// console.log("w_j:" + w_j);

		var p_j = job.p;
		// console.log("p_j:" + p_j);

		var d_j = job.d;
		// console.log("d_j:" + d_j);

		var scalar = (w_j/p_j);
		// console.log("scalar:" + scalar);

		var factor = ( (d_j - p_j) - cd);
		// console.log("factor:" + factor);

		var divisor = K*_p;
		// console.log("divisor:" + divisor);

		var maxi = Math.max(factor, 0);
		// console.log("maxi:" + maxi);

		var eqn = scalar * Math.exp( -maxi/divisor);
		// console.log("eqn:" + eqn);

		indices.push({
			job : i,
			index : eqn,
			job_index : job.index_num
		});
	});

	return get_max_index(indices)


};



// Ij(t) = (w_j/p_j) * exp( - (max(d_j - p_j - t,0) ) / K*_p )

// where k is a scaling parameter
// and _p is the average of the processing times of the remaining jobs


// select the job with the highest ranking index next


// exports.check = function(set){
// 	var condition = (exports.tabuList.indexOf(set) === -1);
// 	if(condition){
// 		return true
// 	} else {
// 		return false
// 	}
// };

// exports.update = function(elm, params){
// 	if(exports.tabuList.indexOf(elm) === -1){
// 		if(exports.tabuList.length >= params.tabu_length){
// 			exports.tabuList.pop()
// 			exports.tabuList.splice(0,0,elm)
// 		} else {
// 			exports.tabuList.push(elm)		
// 		}		
// 	}
// };

// exports.tabuList = [];



