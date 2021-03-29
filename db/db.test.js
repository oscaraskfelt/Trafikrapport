const db = require('./db');

describe('Remove user', () => {
  it('Removes user and returns true, else returns false', () => {
    expect(db.removeUser({id: null})).toEqual(false);
  });
});
