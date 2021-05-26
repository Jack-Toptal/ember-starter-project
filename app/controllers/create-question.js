import Controller from '@ember/controller';

export default Controller.extend({
  question: null,
  actions: {
    enteredRoute() {
      this.set('question', this.store.createRecord('question'));
    },
    exitedRoute() {
      if (this.get('question.isNew')) {
        this.get('question').unloadRecord();
      }
      this.set('question', null);
    },
    onQuestionCreated(question) {
      this.transitionToRoute('question', question.get('slug'));
    }
  }
});
