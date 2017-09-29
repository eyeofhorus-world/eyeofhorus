
import { urlencoded, json } from 'body-parser';

export default app => new Promise((resolve) => {
  app.use(urlencoded({ extended: true }));
  app.use(json());
  resolve({});
});
