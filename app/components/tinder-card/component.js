import Component from '@ember/component';
import { later } from '@ember/runloop';

const mathematicalMikesMagicMalgorithm = (x) => (15/230) * x + 0.4347826087;

export default Component.extend({
  classNames: ["tinder-card", "overflow-hidden"],

  setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  },

  didInsertElement() {
    this.element.addEventListener('touchstart', (event) => {
      const touch = event.touches[0];

      this.set('initialX', touch.clientX);
      this.set('initialY', touch.clientY);
    });

    this.element.addEventListener('touchend', (event) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const windowCenterX = window.innerWidth / 2;
      const rectCenterX = rect.x + (rect.width / 2);

      if (Math.abs(rectCenterX - windowCenterX) > 100) {
        event.currentTarget.classList.add('is-disappearing');

        // wait for animation to complete
        later(this, () => { this.cardDidDisappear(this) }, 200);

        return null;
      }

      else {
        // animate back to center
        event.currentTarget.style.left = "0px";
      }

      this.setTranslate(0, 0, this.element);
    });

    this.element.addEventListener('touchmove', (event) => {
      event.preventDefault();

      const touch = event.touches[0];
      const [updatedX, updatedY] = [
        touch.clientX - this.get('initialX'),
        touch.clientY - this.get('initialY')
      ];

      this.setTranslate(updatedX, updatedY, this.element);

      const thisRect = event.currentTarget.getBoundingClientRect();
      const windowCenterX = window.innerWidth / 2;
      const rectCenterX = thisRect.x + (thisRect.width / 2);
      const diff = rectCenterX - windowCenterX;
      const angle = mathematicalMikesMagicMalgorithm(diff);

      this.element.style.transform += `rotate(${angle}deg)`;
    });
  },

  actions: {
    didLeftTap() {
      const fn = this.get('onLeftTap');
      fn && fn(this);
    },

    didRightTap() {
      const fn = this.get('onLeftTap');
      fn && fn(this);
    }
  }
});
