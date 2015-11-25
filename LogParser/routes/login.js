var express = require('express');
var user = require('../cred.json');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

	var status=false;
	var msg="";
	for(var i=0;i<user.users.length;i++){
		var inputName=req.query.Name;
		var inputPass=req.query.password;
				
		var configName=user.users[i].name;
		var configPass=user.users[i].password;
		
		
		if(inputName==configName && inputPass== configPass){
			
			msg="Welcome "+configName+"!.."
			status=true;
			continue;
		}
		else if(inputName==configName && inputPass != configPass){
			msg="Invalid Password!..";
			status=true;
			continue;
		}		
		
		//console.log("From Form:"+req.query.Name);
	}
	
	if(status){
		console.log(msg);
		
	}
	else {
		console.log("Not a valid user!..");
	}		
	
	
  res.render('login', 
		  { 
	  			title: 'Login',
		  }
  
  );
});

module.exports = router;
