import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForQueryRecord({ slug }, modelName) {
    let baseUrl = this.buildURL();
    return `${baseUrl}/current_user`;
  }
});
