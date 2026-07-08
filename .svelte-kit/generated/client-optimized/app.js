// in dev, this makes Vite inject its client as this module's first dependency,
// so that global constant replacements are installed before any other module
// (including user hooks) evaluates. In build it's inert.
import.meta.hot;




export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31'),
	() => import('./nodes/32'),
	() => import('./nodes/33'),
	() => import('./nodes/34')
];

export const server_loads = [0,2,3,4];

export const dictionary = {
		"/": [~5],
		"/about": [6],
		"/admin": [~7,[2]],
		"/admin/companies": [~8,[2]],
		"/admin/email-templates": [~9,[2]],
		"/admin/messages": [~10,[2]],
		"/admin/students": [~11,[2]],
		"/company": [~12,[3]],
		"/company/applications": [~13,[3]],
		"/company/internships": [~14,[3]],
		"/company/messages": [~15,[3]],
		"/company/notifications": [~16,[3]],
		"/contact": [17],
		"/faq": [18],
		"/features": [19],
		"/help": [20],
		"/login": [~21],
		"/privacy-policy": [23],
		"/privacy": [22],
		"/register": [~24],
		"/student": [~25,[4]],
		"/student/certificates": [~26,[4]],
		"/student/companies": [~27,[4]],
		"/student/companies/[id]": [~28,[4]],
		"/student/internships": [~29,[4]],
		"/student/messages": [~30,[4]],
		"/student/notifications": [~31,[4]],
		"/student/profile": [~32,[4]],
		"/student/settings": [~33,[4]],
		"/terms": [34]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';

export const get_error_template = () => import('../shared/error-template.js').then(m => m.default);