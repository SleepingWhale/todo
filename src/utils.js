import _ from 'lodash';

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

export const getGuid = () =>
  `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;

export const pluralize = (word, count) => (count === 1 ? word : `${word}s`);

export const ESCAPE_KEY = 27;
export const ENTER_KEY = 13;

export const setIn = (state, path, value) =>
  _.setWith(_.clone(state), path, value, _.clone);
