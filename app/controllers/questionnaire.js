import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  queryParams: ['questionIdx'],
  questionIdx: 0,
  
  question: computed('questionIdx', function() {
    const idx = this.get('questionIdx');
    return this.get('questions').objectAt(idx);
  }),

  allQuestions: alias('model'),
  questions: computed('allQuestions.@each.enabled', function() {
    return this.get('model').filter((q) => q.get('enabled'));
  }),

  actions: {
    next() {
      const idx = +this.get('questionIdx');
      this.set('questionIdx', idx + 1);
    },

    previous() {
      const idx = +this.get('questionIdx');
      this.set('questionIdx', idx - 1);
    },

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
