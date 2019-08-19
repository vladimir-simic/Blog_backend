import express from 'express';
import bodyParser from 'body-parser';
import './utils/dotenv';
import fileUpload from 'express-fileupload';
import healthCheck from './routes/healthCheck';
import homeRoute from './routes/homeRoute';
import commentRoute from './routes/commentRoute';
import postRoute from './routes/postRoute';
import userRoute from './routes/userRoute';
import authorRoute from './routes/authorRoute';
import categoryRoute from './routes/categoryRoute';
import fileRoute from './routes/fileRoute';
import defaultErrorHandler from './middlewares/defaultErrorHandler';

const logger = require('./utils/logger')(process.env.APP_NAME);

const app = express();
app.use(
  fileUpload({
    createParentPath: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/public`));
app.use('/files', fileRoute);

app.use(`/api/v${process.env.API_VERSION}`, healthCheck);
app.use('/', homeRoute);
app.use('/comments', commentRoute);
app.use('/posts', postRoute);
app.use('/users', userRoute);
app.use('/authors', authorRoute);
app.use('/categories', categoryRoute);

app.use(defaultErrorHandler);

app.listen(process.env.APP_PORT, 'localhost', () => {
  logger.log(
    'info',
    `App is running at http://localhost:${process.env.APP_PORT} in ${app.get('env')} mode.`,
  );
});

module.exports = app;
