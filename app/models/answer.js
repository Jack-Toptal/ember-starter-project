import DS from 'ember-data';

export default DS.Model.extend({
  question: DS.belongsTo('question', { async: false }),
  user: DS.belongsTo('user', { async: false }),
  body: DS.attr('string')
});
