/* eslint-disable import/no-extraneous-dependencies, no-unused-expressions, no-unused-vars */

import Immutable from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';

import chai from 'chai';
import { describe, it, beforeEach } from 'mocha';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import waitForBrowser from '../../wait-for-browser';

chai.should();
chai.use(sinonChai);
let store;

describe('Test Stack', () => {
  beforeEach((done) => {
    waitForBrowser(() => {
      store = createStore(combineReducers({}), applyMiddleware(thunk));
      done();
    });
  });
  it('should work with 2+2=4', () => {
    (2 + 2).should.equal(4);
  });
});
