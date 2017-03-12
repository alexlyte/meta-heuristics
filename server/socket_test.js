var WebSocket = require('ws');
var ws = new WebSocket('ws://localhost:3000/', {
  protocolVersion: 8,
  origin: 'localhost:3000'
});

ws.on('open', function open() {
  var job = {
  	type : "job", 
  	name : "Job A",
  	configs : {
  		general : {
  			number_of_iterations : 200,
  		},
  		objective_function : {
  			run : "assignmentShop", 
  			params : {
  				inital_value : "4213",
  			}
  		},
  		neighborhood : {
  			run : "neighborhood.permutation.exchange",
  			params : {
  				size_of_neighborhood : 4
  			}
  		},
  		search_type : {
  			run : "tabu",
  			params : {
  				tabu_length : 3,
  			}
  		},
  		ranking : {
  			run : "ranking.maxObjectiveValue"
  		},
  		evaluate : {
  			run : "evaluate.greaterThan"
  		}
  	}
  };

  ws.send(JSON.stringify(job), {mask: true});
});

ws.on('close', function close() {
  console.log('disconnected');
});

ws.on('message', function message(data, flags) {
	console.log(data)
});

