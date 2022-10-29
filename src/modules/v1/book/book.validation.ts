import { body } from 'express-validator';

export function bookCreationRules() {
	return [
		body("author").isString(),
		body("title").isString().notEmpty(),
	];
}

export function bookUpdateRules() {
	return [
		body("author").isString(),
		body("title").isString().notEmpty(),
	];
}