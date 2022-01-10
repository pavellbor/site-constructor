export default class AbstractModel {
  #observers = new Set();

  constructor() {
    if (new.target === AbstractModel) {
      throw new Error('Can\'t instantiate AbstractModel');
    }
  }

  addObserver(observer) {
    this.#observers.add(observer);
  }

  removeObserver(observer) {
    this.#observers.delete(observer);
  }

  _notify(updateType, data) {
    this.#observers.forEach(observer => observer(updateType, data));
  }
}
