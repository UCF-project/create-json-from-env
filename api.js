
const fs = require('fs');

function recChange(obj, key, value, matchSplit) {
	if (matchSplit) {
		const keyHasSub = key.match(matchSplit);
		if (keyHasSub) {
			obj[keyHasSub[1]] = obj[keyHasSub[1]] || {};
			obj[keyHasSub[1]] = recChange(obj[keyHasSub[1]], keyHasSub[2], value, matchSplit);
			return obj;
		}
	}
	if (value === 'true') {
		obj[key] = true;
	} else if (value === 'false') {
		obj[key] = false;
	} else {
		obj[key] = value;
	}
	return obj;
}

const createConfFromEnv = options => {
	let config = {};
	if (options.input) {
		config = JSON.parse(fs.readFileSync(options.input));
	}

	if (options.match && typeof options.match === 'string' && options.match.trim()) {
		const re = new RegExp(options.match);
		// var envKeys = Object.keys(process.env);
		// TODO: revise this for in
		for (const key in process.env) { // eslint-disable-line guard-for-in
			const matched = key.match(re);
			if (matched) {
				config = recChange(config, matched[1], process.env[key], options.matchSplit);
			}
		}
	}


	if (options.output) {
		fs.writeFileSync(options.output, JSON.stringify(config, null, 2));
	} else {
		process.stdout.write(JSON.stringify(config, null, 2));
	}
};

module.exports = createConfFromEnv;
