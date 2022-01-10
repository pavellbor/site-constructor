import GridSelectView from "../view/grid-select-view.js";
import { GridType, RenderPosition, UpdateType } from "../const.js";
import { remove, render } from "../utils/render.js";

export default class GridSelectPresenter {
  #gridSelectContainer = null;
  #gridModel = null;

  #gridSelectComponent = null;

  constructor(gridSelectContainer, gridModel) {
    this.#gridSelectContainer = gridSelectContainer;
    this.#gridModel = gridModel;
  }

  get grids() {
    return [
      {
        type: GridType.LANDING,
        name: 'Лендинг',
      },
      {
        type: GridType.BLOG,
        name: 'Блог',
      },
      {
        type: GridType.SHOP,
        name: 'Магазин',
      }
    ];
  }

  init() {
    const prevGridSelectComponent = this.#gridSelectComponent;
    this.#gridSelectComponent = new GridSelectView(this.grids, this.#gridModel.grid);

    if (prevGridSelectComponent !== null) {
      remove(prevGridSelectComponent);
    }

    this.#render();

    this.#gridSelectComponent.setGridTypeChangeHandler(this.#handleGridTypeChange);
    this.#gridModel.addObserver(this.#handleModelEvent);
  }

  #render = () => {
    render(this.#gridSelectContainer, this.#gridSelectComponent, RenderPosition.BEFOREEND);
  };

  #handleGridTypeChange = (gridType) => {
    this.#gridModel.setGrid(UpdateType.MAJOR, gridType);
  };

  #handleModelEvent = () => {
    this.init();
  };
}
