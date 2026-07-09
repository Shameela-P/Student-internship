import fs from 'fs';
import path from 'path';

// Fix email-templates reactive warning
const emailFile = 'src/routes/admin/email-templates/+page.svelte';
if (fs.existsSync(emailFile)) {
    let content = fs.readFileSync(emailFile, 'utf8');
    content = content.replace(
        /\/\/\ssvelte-ignore\sstate_referenced_locally\n\s*let\stemplates\s=\s\$state\(\[\.\.\.data\.templates\]\);/,
        'let templates = $state([]);\n\t$effect(() => { templates = [...data.templates]; });'
    );
    fs.writeFileSync(emailFile, content, 'utf8');
}

// Fix missing aria-label for toggle details button
const a11yFiles = [
    'src/routes/company/notifications/+page.svelte',
    'src/routes/student/notifications/+page.svelte',
    'src/routes/admin/messages/+page.svelte',
    'src/routes/company/messages/+page.svelte',
    'src/routes/student/messages/+page.svelte'
];

a11yFiles.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        // Fix toggleDetails buttons
        content = content.replace(
            /<button\s+onclick=\{\(\)\s=>\stoggleDetails\(idx\)\}/g,
            '<button aria-label="Toggle details" onclick={() => toggleDetails(idx)}'
        );

        // Fix modal close buttons
        content = content.replace(
            /<button\s+onclick=\{\(\)\s=>\sshowNewChatModal\s=\sfalse\}/g,
            '<button aria-label="Close modal" onclick={() => showNewChatModal = false}'
        );
        
        fs.writeFileSync(file, content, 'utf8');
    }
});
console.log('Fixed A11y issues and Svelte warnings');
