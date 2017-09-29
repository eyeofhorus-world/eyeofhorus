/* eslint-disable prefer-template, no-plusplus */

import validator from 'validator';

export const trimWhitespace = value => validator.trim(value + '');

export const doesContainUnescaped = (valueNullable) => {
  const value = valueNullable || '';
  const unhappyCharacters = '<>&\'":/=+_`';
  for (let i = 0; i < value.length; i++) {
    for (let j = 0; j < unhappyCharacters.length; j++) {
      if ((unhappyCharacters.charAt(j) + '').includes(value.charAt(i))) {
        return true;
      }
    }
  }
  return false;
};

export const escape = value => encodeURIComponent(value || '')
  .replace(/[!'()*]/g, c => ('%' + c.charCodeAt(0).toString(16)));

export const unescape = (value) => {
  let output = '';
  try {
    output = decodeURIComponent(value || '');
  } catch (error) {
    output = '';
  }
  return output;
};

export const needsToBeEscaped = value => (escape(unescape(value || '')) !== (value || ''));

export const isAValidUrl = value => validator.isURL(value + '', {
  protocols: ['http', 'https'], 
  require_tld: true, 
  require_protocol: false, 
  require_host: true, 
  require_valid_protocol: false, 
  allow_underscores: true, 
  host_whitelist: false, 
  host_blacklist: false, 
  allow_trailing_dot: false, 
  allow_protocol_relative_urls: false,
});

export default {
};
