

exports.minObjectiveValueSB = function(pset, objectiveFx, params){
	// console.log(pset)
	// console.log(params)
	var wt = pset.neighborhood.map(function(d){
		params.initial_value = d;
		return objectiveFx(params)
	});
	// console.log(wt)
	var srt = wt.sort(function (a, b) {
	  return a.value - b.value;
	});
	// console.log("srt")
	// console.log(srt)
	var wt_index = wt.indexOf(srt[0]);
	var winning_move = pset.changes[wt_index]
	var winning_solution = pset.neighborhood[wt_index]
	return {
		value : srt[0].value,
		// move : winning_move,
		seq : srt[0].seq
	}		
};


exports.maxObjectiveValueSB = function(pset, objectiveFx, params){
	// console.log(pset)
	// console.log(params)
	var wt = pset.neighborhood.map(function(d){
		params.initial_value = d;
		return objectiveFx(params)
	});
	// console.log(wt)
	var srt = wt.sort(function (a, b) {
	  return b.value - a.value;
	});
	// console.log("srt")
	// console.log(srt)
	var wt_index = wt.indexOf(srt[0]);
	var winning_move = pset.changes[wt_index]
	var winning_solution = pset.neighborhood[wt_index]
	return {
		value : srt[0].value,
		// move : winning_move,
		seq : srt[0].seq
	}		
};




exports.maxObjectiveValue = function(pset, objectiveFx, params){
	// console.log(pset)
	var wt = pset.neighborhood.map(function(d){
		return objectiveFx(d, params)
	});
	var srt = wt.sort(function (a, b) {
	  return a - b;
	});
	var wt_index = wt.indexOf(srt[0]);
	var winning_move = pset.changes[wt_index]
	var winning_solution = pset.neighborhood[wt_index]
	return {
		value : srt[0],
		move : winning_move,
		seq : winning_solution
	}		
};





exports.minObjectiveValue = function(pset, objectiveFx, params){
	var wt = pset.neighborhood.map(function(d){
		return objectiveFx(d, params)
	});
	var srt = wt.sort(function (a, b) {
	  return b-a;
	});
	var wt_index = wt.indexOf(srt[0]);
	var winning_move = pset.changes[wt_index]
	var winning_solution = pset.neighborhood[wt_index]
	return {
		value : srt[0],
		move : winning_move,
		seq : winning_solution
	}		
};



exports.minObjectiveValueGA = function(wt){
	return wt.sort(function (a, b) {
	  return a.obj-b.obj;
	});
};




