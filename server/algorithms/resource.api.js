exports.get_resource = function(type, name) {
	var path = "./" + type + "/" + name + "." + type + ".js"
	return require(path)
};

