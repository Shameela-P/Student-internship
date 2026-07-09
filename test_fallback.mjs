import { queryDocumentsPaginated } from './src/lib/db.js';

async function test() {
    const admins = await queryDocumentsPaginated('admins', 'email', 'admin@nexora.com', 1);
    console.log("Admins result:", admins);
    process.exit(0);
}
test();
