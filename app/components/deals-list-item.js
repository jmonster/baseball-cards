import Component from '@ember/component';

export default Component.extend({
  classNames: ["flex flex-column flex-auto b--light-silver bg-white pv2 ph4 bb hover-bg-near-white"],

  actions: {
    tap(url) {
      window.open(url);
    }
  }
});
