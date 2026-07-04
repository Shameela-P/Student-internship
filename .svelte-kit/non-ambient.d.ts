
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/admin" | "/admin/companies" | "/admin/email-templates" | "/admin/messages" | "/admin/notifications" | "/admin/students" | "/api" | "/api/attachments" | "/api/attachments/[filename]" | "/api/messages" | "/api/messages/read" | "/api/notifications" | "/api/notifications/read" | "/api/refresh" | "/api/resumes" | "/api/resumes/[filename]" | "/company" | "/company/applications" | "/company/internships" | "/company/messages" | "/company/notifications" | "/login" | "/login/google" | "/logout" | "/register" | "/student" | "/student/certificates" | "/student/companies" | "/student/internships" | "/student/messages" | "/student/notifications" | "/student/profile" | "/student/settings" | "/verify";
		RouteParams(): {
			"/api/attachments/[filename]": { filename: string };
			"/api/resumes/[filename]": { filename: string }
		};
		LayoutParams(): {
			"/": { filename?: string | undefined };
			"/admin": Record<string, never>;
			"/admin/companies": Record<string, never>;
			"/admin/email-templates": Record<string, never>;
			"/admin/messages": Record<string, never>;
			"/admin/notifications": Record<string, never>;
			"/admin/students": Record<string, never>;
			"/api": { filename?: string | undefined };
			"/api/attachments": { filename?: string | undefined };
			"/api/attachments/[filename]": { filename: string };
			"/api/messages": Record<string, never>;
			"/api/messages/read": Record<string, never>;
			"/api/notifications": Record<string, never>;
			"/api/notifications/read": Record<string, never>;
			"/api/refresh": Record<string, never>;
			"/api/resumes": { filename?: string | undefined };
			"/api/resumes/[filename]": { filename: string };
			"/company": Record<string, never>;
			"/company/applications": Record<string, never>;
			"/company/internships": Record<string, never>;
			"/company/messages": Record<string, never>;
			"/company/notifications": Record<string, never>;
			"/login": Record<string, never>;
			"/login/google": Record<string, never>;
			"/logout": Record<string, never>;
			"/register": Record<string, never>;
			"/student": Record<string, never>;
			"/student/certificates": Record<string, never>;
			"/student/companies": Record<string, never>;
			"/student/internships": Record<string, never>;
			"/student/messages": Record<string, never>;
			"/student/notifications": Record<string, never>;
			"/student/profile": Record<string, never>;
			"/student/settings": Record<string, never>;
			"/verify": Record<string, never>
		};
		Pathname(): "/" | "/admin" | "/admin/companies" | "/admin/email-templates" | "/admin/messages" | "/admin/notifications" | "/admin/students" | `/api/attachments/${string}` & {} | "/api/messages/read" | "/api/notifications/read" | "/api/refresh" | `/api/resumes/${string}` & {} | "/company" | "/company/applications" | "/company/internships" | "/company/messages" | "/company/notifications" | "/login" | "/login/google" | "/logout" | "/register" | "/student" | "/student/certificates" | "/student/companies" | "/student/internships" | "/student/messages" | "/student/notifications" | "/student/profile" | "/student/settings" | "/verify";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}