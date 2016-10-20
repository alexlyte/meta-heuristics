var permutations = require("./permute.neighborhood.js");
var flip = require('./flip.neighborhood.js');


exports.permutation = {
	exchange : permutations.createNewSet
};

exports.binary = {
	flip : flip.createNewSet
};