
import getCommands from '../config/commands';

export default app => new Promise((resolve) => {
  app.set('port', getCommands().port || 8000);
  resolve({});
});
