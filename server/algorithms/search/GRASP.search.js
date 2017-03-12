// - create an initial empty set
// - create a potential Restricted Candidate List (objective function)
// - evaluate potential candidates, choose the minimum (GRASP)



Array.prototype.findIndex = Array.prototype.findIndex || function(evaluator, thisArg) {
    'use strict';
    if (!this) {
        throw new TypeError('Array.prototype.some called on null or undefined');
    }
    
    if (typeof(evaluator) !== 'function') {
        if (typeof(evaluator) === 'string') {
            if ( ! (evaluator = eval(evaluator)) ){
                throw new TypeError();
            }
        } else {
            throw new TypeError();
        }
    }
    
    var i;
    if (thisArg===undefined){   
        for (i in this) {
            if (evaluator(this[i], i, this)) {
                return i;
            }
        }
        return -1;
    }
    for (i in this) {
        if (evaluator.call(thisArg, this[i], i, this)) { return i;}
    }
    return -1;
};


function get_RCL(node, graph) {
	var node_data = graph.nodes.filter(function(f) {
		return f.id === node.id
	})[0];
	var all_connected_nodes = [];
	graph.edges.forEach(function(edge) {
		if(node.id === "r"){
			if( (edge.source === node.id) ){
				all_connected_nodes.push({
					edge_weight : edge.weight,
					node_id : edge.target
				}) 
			} else if( (edge.target === node.id) ){
				all_connected_nodes.push({
					edge_weight : edge.weight,
					node_id : edge.source
				})
			}					
		} else {
			if((edge.source !== "r") && (edge.target !== "r")){
				if( (edge.source === node.id) ){
					all_connected_nodes.push({
						edge_weight : edge.weight,
						node_id : edge.target
					}) 
				} else if( (edge.target === node.id) ){
					all_connected_nodes.push({
						edge_weight : edge.weight,
						node_id : edge.source
					})
				}		
			}
		}
	});

	var all_capacity_nodes = [];
	all_connected_nodes.forEach(function(candidate) {
		var wt = candidate.edge_weight;
		var candidate_node = graph.nodes.filter(function(node) {
			return node.id === candidate.node_id
		})[0];
		var cap = (node_data.capacity + candidate_node.capacity)
		candidate.cij = cap;
		// console.log("total weight: " + wt + " total capacity: " + cap)
		// console.log(wt)
		// console.log("total capacity")
		// console.log(cap)
		if(wt <= cap){
			all_capacity_nodes.push(candidate)
		}
	})
	return (all_capacity_nodes)
};

function select_random_node(total_nodes) {
	var non_root_nodes = total_nodes.filter(function (f) {
		return f.id !== "r"		
	})
	var len = non_root_nodes.length;
	var candidate = getRandomInt(0,(len-1))
	return non_root_nodes[candidate]
};

function select_root_node(total_nodes) {
	return total_nodes.filter(function(f) {
		return f.id === "r"
	})[0];
};

function get_G(graph) {
	var G = [];
	graph.edges.forEach(function(e) {
		if(e.source === "r"){
			G.push({
				weight : e.weight,
				id : e.target
			})
		};
	});
	return G
}

function get_T(rcl, G) {
	var T = [];
	rcl.forEach(function(candidate) {
		var candidate_index = 0;
		var Gj = G.filter(function(f) {
			return f.id === candidate.node_id
		})[0].weight;
		var Ti = Gj - candidate.cij;
		T.push({
			id : candidate.node_id,
			t : Ti
		})
	});
	return T
};

// function query_T(rcl, T) {
// 	// return the set of edges in T
// 	// that are in the RCL
// 	return rcl.map(function(candidate) {		
// 		return T.filter(function(t_array) {
// 			return 
// 		})
// 	})
// };

function minimize_T(T_set) {
	return T_set.sort(function(a,b){
		return a.t
	})[0];
};

function remove_node(node, graph) {	
	var node_index = graph.nodes.findIndex(function(f) {
		return f.id === node.id
	})[0];

	graph.nodes.splice(node_index, 1)
	var edges = [];
	graph.edges.forEach(function(edge, i) {
		if((edge.source === node.id) || (edge.target === node.id)){
			edges.push(i)
		}
	});
	var new_edges = [];
	graph.edges.forEach(function(edge, i) {
		if(edges.indexOf(i) === -1){
			new_edges.push(edge)
		}
	})
	graph.edges = new_edges;
	return graph
}

function create_new_graph(old_graph) {
	var new_graph = {
		nodes : [],
		edges : []
	};
	old_graph.nodes.forEach(function(d) {
		new_graph.nodes.push(d)
	});
	old_graph.edges.forEach(function(d) {
		new_graph.edges.push(d)
	});
	return new_graph
}


exports.run = function (graph) {

	var weightedGraph = create_new_graph(graph)
	var spanning_tree = [];
	// console.log(weightedGraph)
	var G = get_G(weightedGraph);
	var runtime_graph = weightedGraph;
	// var current_node = select_random_node(runtime_graph.nodes);
	var current_node = select_root_node(runtime_graph.nodes);
	console.log("current_node")
	console.log(current_node)
	spanning_tree.push(current_node);
	while(runtime_graph.nodes.length > 1){
		// console.log("current_node")
		// console.log(current_node)
		var candidate_edges = get_RCL(current_node, runtime_graph);
		console.log("candidate_edges")
		console.log(candidate_edges)
		var T = get_T(candidate_edges, G);
		// console.log("T")
		// console.log(T)
		var min_T = minimize_T(T)
		// console.log("min_T")
		// console.log(min_T)

		runtime_graph = remove_node(current_node, runtime_graph);
		// console.log(runtime_graph)
		var current_node = min_T;
		spanning_tree.push(current_node);
	}
		// replace last undefined node 
		// with the root node
		var root_node = select_root_node(weightedGraph.nodes);
		// spanning_tree = spanning_tree.splice((spanning_tree.length-1), 1)
		spanning_tree.push(root_node)
		// console.log("spanning_tree")
		// console.log(spanning_tree)
		return spanning_tree
				.filter(function(d) {
					return d !== undefined
				})
				.map(function(d) {
					return d.id
				})
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
