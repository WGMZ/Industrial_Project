/** @type {import('npm-check-updates').RunOptions} */
module.exports = {
  target: (packageName, versionRange) => {
    if (['nanoid'].includes(packageName)) return 'minor';

    return 'latest';
  },
};
