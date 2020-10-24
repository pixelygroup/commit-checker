# commit-checker

This utility is primarily design to work with **JIRA** projects, nevertheless can be used in combination with **clickup** or other tools relying on ticket numbers (e.g. AB-100). The project code is customisable via


## Installation
```shell
npm i -D @pixelygroup/eslint-config-px husky

```

## Configuration

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
/^XX-\d+\s.*$/igm
/^Release \d\.\d\.\d(-.+)?/
```

## More information
For more information about husky visit:
- [Husky](https://www.npmjs.com/package/husky)

