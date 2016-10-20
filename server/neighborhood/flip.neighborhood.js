
var createPermutationSet = function(searchParams){
	var init = searchParams.objective_function.params.inital_value;
	var neighborhood_size = searchParams.neighborhood.params.size_of_neighborhood;
	var searchConstraint = searchParams.search_type.run;

	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	try{
		var sequence_split = init.split("");
		var sequence_length = sequence_split.length;
		var perms = [];
		for (i = 0; i < neighborhood_size; i++) { 
			var sq = getRandomInt(0,(sequence_length-1));

			var switched_bit = sequence_split[sq];
			if(switched_bit === "0"){
				sequence_split[sq] = 1
			} else if(switched_bit === "1"){
				sequence_split[sq] = 0
			};
			var sq_c = sequence_split.join("");
			searchParams.search_type.params.sq = sq;
			var search_const = searchConstraint.check(sq_c, searchParams);
			var repetition_const = (perms.indexOf(sq) === -1);

			while( !( (search_const)  && (repetition_const) ) ){
				var sq = getRandomInt(0,(sequence_length-1));
				var switched_bit = sequence_split[sq];
				if(switched_bit === "0"){
					sequence_split[sq] = 1
				} else if(switched_bit === "1"){
					sequence_split[sq] = 0
				};
				var sq_c = sequence_split.join("");

				search_const = searchConstraint.check(sq_c, searchParams);
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
	// currently this function is taking in 
	// any change set and returning the same unchanged set
	var new_set = [];
	var sequence_split = sequence.split("");
	var sequence_length = sequence_split.length;
	set.forEach(function(s,i){
		console.log("sequence_split")
		console.log(sequence_split[s])
		var switched_bit = sequence_split[s];
		if(switched_bit === "0"){
			sequence_split[s] = 1
		} else if(switched_bit === "1"){
			sequence_split[s] = 0
		};
		console.log(sequence_split)
		var sq = sequence_split.join("");
		new_set.push(sq);
	});
	return new_set
};



exports.createNewSet = function(searchParams, searchConstraint){
	var pset = createPermutationSet(searchParams);
	var perms = createPermutationValues(pset,searchParams.objective_function.params.inital_value);
	return {neighborhood : perms, changes : pset}
};
