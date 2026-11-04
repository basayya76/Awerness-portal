import fs from 'fs';
import path from 'path';

// Read the previous temporary script we wrote
const scriptContent = fs.readFileSync('/tmp/build_translations.js', 'utf8');
// Execute it
eval(scriptContent);
