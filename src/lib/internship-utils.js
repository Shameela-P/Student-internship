export function normalizeSkills(skillsRaw = '') {
	return skillsRaw
		.split(',')
		.map(skill => skill.trim())
		.filter(Boolean);
}

export function buildInternshipPayload({ companyId, formValues, bannerPath = '', existingId = null }) {
	const normalizedType = formValues.type?.toString() ?? '';
	const fee = Number.parseFloat(formValues.fee?.toString() || '0');
	const stipendAmount = Number.parseFloat(formValues.stipendAmount?.toString() || '0');
	const openings = Number.parseInt(formValues.openings?.toString() || '1', 10);
	const safeOpenings = Number.isNaN(openings) || openings < 1 ? 1 : openings;

	return {
		...(existingId ? { id: existingId } : { id: `intern_${Date.now()}` }),
		companyId,
		title: formValues.title?.toString().trim() ?? '',
		domain: formValues.domain?.toString() ?? '',
		subCategory: formValues.subCategory?.toString().trim() ?? '',
		skillsRequired: normalizeSkills(formValues.skillsRequired?.toString()),
		description: formValues.description?.toString().trim() ?? '',
		learningOutcomes: formValues.learningOutcomes?.toString().trim() ?? '',
		responsibilities: formValues.responsibilities?.toString().trim() ?? '',
		eligibilityCriteria: formValues.eligibilityCriteria?.toString().trim() ?? '',
		duration: formValues.duration?.toString() ?? '',
		startDate: formValues.startDate?.toString() ?? '',
		lastDateToApply: formValues.lastDateToApply?.toString() ?? '',
		mode: formValues.mode?.toString() ?? '',
		type: normalizedType,
		fee: normalizedType.includes('Paid') ? fee : 0,
		stipendAmount: normalizedType.includes('Stipend') ? stipendAmount : 0,
		openings: safeOpenings,
		location: formValues.location?.toString().trim() ?? '',
		certificateAvailable: formValues.certificateAvailable?.toString() ?? 'No',
		jobOpportunity: formValues.jobOpportunity?.toString() ?? 'No',
		bannerPath,
		...(existingId ? {} : { status: 'Active', createdAt: new Date().toISOString() })
	};
}
