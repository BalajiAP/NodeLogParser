var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',function(req,res,next){
	res.render('search', { title: 'Search from the log' });	
});

router.post('/', function(req, res, next) {
	var keyword = req.body['keyword']
	var from_date = req.body['from_date']
	var fs = require('fs'),
    readline = require('readline'),
    stream = require('stream');


	var filename = '../log_parser/NodeLogParser/LogParser/Logs_MPServer1.txt'
	rl = readline.createInterface({
	    input: fs.createReadStream(filename),
	    terminal: false
	})

	fs.exists('result_search.txt', function (exists) {
	  if (!exists) {
	    return 'Error, file result_search.txt does not exist!';
	  }
	else{
	fs.unlink('result_search.txt', function(err) {
	   				if (err) {   return console.error(err);  }
	   				console.log("File deleted successfully!");
					});
	}
	});


	fd = fs.openSync('result_search.txt', 'w');

	rl.on('line', function(line) {
		var idx = line.indexOf(keyword);
	    if (idx !== -1) {
		    fs.write(fd, line);
		}
	});

	rl.on('close', function() {
		res.download('result_search.txt');
	});

});

module.exports = router;
