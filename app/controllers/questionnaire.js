import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Controller.extend({
  queryParams: ['questionIdx'],
  questionIdx: 0,

  question: computed('questionIdx', function() {
    const idx = this.questionIdx;
    return this.questions.objectAt(idx);
  }),

  allQuestions: alias('model'),
  questions: computed('allQuestions.@each.enabled', function() {
    return this.model.filter((q) => q.get('enabled'));
  }),

  answers: computed('questions.@each.answer', function() {
    return this.questions.map((q) => {
      if (typeof q.answer === "string") {
        return { question: q, value: q.answer };
      }

      else if (q.answer instanceof Array) {
        return { question: q, value: q.answer.map((a) => a.value).join(', ') };
      }

      else {
        return { question: q, value: q.answer && q.answer.value };
      }
    });
  }),

  actions: {
    next() {
      const questionCount = this.get('questions.length');
      const idx = +this.questionIdx;
      if (idx + 1 >= questionCount) {
        this.set('isDone', true);
        this.set('questionIdx', null);
      } else {
        this.set('questionIdx', idx + 1);
      }
    },

    previous() {
      const idx = +this.questionIdx;
      this.set('questionIdx', idx - 1);
    },

    didSelect(question, choice) {
      if (!choice) { return; }

      const allQuestions = this.allQuestions;
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
