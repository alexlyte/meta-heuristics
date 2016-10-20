

exports.maxObjectiveValue = function(pset, objectiveFx){
	console.log(pset)
	var wt = pset.neighborhood.map(function(d){
		return objectiveFx(d)
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





exports.minObjectiveValue = function(pset, objectiveFx){
	var wt = pset.neighborhood.map(function(d){
		return objectiveFx(d)
	});
	var srt = wt.sort(function (a, b) {
	  return a-b;
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





