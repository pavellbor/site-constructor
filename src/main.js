import LayoutPresenter from "./presenter/layout-presenter.js";
import GridSelectPresenter from "./presenter/grid-select-presenter.js";
import GridModel from "./model/grid-model.js";
import ElementsModel from "./model/elements-model.js";
import { GridType, UpdateType } from "./const.js";

const gridModel = new GridModel();
gridModel.setGrid(UpdateType.MINOR, GridType.LANDING);

const elementsModel = new ElementsModel();

const containerElement = document.querySelector('.container');
const gridSelectPresenter = new GridSelectPresenter(containerElement, gridModel, elementsModel);
const layoutPresenter = new LayoutPresenter(containerElement, gridModel, elementsModel);

gridSelectPresenter.init();
layoutPresenter.init();
