import AppError from '../errors/AppError';
import makeQuery from '../service/mySqlConnection';

const userAction = async (req, res, next) => {
  try {
    const sql = 'select * from users';
    const data = await makeQuery(sql);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const sql = 'select * from users where id = ?';
    const data = await makeQuery(sql, userId);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const addNewUser = async (req, res, next) => {
  const { body } = req;
  const {
      username,
      image,
      password,
      email,
      is_active,
  } = body;

  const sql = `insert into comments set ?`;

  try {
    const data = await makeQuery(sql, {
      username,
      image,
      password,
      email,
      is_active,
    });

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

export { userAction, getUserById, addNewUser };