import Component from '@ember/component';
import { later } from '@ember/runloop';

const mathematicalMikesMagicMalgorithm = (x) => (15/230) * x + 0.4347826087;

export default Component.extend({
  classNames: ['tinder-card', 'flex', 'flex-auto'],

  setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  },

  didInsertElement() {
    this.set('didTouchMove', (event) => {
      this.element.removeEventListener('touchmove', this.didTouchMove);

      const touch = event.touches[0];
      const updatedY = touch.clientY - this.initialY;
      const updatedX = touch.clientX - this.initialX;

      // card dragging rather than scrolling
      if (Math.abs(updatedY) < 7 && Math.abs(updatedX) > 3) {
        if (event.cancelable) {
          event.preventDefault();
          event.stopPropagation();
       }

        // this.element.removeEventListener('touchmove', this.didTouchMove);
        this.element.addEventListener('touchmove', this.didTouchMoveLOL, { passive: false });

        return false;
      } else {
        return true;
      }
    });

    this.set('didTouchMoveLOL', (event) => {
      if (event.cancelable) {
        event.preventDefault();
        event.stopPropagation();
      }

      this.set('isMovingAround', true);

      const touch = event.touches[0];
      const [updatedX, updatedY] = [
        touch.clientX - this.initialX,
        touch.clientY - this.initialY
      ];

      this.setTranslate(updatedX, updatedY, this.element);

      const thisRect = event.currentTarget.getBoundingClientRect();
      const windowCenterX = window.innerWidth / 2;
      const rectCenterX = thisRect.x + (thisRect.width / 2);
      const diff = rectCenterX - windowCenterX;
      const angle = mathematicalMikesMagicMalgorithm(diff);

      this.element.style.transform += `rotate(${angle}deg)`;

      return false;
    });

    this.set('didTouchEnd', (event) => {
      this.element.removeEventListener('touchend', this.didTouchEnd);
      this.element.removeEventListener('touchmove', this.didTouchMoveLOL);

      const rect = event.currentTarget.getBoundingClientRect();
      const windowCenterX = window.innerWidth / 2;
      const rectCenterX = rect.x + (rect.width / 2);

      const deltaMove = rectCenterX - windowCenterX;
      if (Math.abs(deltaMove) > 100) {
        event.currentTarget.classList.add('is-disappearing');

        // wait for animation to complete
        later(this, () => { this.cardDidDisappear(deltaMove, this.cardDidDisappear); }, 200);

        return null;
      }

      else {
        // animate back to center
        event.currentTarget.style.left = '0px';
      }

      // this.setTranslate(0, 0, this.element);
      // wait out the scroll
      if (this.isMovingAround) {
        this.setTranslate(0, 0, this.element);
        this.set('isMovingAround', false);
      }
    });

    this.element.addEventListener('touchstart', (event) => {
      const touch = event.touches[0];

      this.set('initialX', touch.clientX);
      this.set('initialY', touch.clientY);

      this.element.addEventListener('touchend', this.didTouchEnd, { passive: true });
      this.element.addEventListener('touchmove', this.didTouchMove, { passive: true });

      return true;
    }, { passive: true });
  }
});
