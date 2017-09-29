
import React from 'react';
import { Redirect } from 'react-router';

export default () => (
  <Redirect key="redirect-to-not-found" from="*" to="/404"/>
);

