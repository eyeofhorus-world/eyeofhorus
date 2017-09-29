
import cookieParser from 'cookie-parser';

export default app => new Promise((resolve) => {
  app.use(cookieParser());
  resolve({});
});
