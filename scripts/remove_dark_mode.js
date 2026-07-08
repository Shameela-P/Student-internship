import fs from 'fs';
import path from 'path';

const srcDir = './src';

function walk(dir) {
	let results = [];
	const list = fs.readdirSync(dir);
	list.forEach((file) => {
		const fullPath = path.join(dir, file);
		const stat = fs.statSync(fullPath);
		if (stat && stat.isDirectory()) {
			results = results.concat(walk(fullPath));
		} else {
			results.push(fullPath);
		}
	});
	return results;
}

const files = walk(srcDir);

files.forEach((file) => {
	const ext = path.extname(file);
	if (['.svelte', '.js', '.css', '.html'].includes(ext)) {
		let content = fs.readFileSync(file, 'utf8');
		const original = content;

		// Remove Tailwind v4 and v3 dark mode prefix classes
		// Matches patterns like dark:bg-slate-900, dark:hover:text-white, dark:group-hover:text-slate-400
		content = content.replace(/\bdark:[a-zA-Z0-9\/\.\-:\/*]+/g, '');

		// Clean up any double spaces that resulted from removal
		content = content.replace(/class="([^"]*)"/g, (match, classVal) => {
			const cleaned = classVal.split(/\s+/).filter(Boolean).join(' ');
			return `class="${cleaned}"`;
		});

		if (content !== original) {
			fs.writeFileSync(file, content, 'utf8');
			console.log(`Cleaned dark mode styles from: ${file}`);
		}
	}
});

console.log('All dark mode classes successfully removed!');
