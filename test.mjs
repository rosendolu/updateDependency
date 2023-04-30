import 'zx/globals';

let name = await $`cat package.json | grep name`;
console.log('name', name);
try {
  let outdatedJson = await $`npm outdated --json`;

  console.log('outdatedJson', outdatedJson);
} catch (error) {
  console.log('err', error);
}
