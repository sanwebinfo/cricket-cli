# Cricket CLI

![build-test](https://github.com/sanwebinfo/cricket-cli/workflows/build-test/badge.svg)  ![npm](https://github.com/sanwebinfo/cricket-cli/workflows/npm/badge.svg)  

Get Live Cricket Score Update on Your Terminal.  

## Built using

- Typescript
- Axios
- Yargs - <https://yargs.js.org/>
- `Yaml` Read the API URL  

## Setup

- Clone or Download Repo

```sh

git clone https://github.com/sanwebinfo/cricket-cli.git

## Open Project Folder
cd cricket-cli

## install packages
pnpm install

## build CLI
pnpm build

```

- Create `cricket.yml` file and add your Cricket API URL

```yml
BASE_URL: 'https://cricket.example.com/score
```

- Get Cricket API : <https://github.com/sanwebinfo/cricket-score/tree/main/data>
- Link and Test the CLI Locally

```sh
npm link or pnpm link --global
```

- unlink CLI

```sh
npm rm --global cricket-cli or pnpm uninstall --global cricket-cli
```

- Access CLI Globally

```sh

cricket score --help

cricket score <MatchID>

cricket score <MatchID> --details

```

- Access via `NPX`

```sh
npx cricket-cli "cricket score <MatchID>"
```

- install via `NPM` and `PNPM`

```sh

## install via npm
npm install -g cricket-cli

## Remove Package
npm uninstall -g cricket-cli


## install via pnpm
pnpm install -g cricket-cli

## update package
pnpm update -g cricket-cli

## Remove Package
pnpm uninstall -g cricket-cli

```

## MISC (Development)

- Clear NPX and PNPM Cache

```sh
npx clear-npx-cache
pnpm store prune
```

## LICENSE

MIT
