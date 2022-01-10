import { getRandomId } from "../utils/common.js";
import AbstractModel from "./abstract-model.js";

export default class ElementsModel extends AbstractModel {
  #elements = [];

  get elements() {
    return this.#elements;
  }

  set elements(elements) {
    this.#elements = [...elements];
  }

  addElement(updateType, data) {
    const newElement = { id: getRandomId(), ...data };

    this.#elements.push(newElement);
    this._notify(updateType, newElement);
  }

  deleteElement(updateType, data) {
    const index = this.#elements.findIndex((element) => element.id === +data.id);
    this.#elements = [...this.#elements.slice(0, index), ...this.#elements.slice(index + 1)];

    this._notify(updateType, data);
  }

  updateElement(updateType, data) {
    const element = this.#elements.find((element) => element.id === +data.id);
    element.content = data.content;

    this._notify(updateType, element);
  }
}
