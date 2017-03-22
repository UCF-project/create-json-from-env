
Create a json output from your environment variables.

## Important notice

This CLI should have the same attention as anyone would use `env`.
Specially if you have sensitive information in your environment
variables, we discourage the usage of this tool. For example, one
could easily use this tool to dump all environment variables into a
json file.

## Usage

```shell
$ create-json-from-env --help

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
```
