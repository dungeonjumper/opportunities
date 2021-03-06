var fs = require('fs');

var fileName = process.argv[2];

if (fileName) {
	try {
		var text = fs.readFileSync(fileName, "utf8");
		var opportunties = JSON.parse(text);
	} catch (e) {
		console.log("ERROR: " + e.message);
		process.exit(1);
	}
	
	try {
		var out = fs.createWriteStream(fileName, { encoding: "utf8" });
		out.write(JSON.stringify(opportunties, null, 2));
		out.end(); 
	} catch (e) {
		console.log("ERROR: Couldn't write content out to: " + fileName + "");
		console.log("ERROR: " + e.message);
		process.exit(1);
	}
} else {
	function getFileName(path) {
		return path.substring(path.lastIndexOf('/') + 1, path.length);
	}
	var node = getFileName(process.argv[0]);

	var script = getFileName(process.argv[1]);

	console.log("Usage: " + node + " " + script + " <filename>");
}
