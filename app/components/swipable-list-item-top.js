import Component from '@ember/component';

// determine if the user is swiping
function detectLeftSwipe(event) {
  const lastTouchX = this.get('lastTouchX');
  const lastTouchY = this.get('lastTouchY');

  // grab current touch
  const touch = event.touches[0];
  const currentTouchX = touch.clientX;
  const currentTouchY = touch.clientY;

  // test if we've moved more in the X or in the Y
  const deltaX = currentTouchX - lastTouchX;
  const deltaY = currentTouchY - lastTouchY;
  const boundDetectLeftSwipe = this.get('boundDetectLeftSwipe');

  // when the user is scrolling
  if (Math.abs(deltaY) + 5 > Math.abs(deltaX)) {
    // remove self and let the browser take over
    this.element.removeEventListener('touchmove', boundDetectLeftSwipe);
    return true;
  }

  // when the user is swiping
  if (deltaX < 0) {
    // we've now determined the user is swiping
    // ..so stop detecting and start handling
    this.element.removeEventListener('touchmove', boundDetectLeftSwipe);
    this.set('boundDetectLeftSwipe', null);

    // begin tracking the swipe event
    const boundOnLeftSwipe = onLeftSwipe.bind(this);
    this.set('boundOnLeftSwipe', boundOnLeftSwipe);
    this.element.addEventListener('touchmove', boundOnLeftSwipe);

    // prevent the browser from doing it's thing (i.e. scrolling)
    event.preventDefault();
    return false;
  }

  // neither? keep detecting...
}

// when the user is swiping
function onLeftSwipe(event) {
  const touch = event.touches[0];
  const initialTouchX = this.get('initialTouchX');
  const initialRectX = this.get('initialRectX');
  const currentTouchX = touch.clientX;
  const deltaX = currentTouchX - initialTouchX;
  const updatedX = deltaX + initialRectX;
  const updatedY = 0;

  // prevent swiping right
  this.set('lastTouchX', touch.clientX);
  this.set('isSliding', true);
  this.set('hasSlidLeft', false);

  if (initialTouchX > currentTouchX) {
    this.setTranslate(updatedX, updatedY, this.element);
  }

  document.ontouchmove = function (e) {
    e.preventDefault();
    return false;
  }

  event.preventDefault();
  event.stopPropagation();
  event.stopImmediatePropagation();

  return false;
}

function onTouchstart(event) {
  const hasSlidLeft = this.get('hasSlidLeft');

  // restore to normal position when tapping on
  // an already slid element
  if (hasSlidLeft) {
    event.preventDefault();
    this.set('hasSlidLeft', false);
    return false;
  }

  const touch = event.touches[0];
  const rect = event.currentTarget.getBoundingClientRect();

  this.set('initialRectX', rect.x);
  this.set('initialTouchX', touch.clientX);
  this.set('lastTouchX', touch.clientX);
  this.set('initialTouchY', touch.clientY);
  this.set('lastTouchY', touch.clientY);

  // store bound versions of these handler
  // such that they can be removed later
  // (because each time you call .bind you create a new instance)
  const boundDetectLeftSwipe = detectLeftSwipe.bind(this);
  const boundTouchend = onTouchend.bind(this);

  this.set('boundDetectLeftSwipe', boundDetectLeftSwipe);
  this.set('boundTouchend', boundTouchend);

  this.element.addEventListener('touchmove', boundDetectLeftSwipe);
  this.element.addEventListener('touchend', boundTouchend);
}

function onTouchend(event) {
  const boundDetectLeftSwipe = this.get('boundDetectLeftSwipe');
  const boundOnLeftSwipe = this.get('boundOnLeftSwipe');
  const boundTouchend = this.get('boundTouchend');

  this.element.removeEventListener('touchmove', boundDetectLeftSwipe);
  this.element.removeEventListener('touchmove', boundOnLeftSwipe);
  this.element.removeEventListener('touchend', boundTouchend);

  document.ontouchmove = function() { return true; };

  this.set('boundDetectLeftSwipe', null);
  this.set('boundOnLeftSwipe', null);
  this.set('boundTouchend', null);

  this.set('isSliding', false);

  const lastTouchX = this.get('lastTouchX');
  const initialTouchX = this.get('initialTouchX');
  const deltaX = initialTouchX - lastTouchX;
  const didMoveEnough = deltaX > (window.innerWidth/5);

  // if moved more than 1/3 of the screen width
  this.set('hasSlidLeft', didMoveEnough);

  // remove our as-you-swipe property
  event.currentTarget.style.transform = null;
}

export default Component.extend({
  classNames: ['swipable-list-item-top', 'bg-white', 'items-center'],
  classNameBindings: ['hasSlidLeft', 'isSliding:swipable-list-item-is-sliding:swipable-list-item-animated'],

  hasSlidLeft: false,
  isSliding: false,

  setTranslate(xPos, yPos, el) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  },

  didInsertElement() {
    const boundTouchstart = onTouchstart.bind(this);
    this.set('boundTouchstart', boundTouchstart);
    this.element.addEventListener('touchstart', boundTouchstart);
  },

  willDestroyElement() {
    const boundTouchstart = this.get('boundTouchstart');
    this.element.removeEventListener('touchstart', boundTouchstart);
    this._super(...arguments);
  },
});
