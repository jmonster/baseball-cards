import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  answers: computed(function() {
    return {};
  }),

  allQuestions: alias('model'),
  questions: computed('allQuestions.@each.enabled', function() {
    return this.get('model').filter((q) => q.get('enabled'));
  }),

  actions: {
    didSelect(question, choice) {
      if (!choice) { return; }

      const allQuestions = this.get('allQuestions');
      question.set('answer', choice);

      if (choice.enables) {
        const q = allQuestions.find(({ identifier }) => {
          return choice.enables.find(((c) => c === identifier));
        });

        if (q) {
          q.set('enabled', true);
        }
      }

      if (choice.disables) {
        const q = allQuestions.find(({ identifier }) => {
          return choice.disables.find(((c) => c === identifier));
        });

        if (q) {
          q.set('enabled', false);
        }
      }
    }
  }
});
