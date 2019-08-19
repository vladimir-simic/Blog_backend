import AppError from '../errors/AppError';
import makeQuery from '../service/mySqlConnection';

const commentAction = async (req, res, next) => {
  try {
    const sql = 'select * from comments';
    const data = await makeQuery(sql);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getCommentById = async (req, res, next) => {
  const { commentId } = req.params;

  try {
    const sql = 'select * from comments where id = ?';
    const data = await makeQuery(sql, commentId);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const addNewComment = async (req, res, next) => {
  const { body } = req;
  const {
      title,
      message,
      post_id,
      user_id,
      author,
      author_email
  } = body;

  const sql = `insert into comments set ?`;

  try {
    const data = await makeQuery(sql, {
      title,
      message,
      post_id,
      user_id,
      author,
      author_email
    });

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

export { commentAction, getCommentById, addNewComment };