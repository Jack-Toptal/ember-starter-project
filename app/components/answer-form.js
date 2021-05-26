import Component from '@ember/component';
import { inject } from '@ember/service';
import { task } from 'ember-concurrency';

export default Component.extend({
  store: inject(),
  question: null,
  answer: null,
  onSuccess() {},

  willInsertElement() {
    this.resetAnswer();
  },

  willDestroyElement() {
    if (this.get('answer.isNew')) {
      this.get('answer').unloadRecord();
    }
  },

  resetAnswer() {
    this.set('answer', this.store.createRecord('answer'));
  },

  saveAnswer: task(function*() {
    const answer = this.get('answer');
    answer.set('question', this.get('question'));
    try {
      yield answer.save();
    } catch (error) {
      if (!error.isAdapterError) {
        throw error;
      }
      return;
    }
    this.resetAnswer();
    this.get('onSuccess')(answer);
  })
});
