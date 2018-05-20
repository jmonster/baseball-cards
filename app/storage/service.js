import { inject } from '@ember/service';
import Service from '@ember/service';
const STORAGE_PATH_PREFIX = "uploads/"

export default Service.extend({
  firebaseApp: inject(),
  session: inject(),

  upload(name, blobOrFile/*, path*/) {
    const firebase = this.get('firebaseApp');
    const storageRef = firebase.storage().ref(`${STORAGE_PATH_PREFIX}${name}`);
    return storageRef.put(blobOrFile);
  }
});
