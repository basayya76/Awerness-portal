import fs from 'fs';

const content = fs.readFileSync('/tmp/build_translations.js', 'utf8');
const fn = new Function('require', content);
fn((mod) => {
  if (mod === 'fs') {
    return {
      writeFileSync: (p, data) => fs.writeFileSync('.' + p, data, 'utf8')
    };
  }
  if (mod === 'path') return import('path');
  return null;
});
console.log('Done executing');
