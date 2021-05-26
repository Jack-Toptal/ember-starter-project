import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend({
  currentSession: inject(),

  deleteQuestion: task(function*() {
    const question = this.get('model');

    yield question.destroyRecord();

    this.transitionToRoute('index');
  })
});
