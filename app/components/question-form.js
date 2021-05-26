import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default Component.extend({
  saveButtonText: '',
  question: null,
  onSuccess() {},

  saveQuestion: task(function* () {
    const question = this.get('question');
    try {
      yield question.save();
    } catch (error) {
      if (!error.isAdapterError) {
        throw error;
      }
      return;
    }
    this.get('onSuccess')(question);
  })
});
