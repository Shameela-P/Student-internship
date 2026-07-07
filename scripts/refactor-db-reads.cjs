const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/routes/**/*.server.js');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Match the exact pattern: const db = { ... await getCollection ... };
    const regex = /const\s+db\s*=\s*\{\s*([\s\S]*?await\s+getCollection.*?)\s*\};/g;
    
    let modified = false;
    content = content.replace(regex, (match, body) => {
        // Extract the keys and collections
        const lines = body.split(',').map(line => line.trim()).filter(Boolean);
        const pairs = [];
        for (const line of lines) {
            const m = line.match(/(\w+)\s*:\s*await\s+getCollection\((.*?)\)/);
            if (m) {
                pairs.push({ key: m[1], collection: m[2] });
            } else if (line.includes('await getCollection')) {
                // If it couldn't parse properly, abort this replacement
                return match;
            }
        }
        if (pairs.length === 0) return match;
        
        modified = true;
        const destructuring = pairs.map(p => p.key).join(', ');
        const promises = pairs.map(p => `getCollection(${p.collection})`).join(',\n\t\t');
        
        return `const [${destructuring}] = await Promise.all([\n\t\t${promises}\n\t]);\n\tconst db = { ${destructuring} };`;
    });
    
    if (modified) {
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
});
