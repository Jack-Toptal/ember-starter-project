import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  user: DS.belongsTo('user', { async: false }),
  answers: DS.hasMany('answer', { async: false }),
  title: DS.attr('string'),
  description: DS.attr('string'),
  tags: DS.attr('string'),
  views: DS.attr('number'),
  slug: DS.attr('string'),

  tagsArray: computed('tags', function() {
    if (this.get('tags')) {
      return this.get('tags').split(',');
    }
    return [];
  }),

  loadedAnswers: computed('answers.@each.hasDirtyAttributes', function() {
    return this.get('answers').filter(
      answer => !answer.get('hasDirtyAttributes')
    );
  })
});
