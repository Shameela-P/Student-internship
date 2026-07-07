const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/routes/**/*.server.js');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /const\s+\[([a-zA-Z0-9_,\s]+)\]\s*=\s*await\s+Promise\.all\(\[\s*([\s\S]*?)\s*\]\);\s*const\s+db\s*=\s*\{([a-zA-Z0-9_,\s]+)\};/g;
    
    let modified = false;
    content = content.replace(regex, (match, destructuring, promises, originalDb) => {
        // Only run if not already prefixed with Data
        if (destructuring.includes('Data')) return match;

        modified = true;
        const keys = destructuring.split(',').map(k => k.trim());
        const mappedKeys = keys.map(k => `${k}Data`);
        const newDestructuring = mappedKeys.join(', ');
        const newDb = keys.map((k, i) => `${k}: ${mappedKeys[i]}`).join(', ');
        
        return `const [${newDestructuring}] = await Promise.all([\n\t\t${promises}\n\t]);\n\tconst db = { ${newDb} };`;
    });
    
    if (modified) {
        fs.writeFileSync(file, content);
        console.log(`Fixed shadowing in ${file}`);
    }
});
