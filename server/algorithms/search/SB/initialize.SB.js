


exports.createGraph = function(jobs, sequence) {
	// take the sequences of machines
	// get all the unique machine numbers
	// assign them as nodes 
	var nodes = [];
	var edges = [];

	nodes.push({
		name : "source",
		p : 0
	});
	nodes.push({
		type : "sink",
		p : 0
	});
	sequence.forEach(function(job, i) {
		var job_name = (i+1);
		job.forEach(function(machine, j) {
			var machine_name = machine;
			nodes.push({
				name : (machine_name + "_" + job_name),
				type : "machine_job"
			})

			// if it's the first job in the sequence
			// create an edge between the source and the next machine
			if(j === 0){
				var previous_machine = "source";
				edges.push({
					type : 'conjunctive',
					source : previous_machine,
					target : (machine_name + "_" + job_name),
					p : 0
				})
			} else {
				var previous_machine = job[(j-1)];
				// console.log("previous_machine")
				// console.log(previous_machine)
				// console.log('current maching')
				// console.log(machine_name)
				edges.push({
					type : 'conjunctive',
					source : (previous_machine + "_" + job_name),
					target : (machine_name + "_" + job_name),
					p : (jobs[i][(j-1)])
				})
			};


			// if it's the last machine
			// create an edge between the node and the sink
			if(j === (job.length-1)){
				var next_machine = "sink";
				edges.push({
					type : 'conjunctive',
					source : (machine_name + "_" + job_name),
					target : "sink",
					p : (jobs[i][j])
				})
			};
		})
	});

	// then take all the sequences 
	// and assign them as conjunctive edges
	// where the source is the previous element in the sequence
	// and the target is the next element in the sequence

	// then, for each machine, determine which 
	// jobs have to be processed on that machine
	// create 2 edges between each machine, as source and target

	return {
		nodes : nodes,
		edges : edges
	}

};





exports.initialize = function(Graph) {
	var obj = {
		G : {
			nodes : [],
			edges : []
		},
		originalGraph : Graph,
		Mo : []
	};

	obj.G.nodes = Graph.nodes;
	Graph.edges.forEach(function(e) {
		if(e.type == "conjunctive"){
			obj.G.edges.push(e)
		}
	})
	return obj
};


exports.get_Machines = function(Graph) {
	// Get the nodes in the graph
	// return all the unique machine numbers
	var machines = [];
	Graph.nodes.forEach(function(node) {
		if(
			(node.name) &&
			(node.name !== "source") &&
			(node.name !== "sink") 
		){
			var machine = node.name.split("_")[0];
			if(machines.indexOf(machine) === -1){
				machines.push(machine)				
			}
		}
	})
	return machines
};



