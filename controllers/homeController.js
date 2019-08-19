import mysql from 'mysql';
import AppError from '../errors/AppError';

const homeAction = async (req, res, next) => {
  try {
    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    connection.connect();

    connection.query('SELECT * from users', null, (error, results, fields) => {
      if (error) {
        console.log(error);
      }

      if (results) {
        res.json(results);
      }
    });
  } catch (err) {
    next(new AppError(err.message, 400));
  }
};

export default homeAction;