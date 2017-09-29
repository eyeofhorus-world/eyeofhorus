/* eslint-disable import/no-extraneous-dependencies */

import jsdom from 'jsdom';
import jQuery from 'jquery';

export default function (callback) {
  jsdom.env({
    html: '<html><body></body></html>',
    done: (errs, window) => {
      global.window = window;
      global.$ = jQuery(window);
      global.jQuery = global.$;

      callback();
    },
  });
}
