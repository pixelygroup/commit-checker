# commit-checker

![Commit screenshot](https://github.com/pixelygroup/screenshots/raw/main/commit-checker/commit.gif)

This utility is primarily design to work with **JIRA** projects, nevertheless can be used in combination with **clickup** or other tools relying on ticket numbers (e.g. AB-100). The project prefix is customisable via command line tool. See the configuration section below.


## Installation
In your project directory, run following command to install `@pixelygroup/eslint-config-px` and `husky`
```shell
npm i -D @pixelygroup/commit-checker husky
```

## Configuration

![Config screenshot](https://github.com/pixelygroup/screenshots/raw/main/commit-checker/config.gif)

1. To use the tool add the following to your package.json:

```json
// package.json
...
"husky": {
  "commit-msg": "px-commit -- -E HUSKY_GIT_PARAMS"
},
...
```

2. Configure the project code by running the following code from your project folder.

```shell
npx px-commit --init
```
This will crate `.pxcommitcheckrc` file in the root folder of your project and generate allowed regex strings to match `XX-000 some message` and `Release 1.1.1` commit messages.

Alternatively, you can create the file manually and add your own patterns

```
/^XX-\d+\s.*$/gm
/^Release \d\.\d\.\d(-.+)?/
```

## More information
For more information about husky visit:
- [Husky](https://www.npmjs.com/package/husky)

