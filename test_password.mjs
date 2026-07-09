import crypto from 'crypto';

export function verifyPassword(password, hash) {
    if (!hash) return false;
    if (hash.includes(':')) {
        const [salt, key] = hash.split(':');
        const buffer = crypto.scryptSync(password, salt, 64);
        return crypto.timingSafeEqual(Buffer.from(key, 'hex'), buffer);
    }
    return password === hash;
}

const hash = "da249197b57dbc5f3cc22c6a3c21553c:f79b53ce6e17a3b7775e91188c69abbbd348a560f3d8d0f67724b99e91dad5a145686f18b81e900c06b1db7ef0aeecf5d22cedb35c2e5e4b5769d1ff6ba34cf1";
console.log("admin123:", verifyPassword("admin123", hash));
console.log("admin@123:", verifyPassword("admin@123", hash));
console.log("admin:", verifyPassword("admin", hash));
