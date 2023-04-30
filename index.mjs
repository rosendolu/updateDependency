#!/usr/bin/env zx
import 'zx/globals';

await main();

async function main() {
  let bear = await question(
    'Would you like to update to the latest version of each dependency disrespect SemVer? [y/N] '
  );
  if (!/y/i.test(bear)) {
    $`npm update`;
    return;
  }
  let packages = await glob(['package.json']);
  if (!packages.length) {
    let errStr =
      'Current Working dir has"t package.json file .Please init using `npm init` first!';
    console.warn(errStr);
    return;
  }
  let outdatedJson = null;
  try {
    // WARNNING npm outdated exitcode 不为 0,因此返回值 为 ProcessOutput
    await $`npm outdated --json`;
  } catch (error) {
    // console.error('npm outdated failed', error);
    // TODO：用fetch实现，拆分出带个 dependency 的依赖请求
    outdatedJson = JSON.parse(error.stdout);
  }
  if (!outdatedJson) {
    console.error('Failed to fetch dependencies using npm outdated');
    return;
  }
  if (Object.keys(outdatedJson).length == 0) {
    console.log('There are no outdated dependencies');
    return;
  }
  // stage user working
  try {
    await $`git add .`;
  } catch (error) {}
  let pkg = await fs.readJson('./package.json');
  let { dependencies, devDependencies } = pkg;
  const keys = Object.keys(outdatedJson);
  for (const key of keys) {
    if (key in dependencies) {
      //
      dependencies[key] = outdatedJson[key]['latest'];
    } else if (key in devDependencies) {
      devDependencies[key] = outdatedJson[key]['latest'];
      //
    }
  }
  await fs.writeJson('./package.json', pkg);
  // With a message.
  // await spinner('working...', () => $`sleep 3`);
  console.log('Completed', outdatedJson);
}
