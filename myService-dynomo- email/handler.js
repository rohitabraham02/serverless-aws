const https = require('https');
var aws = require('aws-sdk');
var ses = new aws.SES({ region: "us-east-1" });
exports.index = async (event) => {

  var email= event.Records[0].dynamodb.NewImage.email.S
  const response = await  new  Promise((resolve, reject) => {
  var params = {
  EmailAddress: email
 };
  var sendPromise = ses.verifyEmailAddress(params).promise();
  sendPromise.then(
  function(data) {
    resolve(data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
  });
     
return response;

  
};