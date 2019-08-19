import AppError from '../errors/AppError';
import makeQuery from '../service/mySqlConnection';

const postAction = async (req, res, next) => {
  try {
    const sql = 'select * from posts';
    const data = await makeQuery(sql);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getPostById = async (req, res, next) => {
  const { postId } = req.params;

  try {
    const sql = 'select * from posts where id = ?';
    const data = await makeQuery(sql, postId);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const addNewPost = async (req, res, next) => {
  const { body } = req;
  const { title, content, created_at, author, author_email } = body;

  const sql = `insert into posts set ?`;

  try {
    const data = await makeQuery(sql, {
      title,
      content,
      created_at,
      author,
      author_email,
    });

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

export { postAction, getPostById, addNewPost };
