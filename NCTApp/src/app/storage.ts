export class Storage {
  static STORAGE_API_BASE_URL = 'https://272.selfip.net/apps/Qudtdqi3HR/';
  static TEST_DOCUMENT = 'test/'
  static STORAGE_API_COLLECTION_URL = this.STORAGE_API_BASE_URL + 'collections/'

  static joinURL(base:string, attachment:string) {
    if (base.charAt(attachment.length - 1) !== '/') {
      base += '/';
    }
  
    if (attachment.charAt(attachment.length - 1) !== '/') {
      attachment += '/';
    }
  
    return `${base}${attachment}`;
  }

  static getDocumentURL(collection:string) {
    return `${this.STORAGE_API_COLLECTION_URL}${collection}documents/`
  }

  static getDocumentKeyURL(collection:string, key:string) {
    return this.getDocumentURL(collection) + key;
  }
}