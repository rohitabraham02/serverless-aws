
'use strict';
class Deploy {
  constructor() {
    this.commands = {
      deploy: {
        lifecycleEvents: ['functions'],
      },
    };

    this.hooks = {
      'deploy:functions': this.deployFunctions,
     
     
      'after:deploy:functions': this.afterDeployFunctions,
      'after:deploy:cleanup': this.finalDeployFunctions,
      'before:deploy:functions': this.beforeDeployFunctions
      
    };
  }

  beforeDeployFunctions() {
    console.log('Before Deploy Functions');
  }

  deployFunctions() {
    console.log('Deploy Resources');
  }

  afterDeployFunctions() {
    console.log('After Deploy Functions');
  }

  finalDeployFunctions() {
    console.log('After  serverless');
  }
}

module.exports = Deploy;