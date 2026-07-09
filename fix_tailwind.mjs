import fs from 'fs';
import path from 'path';

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.svelte')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let updated = content
        .replace(/bg-gradient-to-/g, 'bg-linear-to-')
        .replace(/\bflex-grow\b/g, 'grow')
        .replace(/\bflex-shrink-0\b/g, 'shrink-0');
    
    if (content !== updated) {
        fs.writeFileSync(file, updated, 'utf8');
        console.log(`Updated classes in ${file}`);
    }
});
