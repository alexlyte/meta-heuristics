
exports.do_genetics = function(sequences, percent) {
	// take the first N items in the ranked list
	// run the crossover functions on the N
	// mutate one element from a % of items
	// console.log("sequences")	
	// console.log(sequences)	
	var pre_set = sequences.map(function(d) {
		return d.seq.split("");
	});
	var set = [];
	var elm_upset = getRandomInt(0,3);
	// console.log('elm_upset: ' + elm_upset)
	// console.log('pre_set')
	// console.log(pre_set)
	var i1 = pre_set[0][elm_upset];
	var i2 = pre_set[1][elm_upset];

	if(pre_set[0].indexOf(i2) === -1){
		pre_set[0][elm_upset] = i2;		
	} else {
		elm_upset = getRandomInt(0,3);
		pre_set[0][elm_upset] = i2;
	}

	if(pre_set[1].indexOf(i1) === -1){
		pre_set[1][elm_upset] = i1;
	}
	

	// console.log('sequences converted')
	// console.log(pre_set)
	var elm_mutatee = getRandomInt(1,4);
	var elm_mutater = getRandomInt(1,4);
	// console.log("elm_mutatee")
	// console.log(elm_mutatee)
	// console.log("elm_mutater")
	// console.log(elm_mutater)

	pre_set.forEach(function(d) {
		// randomly select elements
		// to be mutated
		var rand = Math.random();
		// console.log("rand: "+rand)
		// console.log("percent: "+percent)
		if(rand < percent){
			if(d.indexOf(elm_mutater) === -1){
				d[(elm_mutatee-1)] = elm_mutater				
			}
		};
		set.push(d)
	});
	// console.log('sequences mutated')
	// console.log(set)
	return set
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}