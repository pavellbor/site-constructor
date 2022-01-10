import { GridType } from "../const.js";
import AbstractView from "./abstract-view.js";

const gridToIconMap = {
  [GridType.LANDING]: `<svg class="grid-select__img" width="240" height="132" viewBox="0 0 240 132" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.3" y="0.3" width="239.4" height="15.4" stroke-width="0.6" stroke-dasharray="5 5"/>
      <rect x="0.3" y="116.3" width="239.4" height="15.4" stroke-width="0.6" stroke-dasharray="5 5"/>
      <rect x="0.3" y="26.3" width="239.4" height="79.4" stroke-width="0.6" stroke-dasharray="5 5"/>
    </svg>`,
  [GridType.BLOG]: `<svg class="grid-select__img" width="240" height="132" viewBox="0 0 240 132" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.3" y="0.3" width="239.4" height="15.4" stroke-width="0.6" stroke-dasharray="5 5"/>
      <rect x="0.3" y="116.3" width="239.4" height="15.4" stroke-width="0.6" stroke-dasharray="5 5"/>
      <rect x="0.3" y="26.394" width="89.4" height="79.4" stroke-width="0.6" stroke-dasharray="5 5"/>
      <rect x="100.3" y="26.3" width="139.4" height="79.4" stroke-width="0.6" stroke-dasharray="5 5"/>
    </svg>`,
  [GridType.SHOP]: `<svg class="grid-select__img" width="240" height="132" viewBox="0 0 240 132" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.3" y="0.3" width="239.4" height="15.4" stroke-width="0.6" stroke-dasharray="5 5"/>
      <rect x="0.3" y="116.3" width="239.4" height="15.4" stroke-width="0.6" stroke-dasharray="5 5"/>
      <rect x="0.3" y="26.3" width="73.4" height="79.4" stroke-width="0.6" stroke-dasharray="5 5"/>
      <rect x="83.3" y="26.3" width="73.4" height="79.4" stroke-width="0.6" stroke-dasharray="5 5"/>
      <rect x="166.3" y="26.3" width="73.4" height="79.4" stroke-width="0.6" stroke-dasharray="5 5"/>
    </svg>`,
};

const createGridSelectItemTemplate = (gridType, gridName, isChecked) => (`
  <input class="grid-select__radio visually-hidden" type="radio" name="grid" id="grid-${gridType}" ${isChecked ? 'checked' : ''} data-grid-type="${gridType}">
  <label for="grid-${gridType}" class="grid-select__btn">
    <span class="grid-select__text">${gridName}</span>
    ${gridToIconMap[gridType]}
  </label>
`);

const createGridSelectTemplate = (grids, currentGridType) => (`
  <form class="grid-select">
    <h2 class="grid-select__header">Выберите сетку сайта</h2>
    ${grids.map((grid) => createGridSelectItemTemplate(grid.type, grid.name, grid.type === currentGridType)).join('\n')}
  </form>
`);

export default class GridSelectView extends AbstractView {
  #grids = null;
  #currentGrid = null;

  constructor(grids, currentGridType) {
    super();
    this.#grids = grids;
    this.#currentGrid = currentGridType;
  }

  get template() {
    return createGridSelectTemplate(this.#grids, this.#currentGrid);
  }

  setGridTypeChangeHandler = (callback) => {
    this._callback.gridTypeChange = callback;

    this.element.addEventListener('change', this.#gridTypeChangeHandler);
  };

  #gridTypeChangeHandler = (evt) => {
    const gridType = evt.target.dataset.gridType;

    this._callback.gridTypeChange(gridType);
  };
}
