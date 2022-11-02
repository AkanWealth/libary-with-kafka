import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import Author from '../../../database/models/author.model';
import { success } from '../../common/utils';

const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    const author = new Author({
      _id: new mongoose.Types.ObjectId(),
      name,
    });
    await author.save();
    return res.status(201).json(success('Book created successfully', author));
  } catch (error) {
    return next(error);
  }
};

const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorId = req.params.authorId;
    const author = await Author.findById(authorId);
    return res
      .status(200)
      .json(success('Books retrieved successfully', author));
  } catch (error) {
    return next(error);
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allAuthor = await Author.find();
    return res
      .status(200)
      .json(success('Authors retrieved successful', allAuthor));
  } catch (error) {
    return next(error);
  }
};

const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorId = req.params.authorId;

  return await Author.findById(authorId)
    .then((author) => {
      if (author) {
        author.set(req.body);

        return author
          .save()
          .then((author) => res.status(201).json({ author }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: 'not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorId = req.params.authorId;

  return await Author.findByIdAndDelete(authorId)
    .then((author) =>
      author
        ? res.status(201).json({ author, message: 'Deleted' })
        : res.status(404).json({ message: 'not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createAuthor,
  readAuthor,
  readAll,
  updateAuthor,
  deleteAuthor,
};
