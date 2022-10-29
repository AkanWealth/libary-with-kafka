import { Router } from 'express';
import bookRoutes from './book/book.route';
import authorRoutes from './author/author.route';

const router = Router();

// router.get('/api', async (req, res, next) => {
//   return res.json({
//     status: true,
//     message: 'Test API limiter',
//   })
// });
router.use('/book', bookRoutes);
router.use('/author', authorRoutes);

router.use('/', async (req, res, next) => {
  return res.send('successful 2s');
});


export default router;
