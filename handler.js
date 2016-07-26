const initArm = require('./arm');
const Promise = require('bluebird');
module.exports = class handler {
  constructor() {
    this.arm = null;
  }
  initArm () {
    return Promise.resolve({});
    // return initArm.then(arm => {
    //   this.arm = arm;
    // });
  }
  handle (report) {
    return null;
  }
}
