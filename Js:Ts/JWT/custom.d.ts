declare global {
	namespace Express {
		interface Request {
			user?: string | any
		}
	}
}

declare module 'express' {
	interface Request {
		user?: string | any
	}
}

export {}