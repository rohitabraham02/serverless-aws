const https = require('http');
exports.index = async (event) => {
    let dataString = '';
    
    const response = await new Promise((resolve, reject) => {
        const req = https.get("http://172.31.24.138", function(res) {
          res.on('data', chunk => {
            dataString += chunk;
          });
          res.on('end', () => {
            resolve({
                headers: {
                'Content-Type': 'text/html',
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
    
    return response;
};
