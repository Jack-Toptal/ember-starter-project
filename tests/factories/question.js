import FactoryGuy from 'ember-data-factory-guy';

FactoryGuy.define('question', {
  default: {
    user: FactoryGuy.belongsTo('user'),
    title: 'Question title',
    description: 'Question description',
    tags: 'tag1,tag2,tag3',
    views: 2980,
    slug: 'question-title'
  }
});
