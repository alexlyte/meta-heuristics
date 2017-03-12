var nodes = [
	
];

var edges = [


];


var getSpanningTree = function(sequence, graph){

	// Value Gj is the cost of links to the root
	// or, the weight of each edge between r and n

	// value c is the max number of nodes in a subtree,
	// or the total capacity between the two nodes. 

	// so the goal is to find the minimum-cost spanning tree, 
	// which is to say a path that touches all the nodes. 


	// All you have to do for the graph calculation is
	// calculate the total weight of the sequence
	// so just add up all the weights 

	// we know only certain edges will work, because
	// they are less than capacity. This set is the RCL.

	// so you start with the root node
	// grab all the available edges from the RCL
	// Calculate Ti = Gj - Cij
	// choose the edge with the smallest Ti
	// only if capacity constraint is met (RCL?)

	// delete link r-j from the list of possible gates

	// continue until there are no further pairs of nodes
	// with positive T or not exceeding the capacity constraint


	// instead of starting with a single sequence and running it
	// we start with a given node, and identify the best possible
	// node to link it to. And we iterate that process till we 
	// run out of nodes. 
	// Then we evaluate the weight of the chain. 


	// You don't always start with the root. 
	// You start with a random node in the network
	// however, the network has a state, since 
	// you are removing edges after every iteration. 

	// and perhaps it's not so deterministic, because
	// the capacity constaint may eliminate potentially
	// good options, and the completion order may too

	// According to a paper (http://www.optimization-online.org/DB_FILE/2001/09/371.pdf)
	// You start with some seed
	// then, for as many ITERATIONS as you see fit 
	// generate a Greedy Randomized Solution
	// then use local search to generate subsequent improvements
	// update the result as it improves


	// var G = [];
	// graph.edges.forEach(function(e) {
	// 	if(e.source === "r"){
	// 		G.push(g.weight)
	// 	};
	// });

	// var C = [];
	// graph.nodes.forEach(function(node_i,i_index) {
	// 	var c_array = [];
	// 	graph.nodes.forEach(function(node_j,j_index) {
	// 		var Cij = node_i.capacity + node_j.capacity;
	// 		var Gj = G[j_index];
	// 		var Ti = Gj - Cij;
	// 		c_array.push({
	// 			Cij : Cij,
	// 			Gj : Gj,
	// 			Ti : Ti
	// 		})
	// 	})		
	// 	C.push(c_array)
	// });



	// find the minimum cost spanning tree
	// such that every sub-tree has a certain capacity c
	// where c could be the max number of nodes in a sub-tree 
	// or is a range (min and max value)

	// If every node has a weight, then c could be the maximum 
	// weight or a range for the weight


	// Start with different partial initial solutions 
	// and expand the tree

	// Create a Restricted Candidate List RCL with edges ij 
	// that meet the capacity constraints. 
	// (Ignore edges connected to the root)

	// Randomly select from these edges to add to the sub-tree 
	// at each iteration

	//	For multiple edges from node i to all j’s, (i,j) in RCL, 
	//  find  ti = Gj-cij and choose the edge with the largest ti 

	// Add the edge only if the capacity constraint is met 
	// If edge cij is added then delete gate Gj (link r-j) 
	// from the list of gates.
	// Continue until  no further pair of nodes with positive 
	// ti or not exceeding capacity constraint can be added 
	// to the sub-tree



	// var job_info = jobs[job];
	// var td = (current_day + job_info.p - job_info.d);
	// var tardiness = td>0?td:0;
	// var weighted_tardiness = job_info.w * tardiness;
	// var completion_day = (current_day + job_info.p);

	// return {
	// 	weighted_tardiness : weighted_tardiness, 
	// 	tardiness : tardiness,
	// 	completion_day : completion_day
	// }
};



exports.getSpanningTreeCost = function(graph, sequence){
	var wt = 0;
	sequence.forEach(function(node, i) {
		var source = node;
		var target = sequence[(i+1)];
		if(target){
			var edge = graph.edges.filter(function(f) {
				return (
					(f.source === source) && (f.target === target)
					||
					(f.target === source) && (f.source === target)				
					)
			})[0];
			wt += edge.weight			
		}
	})
	return wt
};


