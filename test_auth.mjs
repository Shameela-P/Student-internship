import crypto from 'crypto';

function verifyPassword(password, stored) {
	try {
		if (!stored || !stored.includes(':')) return false;
		const [salt, hash] = stored.split(':');
		const verify = crypto.scryptSync(password, salt, 64).toString('hex');
		const hashBuf = Buffer.from(hash, 'hex');
		const verifyBuf = Buffer.from(verify, 'hex');
		if (hashBuf.length !== verifyBuf.length) return false;
		return crypto.timingSafeEqual(hashBuf, verifyBuf);
	} catch (e) {
		console.error('Password verification failed:', e);
		return false;
	}
}

const hash = "da249197b57dbc5f3cc22c6a3c21553c:f79b53ce6e17a3b7775e91188c69abbbd348a560f3d8d0f67724b99e91dad5a145686f18b81e900c06b1db7ef0aeecf5d22cedb35c2e5e4b5769d1ff6ba34cf1";
console.log("admin123:", verifyPassword("admin123", hash));
