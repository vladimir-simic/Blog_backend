import AppError from '../errors/AppError';
import makeQuery from '../service/mySqlConnection';

const authorAction = async (req, res, next) => {
  try {
    const sql = 'select * from authors';
    const data = await makeQuery(sql);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getAuthorById = async (req, res, next) => {
  const { authorId } = req.params;

  try {
    const sql = 'select * from authors where id = ?';
    const data = await makeQuery(sql, authorId);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const addNewAuthor = async (req, res, next) => {
  const { body } = req;
  const { name, image, description } = body;

  const sql = `insert into authors set ?`;

  try {
    const data = await makeQuery(sql, {
      name,
      image,
      description,
    });

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

export { authorAction, getAuthorById, addNewAuthor };
