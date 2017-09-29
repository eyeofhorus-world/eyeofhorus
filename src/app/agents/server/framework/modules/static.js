
import express from 'express';
import path from 'path';

export default app => new Promise((resolve) => {
  app.use(express.static(path.join(__dirname, '../../../../../../dist')));
  resolve({});
});
