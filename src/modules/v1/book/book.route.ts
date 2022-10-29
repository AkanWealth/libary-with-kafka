import express from 'express';
// import { Schemas, ValidateJoi } from '../../middleware/Joi';
import { bookCreationRules } from './book.validation';
import controller from '../../v1/book/book.controller';
import { Authenticate, validate } from '../../common/utils';
import { authorUpdateRules } from '../author/author.validation';

const app = express.Router();

app.get('/', controller.readAll);
app.get('/:bookId', controller.readBook);
app.delete('/:bookId', controller.deleteBook);
app.post(
  '/',
  // Authenticate,
  bookCreationRules(),
  validate,
  controller.createBook
);
app.patch(
  '/:bookId',
  // Authenticate,
  authorUpdateRules(),
  validate,
  controller.updateBook
);

export = app;
