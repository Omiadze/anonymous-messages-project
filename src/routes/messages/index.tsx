import { AUTH_ROUTES } from './auth';
import { MAIN_ROUTES } from './main';

export const MESSAGES_ROUTES = [...MAIN_ROUTES, ...AUTH_ROUTES];
