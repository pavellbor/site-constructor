import LayoutView from "../view/layout-view.js";
import { remove, render } from "../utils/render.js";
import { GridType, RenderPosition, SectionType, UpdateType, UserAction } from "../const.js";
import SectionPresenter from "./section-presenter.js";

const gridTypeToColumnMap = {
  [GridType.LANDING]: 1,
  [GridType.BLOG]: 2,
  [GridType.SHOP]: 3,
};

export default class LayoutPresenter {
  #layoutContainer = null;
  #gridModel = null;
  #elementsModel = null;
  #layoutComponent = null;
  #sectionPresenters = new Map();

  constructor(layoutContainer, gridModel, elementsModel) {
    this.#layoutContainer = layoutContainer;
    this.#gridModel = gridModel;
    this.#elementsModel = elementsModel;
  }

  get grid() {
    return this.#gridModel.grid;
  }

  get sections() {
    const sections = [];

    sections.push(SectionType.HEADER);

    for (let i = 0; i < gridTypeToColumnMap[this.grid]; i++) {
      sections.push(SectionType.CONTENT);
    }

    sections.push(SectionType.FOOTER);
    return sections;
  }

  get elements() {
    return [...this.#elementsModel.elements];
  }

  init = () => {
    const prevLayoutComponent = this.#layoutComponent;
    this.#layoutComponent = new LayoutView(this.grid);

    if (prevLayoutComponent !== null) {
      remove(prevLayoutComponent);
    }

    this.#render();
    this.#gridModel.addObserver(this.#handleModelEvent);
    this.#elementsModel.addObserver(this.#handleModelEvent);
  };

  #render = () => {
    this.#renderSections();
    this.#renderLayout();
  };

  #renderLayout = () => {
    render(this.#layoutContainer, this.#layoutComponent, RenderPosition.BEFOREEND);
  };

  #renderSections = () => {
    this.sections.forEach(this.#renderSection);
  };

  #renderSection = (type, index) => {
    const number = type === SectionType.CONTENT ? index : null;
    const sectionPresenter = new SectionPresenter(this.#layoutComponent, { id: index, type, number }, this.#handleViewAction);
    const sectionElements = this.elements.filter(element => element.sectionId === index);

    sectionPresenter.init(sectionElements);
    this.#sectionPresenters.set(index, sectionPresenter);
  };

  #handleModelEvent = (updateType, data) => {
    if (updateType === UpdateType.PATCH) {
      this.#sectionPresenters.get(data.sectionId).updateElement(data);
      return;
    }

    if (updateType === UpdateType.MAJOR) {
      this.#elementsModel.elements = [];
    }

    this.init();
  };

  #handleViewAction = (userAction, data) => {
    switch (userAction) {
      case UserAction.ADD_ELEMENT:
        this.#elementsModel.addElement(UpdateType.MINOR, data);
        break;
      case UserAction.DELETE_ELEMENT:
        this.#elementsModel.deleteElement(UpdateType.MINOR, data);
        break;
      case UserAction.UPDATE_ELEMENT:
        this.#elementsModel.updateElement(UpdateType.PATCH, data);
        break;
    }
  };
}
