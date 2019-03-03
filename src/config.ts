import { env } from "process"

export function isProd(): boolean {
	return env.NODE_ENV === "PRODUCTION"
}

export const config = {
	PORT_APP: env.API_PORT || 3000,
	SECRET: env.API_SECRET || '',
};
