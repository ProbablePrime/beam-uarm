var Arm = require('uarmforjs');
var Promise = require('bluebird');
var requestPort = Promise.promisify(Arm.requestPort);
module.exports = Promise.resolve({});
// module.exports = requestPort.then(port).then(port => {
//   arm = Arm(port.comName);
//   return new Promise((resolve, reject) => {
//     arm.on('ready', arm=> resolve(arm));
//   });
// });
