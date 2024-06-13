# Cricket CLI

![build-test](https://github.com/sanwebinfo/cricket-cli/workflows/build-test/badge.svg)  ![npm](https://github.com/sanwebinfo/cricket-cli/workflows/npm/badge.svg)  

Get Live Cricket Score Update on Your Terminal and CMD.  

## Built using

- Typescript
- Axios
- Yargs - <https://yargs.js.org/>
- `Yaml` - Read the API URL  

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

- Create `cricket.yml` file on your **`HOME`** Directory to add Cricket API URL

```yml
BASE_URL: 'https://cricket.example.com/score
```

- **Get Cricket API : <https://github.com/sanwebinfo/cricket-score/tree/main/data>**
- Link and Test the CLI Locally

```sh
npm link or pnpm link --global
```

- unlink CLI

```sh
npm rm --global cricket-data or pnpm uninstall --global cricket-data
```

- Access CLI Globally

```sh

cricket score --help

cricket score <MatchID>

cricket score <MatchID> --details

```

- Access via `NPX`

```sh
npx cricket-data score <MatchID> or npx cricket-data score --help
```

- install via `NPM` and `PNPM`

```sh

## install via npm
npm install -g cricket-data

## Remove Package
npm uninstall -g cricket-data


## install via pnpm
pnpm install -g cricket-data

## update package
pnpm update -g cricket-data

## Remove Package
pnpm uninstall -g cricket-data

```

## MISC (Development)

- Clear NPX and PNPM Cache

```sh
npx clear-npx-cache
pnpm store prune
```

## Contributing 🙌

Your PR's are Welcome  

## Disclaimer 🗃

- This is not an Offical API from Cricbuzz - it's an Unofficial API
- This is for Education Purpose only - use at your own risk on Production Site

All Credits Goes to <https://www.cricbuzz.com/>  

## LICENSE

MIT
