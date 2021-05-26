import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    exitedRoute() {
      this.get('question').rollbackAttributes();
    },
    onQuestionUpdated(question) {
      this.transitionToRoute('question', question.get('slug'));
    }
  }
});
