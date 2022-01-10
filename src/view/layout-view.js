import AbstractView from "./abstract-view.js";

export const createLayoutTemplate = (grid) => `<div class="layout layout--${grid}"></div>`;

export default class LayoutView extends AbstractView {
  #grid = null;

  constructor(grid) {
    super();
    this.#grid = grid;
  }

  get template() {
    return createLayoutTemplate(this.#grid);
  }
}