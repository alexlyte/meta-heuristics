

exports.getLateness = function(initial_value, cities){
	var sequence = initial_value.split("");
	var distance = 0;
	var sequences = [];
	for (var i = 0; i < sequence.length - 1; i++) {
		var source = sequence[i];
		var target = sequence[(i+1)];		
		sequences.push({
			source : source,
			target : target
		});
	};

	sequences.forEach(function(d, i) {
		var dist = cities[(d.source-1)][(d.target-1)];
		distance += dist;
	});
	return distance
};









