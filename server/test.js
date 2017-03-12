


var pickItem = function(ary){
        var ary_size = ary.length;
        var randy = getRandomInt(0,(ary_size-1));
        return randy
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function checkIfOperatorIsNext(eqn){
	var str_parts = eqn.split("");
	// if it's not an operator at the end of the string
	if(ops.indexOf(str_parts[str_parts.length-1]) === -1){
		return true
	} else {
		return false
	}
};


var createSolution = function(){
	var eqn = '';
	while (set.length !== 0){
		// if(ops.indexOf(eqn.split("")[eqn.split("").length-1]) === -1){
		// 	eqn += grabAParen();			
		// }
		var set_index = pickItem(set);
		var set_item = set[set_index];
		set.splice(set_index,1);	
		var ops_index = pickItem(ops);
		var ops_item = ops[ops_index];
		// rules: 
		// - don't open a parenteses before an operator


		// if(
		// 	ops.indexOf(eqn.split("")[eqn.split("").length-1]) === -1
		// 	&&
		// 	(ops_item !== "+" && ops_item !== "-")
		// ){
		// 	eqn += (grabAParen() || "");			
		// }
		eqn += set_item;
		eqn += ops_item;
		if(!checkIfOperatorIsNext(eqn)){
			eqn += (grabAParen() || "");			
		}
	};	
	var eq = eqn.split("");
	eq.splice((eq.length-1),1)
	return eq.join("")

}


function grabAParen(){
    var randy = getRandomInt(0,1);
    if(parens.length !== 0){
    	if(randy === 1){
    		return parens.splice(0,1)
    	} else {
    		return ""
    	}
    }
}


var x = 0;

while (x !== 100000000){
	x += 1;
	var set = ['1','1','5','8'];
	var ops = ['+','-','*','/'];
	var parens = ["(",")"];
	var ss = (createSolution());
	if(parens.length === 1){
		ss += ")"
	}
	if(eval(ss) == 10){
		console.log("ss")
		console.log("ss")
		console.log("ss")
		console.log("ss")
		console.log("ss")
		console.log("ss")
		console.log("ss")
		console.log("ss")
		console.log("ss")
		console.log((ss))
		console.log(eval(ss))
		console.log("ss")
		console.log("ss")
		console.log("ss")
		console.log("ss")
		console.log("ss")
		console.log("ss")
		console.log("ss")
		console.log("ss")
		console.log("ss")
		console.log("ss")
	} else {
		console.log(ss)
		// console.log(eval(ss))
		// console.log("\n")
	}
	// console.log(ss.val)	
}





