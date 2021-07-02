'use strict';
var AWS = require('aws-sdk');

module.exports.index = async (event) => {

  
  const response = await  new  Promise((resolve, reject) => {
    var params = {
      Message: 'MESSAGE_TEXT', /* required */
      TopicArn: 'arn:aws:sns:us-east-1:594770830557:my-topic'
    };
    var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
    publishTextPromise.then(
      function(data) {
        console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
       ;
        resolve({
             statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v2.0! Your function executed successfully!!!',
        input: data,
      },
      null,
      2
    ),
            });
        
      }).catch(
        function(err) {
        console.error(err, err.stack);
      })
  });    

return response
  


};


module.exports.trigger = async event => {
  console.log(event);
  return null;
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};