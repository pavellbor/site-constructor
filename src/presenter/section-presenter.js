import { RenderPosition, UserAction } from "../const.js";
import { render } from "../utils/render.js";
import SectionView from "../view/section-view.js";
import ElementPresenter from "./element-presenter.js";

export default class SectionPresenter {
  #sectionContainer = null;
  #sectionComponent = null;
  #section = null;
  #changeData = null;
  #elements = null;
  #elementsPresenters = new Map();


  constructor(sectionContainer, section, changeData) {
    this.#sectionContainer = sectionContainer;
    this.#section = section;
    this.#changeData = changeData;
  }

  init = (elements) => {
    const { type, number } = this.#section;
    this.#elements = elements;
    this.#sectionComponent = new SectionView(type, number, !!elements.length);

    this.#render();
    this.#setEventHandlers();
  };

  updateElement = (element) => {
    this.#elementsPresenters.get(element.id).init(element);
  };

  #render = () => {
    this.#renderElements();
    this.#renderSection();
  };

  #renderElements = () => {
    this.#elements.forEach(this.#renderElement);
  };

  #renderElement = (element) => {
    const elementPresenter = new ElementPresenter(this.#sectionComponent, this.#changeData);

    this.#elementsPresenters.set(element.id, elementPresenter);
    elementPresenter.init(element);
  };

  #renderSection = () => {
    render(this.#sectionContainer, this.#sectionComponent, RenderPosition.BEFOREEND);
  };

  #setEventHandlers = () => {
    this.#sectionComponent.setAddElementClickHandler(this.#handleAddElementClick);
    this.#sectionComponent.setChooseElementPanelClickHandler(this.#handleChooseElementPanelClick);
  };

  #handleAddElementClick = () => {
    this.#sectionComponent.toggleChooseElementPanel();
  };

  #handleChooseElementPanelClick = (element) => {
    this.#changeData(UserAction.ADD_ELEMENT, { sectionId: this.#section.id, element, content: null });
  };
}
