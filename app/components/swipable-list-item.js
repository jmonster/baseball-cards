import Component from '@ember/component';
import { later } from '@ember/runloop';

const mathematicalMikesMagicMalgorithm = (x) => (15/230) * x + 0.4347826087;

export default Component.extend({
  classNames: ['swipable-list-item', 'flex', 'flex-auto', 'bg-gray', 'bt bb mv1'],
  classNameBindings: ['isSlidLeft', 'isSliding::swipable-list-item-animated'],

  isSlidLeft: false,
  isSliding: false,

  setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  },

  didInsertElement() {
    this.element.addEventListener('touchstart', (event) => {
      const touch = event.touches[0];
      const rect = event.currentTarget.getBoundingClientRect();

      this.set('initialRectX', rect.x);
      this.set('initialTouchX', touch.clientX);
    });

    this.element.addEventListener('touchend', (event) => {
      // const touch = event.touches[0s];
      // const rect = event.currentTarget.getBoundingClientRect();
      // const windowCenterX = window.innerWidth / 2;
      // const rectCenterX = rect.x + (rect.width / 2);
      this.set('isSliding', false);

      // no right swipe
      if (this.get('isSlidLeft')) {
        this.set('isSlidLeft', false);
        return;
      }

      const lastTouchX = this.get('lastTouchX');
      const initialTouchX = this.get('initialTouchX');
      const deltaX = initialTouchX - lastTouchX;
      const didMoveEnough = deltaX > (window.innerWidth/3);

      // if moved more than 1/3 of the screen width
      this.set('isSlidLeft', didMoveEnough);
      event.currentTarget.style.transform = null;
    });

    this.element.addEventListener('touchmove', (event) => {
      event.preventDefault();

      const touch = event.touches[0];
      const initialTouchX = this.get('initialTouchX');
      const initialRectX = this.get('initialRectX');
      const currentTouchX = touch.clientX;
      const deltaX = currentTouchX - initialTouchX;
      const [updatedX, updatedY] = [deltaX + initialRectX, 0];

      this.set('isSliding', true);
      this.setTranslate(updatedX, updatedY, this.element);
      this.set('isSlidLeft', false);
      this.set('lastTouchX', touch.clientX);
    });
  }
});
