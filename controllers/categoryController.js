import AppError from '../errors/AppError';
import makeQuery from '../service/mySqlConnection';

const categoryAction = async (req, res, next) => {
  try {
    const sql = 'select * from categories';
    const data = await makeQuery(sql);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const getCategoryById = async (req, res, next) => {
  const { categoryId } = req.params;

  try {
    const sql = 'select * from categories where id = ?';
    const data = await makeQuery(sql, categoryId);

    res.json(data);
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

const addNewCategory = async (req, res, next) => {
  const { body } = req;
  const { title, description, category_id } = body;

  const sql = `insert into categories set ?`;

  try {
    const data = await makeQuery(sql, {
      title,
      description,
      category_id,
    });

    res.status(201).send(data);
  } catch (error) {
    next(new AppError(error.message, 400));
  }
};

export { categoryAction, getCategoryById, addNewCategory };
