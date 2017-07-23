var express = require('express');
var fs = require('file-system');
var http = require('http');
var router = express.Router();
var mongo = require('mongodb');
var monk = require('monk');
var Client = require('node-rest-client').Client;
//var nodemailer = require('nodemailer');
var client = new Client();
var watson = require('watson-developer-cloud');

var newcontext = "";
var newconversation = watson.conversation({
  username: '4886ed46-5422-423d-955e-3fe286a8bfd3',
  password: '7AHpbd1N14q6',
  version: 'v1',
  version_date: '2017-04-14'
});


//speech to text
var authorization = watson.authorization({
  username: '40bee9eb-c42e-4aed-954b-e702ce7565ea',
  password: 'z5MZ35hu05Zc',
  version: 'v1'
  });

  var params = {
  // URL of the resource you wish to access
  url: 'https://stream.watsonplatform.net/speech-to-text/api'
  };

router.get('/api/speech-to-text/token', function(req, res) {
	authorization.getToken(params, function (err, token) {
  		if (err) {
    		console.log('Error retrieving token: ', err);
      		res.status(500).send('Error retrieving token');
      		return;
  		}
	  	else
  		{
  			console.log("Inside stt-token.js. Token - ", token);
  			res.send(token);
  		}
  		});
});
//speech to text
				
router.get('/newfirstcall', function(req, res, next) {
	
  					newconversation.message({
  					workspace_id: '6be20d9f-c8c8-4080-b3b5-a351c77439f6',
  				 	input: {'text': "" },
  						
						},  function(err, response) {
  										if (err)
    										console.log('error:', err);
  										else
										{
										  newcontext = response.context;
										  chattext = "";										 
										  res.send(response.output);										  
										}
									     });

                         });
					
		
router.post('/newconsecutivecalls', function(req, res) {
					newconversation.message({
  					workspace_id: '6be20d9f-c8c8-4080-b3b5-a351c77439f6',
  				 	input: {'text': req.body.question },
  						context: newcontext
						},  function(err, response) {
  										if (err)
    										console.log('error:', err);
  										else
										{
											
											newcontext = response.context;
										    res.send(response.output);																				
										}
						});
});

/*router.get('/sendmail' , function(req,res) {
var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'allianzdemomail@gmail.com', // Your email id
            pass: 'Tcs@1234' // Your password
        }
    });	
	
	var mailOptions = {
    from: 'allianzdemomail@gmail.com', 
    to: 'akshay.gn@tcs.com',
    subject: 'Email Example',
    text: 'This is sample mail'
};

transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
		res.send(info.response);
    };
});
});
*/
router.get('/', function(req,res,next){
res.render('allianzdemo');
});
module.exports = router;

