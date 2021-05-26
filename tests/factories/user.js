import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('user', {
  default: {
    email: FactoryGuy.generate((n) => `test${n}@example.com`),
    account: FactoryGuy.generate(function(n) {
      return { id: n }
    })
  }
});
