#!/usr/bin/env node
// create-json-from-env --from base.json --match "^MYVARS_(.+)" --match-split "([^_.]+)_(.+)" > output.json
'use strict';
const meow = require('meow');
const api = require('./api');

const cli = meow(`
		Usage
			$ create-json-from-env

		Options
			--input, -i  Base json file with default values.
			--match, -m  Expression to match against environment variable.
			--match-split, -ms  Expression to split variables.
			--output, -o File to write output.

		Example
			$ MYVARS_var1=test create-json-from-env --match ^MYVARS_(.+)
			{
				"var1": "test"
			}

			$ MYVARS_var1_var3=test1 MYVARS_var1_var2=false create-json-from-env --match "^MYVARS_(.+)" --match-split "([^_.]+)_(.+)"
			{
				"var1": {
					"var3": "test1",
					"var2": false
				}
			}
`, {
	alias: {
		i: 'input',
		m: 'match',
		ms: 'match-split',
		o: 'output'
	}
});

api(cli.flags);
