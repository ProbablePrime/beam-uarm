const Beam = require('beam-client-node');
const Interactive = require('beam-interactive-node');
const Packets = require('beam-interactive-node/dist/robot/packets').default;

const auth = require('./auth');
const Handler = require('./handler');

const beam = new Beam();
const handler = new Handler();

function createRobot (details) {
  return new Interactive.Robot(details);
}

function performRobotHandShake (robot) {
    return new Promise((resolve, reject) => {
        robot.handshake(err => {
            if (err) {
                reject(err);
            }
            resolve(robot);
        });
    });
}

function setupRobotEvents (robot) {
    robot.on('report', report => {
      const progress = handler.handle(report);
      if (progress) {
        robot.send(progress);
      }
    });
    robot.on('error', err => {
        throw new Error('There was an error in the Interactive connection', err);
    });
}
handler.initArm()
  .then(() => auth(beam))
  .then(channel => {
    return beam.game.join(channel.id)
    .then(res => {
      return {
        remote: res.body.address,
        channel: channel.id,
        key: res.body.key,
      };
    });
  })
  .then(details => createRobot(details))
  .then(robot => performRobotHandShake(robot))
  .then(robot => setupRobotEvents(robot))
  .then(() => console.log('Waiting for Interactive Events'))
  .catch(err => {
    if (err.res) {
      console.log(err.message);
    }
    console.log(err);
    console.log(err.message);
    throw new Error('Error connecting to Interactive', err);
  });
