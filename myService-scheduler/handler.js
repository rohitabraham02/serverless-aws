const https = require('https');
var aws = require('aws-sdk');
var ses = new aws.SES({ region: "us-east-1" });
exports.index = async (event) => {
    let dataString = '';
    
    const response =await new  Promise((resolve, reject) => {
        const req = https.get("https://api.coindesk.com/v1/bpi/currentprice.json", function(res) {
          res.on('data', chunk => {
            dataString += chunk;
          });
          res.on('end', () => {
            resolve({
                headers: {
                'Content-Type': 'application/json',
                },
                statusCode: 200,
                body: dataString
            });
          });
        });
        
        req.on('error', (e) => {
          reject({
              statusCode: 500,
              body: 'Something went wrong!'
          });
        });
    });
    

  
  const response1 = await  new  Promise((resolve, reject) => {
    console.log(response);
    var val = JSON.stringify(response.body);
   var params = {
    Destination: {
      ToAddresses: ['verylazycoders@gmail.com'],
    },
    Message: {
      Body: {
        Text: { Data: val },
      },

      Subject: { Data: "Test Email" },
    },
    Source: "verylazycoders@gmail.com",
  };
  var sendPromise = ses.sendEmail(params).promise();
  sendPromise.then(
  function(data) {
    resolve(data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });
  });
       
    return response1;
  
};
