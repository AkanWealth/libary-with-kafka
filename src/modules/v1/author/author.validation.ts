import { body } from 'express-validator';

export function authorCreationRules() {
	return [
		body("name").isString().notEmpty(),
	];
}

export function authorUpdateRules() {
	return [
		body("name").isString().notEmpty(),
	];
}