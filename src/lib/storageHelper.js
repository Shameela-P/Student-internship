import { storage } from '$lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Uploads a file buffer to Firebase Storage.
 * @param {ArrayBuffer|Buffer|Uint8Array} buffer - The file buffer.
 * @param {string} storagePath - The destination path in Storage (e.g. 'resumes/abc.pdf').
 * @param {string} contentType - The MIME type of the file.
 * @returns {Promise<string>} The public download URL.
 */
export async function uploadFileBuffer(buffer, storagePath, contentType = 'application/pdf') {
	const storageRef = ref(storage, storagePath);
	// We can upload Uint8Array directly
	const uint8Array = new Uint8Array(buffer);
	
	await uploadBytes(storageRef, uint8Array, {
		contentType
	});
	
	const downloadUrl = await getDownloadURL(storageRef);
	return downloadUrl;
}
