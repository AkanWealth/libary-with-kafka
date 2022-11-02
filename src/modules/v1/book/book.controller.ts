import mongoose from 'mongoose';
import { success } from '../../common/utils';
import Book from '../../../database/models/book.model';
import { NextFunction, Request, Response } from 'express';
// import { Books, ExcludedAttribs } from '../../../types';x

// type Props = Omit<Books, ExcludedAttribs>;

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { author, title } = req.body;

    const book = new Book({
      _id: new mongoose.Types.ObjectId(),
      author,
      title,
    });
    await book.save();
    return res.status(201).json(success('Book created successfully', book));
  } catch (error) {
    return next(error);
  }
};

const readBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookId = req.params.bookId;
    const book = await Book.findById(bookId).populate('author');
    return res
      .status(200)
      .json(success('Books retrieved successfully',{book}));
  } catch (error) {
    return next(error);
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allBook = await Book.find();
    return res
      .status(200)
      .json(success('Books retrieved successfully', allBook));
  } catch (error) {
    return next(error);
  }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return await Book.findById(bookId)
    .then((book) => {
      if (book) {
        book.set(req.body);

        return book
          .save()
          .then((book) => res.status(201).json({ book }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: 'not found' });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.bookId;

  return await Book.findByIdAndDelete(bookId)
    .then((book) =>
      book
        ? res.status(201).json({ book, message: 'Deleted' })
        : res.status(404).json({ message: 'not found' })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default { createBook, readBook, readAll, updateBook, deleteBook };
