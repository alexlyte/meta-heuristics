
var createPermutationSet = function(searchParams){
	var init = searchParams.objective_function.params.initial_value;
	var neighborhood_size = searchParams.neighborhood.params.size_of_neighborhood;
	var searchConstraint = searchParams.search_type.run;

	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	try{
		var sequence_length = init.split("").length;
		var perms = [];
		for (i = 0; i < neighborhood_size; i++) { 
			var int1 = getRandomInt(0,(sequence_length-1));
			var int2 = getRandomInt(0,(sequence_length-1));
			var sq = int1.toString() + int2.toString();

			var search_const = searchConstraint.check(sq);
			var validity_const = (int1 !== int2);
			var repetition_const = (perms.indexOf(sq) === -1);

			while( !( (search_const) && (repetition_const) && (repetition_const) ) ){
				int1 = getRandomInt(0,(sequence_length-1));
				int2 = getRandomInt(0,(sequence_length-1));
				sq = int1.toString() + int2.toString();
				search_const = searchConstraint.check(sq);
				validity_const = (int1 !== int2);
				repetition_const = (perms.indexOf(sq) === -1);
			}
			perms.push(sq)
		};
		return perms		
	} catch (e){
		console.log(e)
	}
};


var createPermutationValues = function(set, sequence){
	var new_set = [];
	set.forEach(function(s,i){
		var new_sequence = sequence.split("");
		var st = s.split("");
		var st_array = st.map(function(d){
			return parseInt(d)
		});
		var w0 = new_sequence[st_array[0]];
		var w1 = new_sequence[st_array[1]];
		new_sequence[st_array[0]] = w1;
		new_sequence[st_array[1]] = w0;
		var new_st = new_sequence.join("");
		new_set.push(new_st);
	});
	return new_set
};



exports.createNewSet = function(searchParams, searchConstraint){
	var pset = createPermutationSet(searchParams);
	var perms = createPermutationValues(pset,searchParams.objective_function.params.initial_value);
	return {neighborhood : perms, changes : pset}
};
