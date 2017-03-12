

exports.get_Remaining_Machines = function(G) {
	var M = G.all_machines;
	var Mo = G.Mo;
	var rem = [];
	M.forEach(function(m) {
		var match = Mo.filter(function(f) {
			return f.machine === m
		})[0];
		if(!match){
			rem.push(m)
		}
	})
	return rem
};