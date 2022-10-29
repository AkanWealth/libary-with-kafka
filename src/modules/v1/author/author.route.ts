import express from 'express';
import controller from '../../v1/author/author.controller';
import { Authenticate, validate } from '../../common/utils';
import { authorCreationRules, authorUpdateRules } from './author.validation';
// import { Schemas, ValidateJoi } from '../../middleware/Joi';

const app = express.Router();

app.get('/', controller.readAll);
app.get('/:authorId', controller.readAuthor);
app.delete('/:authorId', controller.deleteAuthor);
app.post(
  '/',
  // Authenticate,
  authorCreationRules(),
  validate,
  controller.createAuthor
);
app.patch(
  '/:authorId',
  // Authenticate,
  authorUpdateRules(),
  validate,
  controller.updateAuthor
);

export = app;
