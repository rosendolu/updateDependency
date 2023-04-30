# updateDependency

A cli to update package.json disrespect SemVer.

## Prerequisite

> This cli rely on `zx` lib ,you need to install it first.

```sh
npm i -g zx
```

## Usage

Global install

```sh
npm i updatedependency -g

# change to the working directory
updatedependency
```

Project install

```sh
npm i updatedependency -D

# Change to your working directory
npx updatedependency # npm version need to be large then 5.2
```
