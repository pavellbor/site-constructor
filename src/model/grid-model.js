import AbstractModel from "./abstract-model.js";

export default class GridModel extends AbstractModel {
  #grid = null;

  get grid() {
    return this.#grid;
  }

  setGrid(updateType, gridType) {
    this.#grid = gridType;

    this._notify(updateType, gridType);
  }
}
