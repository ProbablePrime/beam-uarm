const Promise = require('bluebird');
module.exports = function (beam) {
	const config = require('./config/auth.json');
	if (config.token) {
		return oAuth(config, beam);
	}
	if (config.username && config.password) {
		return password(config, beam);
	}
};

function oAuth(config, beam) {
	beam.use('oauth', {
		tokens: {
			access: config.token,
			expires: Date.now() + 365 * 24 * 60 * 60 * 1000
		}
	});
	return getChannel(config, beam);
}

function password(config, beam) {
	return beam.use('password', config)
	.attempt()
	.then(()=> getChannel(config, beam));
}

function getChannel(config, beam) {
	return beam.request('GET', `/channels/${config.username}`).then(res => res.body);
}
