
import React from 'react';
import { Route } from 'react-router';

import View from './view';

export default () => (
  <Route key="not-found" path="/404" component={View}/>
);
