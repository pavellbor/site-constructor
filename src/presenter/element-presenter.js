import { RenderPosition, TagName, UserAction } from "../const.js";
import { render, replace } from "../utils/render.js";
import ElementView from "../view/element-view.js";

export default class ElementPresenter {
  #elementContainer = null;
  #elementComponent = null;
  #changeData = null;
  #element = null;


  constructor(elementContainer, changeData) {
    this.#elementContainer = elementContainer;
    this.#changeData = changeData;
  }

  init = (element) => {
    const prevElementComponent = this.#elementComponent;
    this.#element = element;
    this.#elementComponent = new ElementView(element);

    this.#setEventHandlers();

    if (prevElementComponent !== null) {
      replace(prevElementComponent, this.#elementComponent);
      return;
    }

    this.#render();
  };

  #render = () => {
    render(this.#elementContainer, this.#elementComponent, RenderPosition.BEFOREEND);
  };

  #setEventHandlers = () => {
    if (this.#element.element === TagName.IMG) {
      this.#elementComponent.setAddImageClickHandler(this.#handleAddImageClick);
      this.#elementComponent.setImageUploadClickHandler(this.#handleImageUploadClick);
    } else {
      this.#elementComponent.setChangeTextElementHandler(this.#handleChangeTextElement);
    }

    this.#elementComponent.setDeleteElementClickHandler(this.#handleDeleteElementClick);
  };

  #handleDeleteElementClick = () => {
    this.#changeData(UserAction.DELETE_ELEMENT, { id: this.#element.id });
  };

  #handleChangeTextElement = (content) => {
    this.#changeData(UserAction.UPDATE_ELEMENT, { id: this.#element.id, content });
  };

  #handleAddImageClick = () => {
    this.#elementComponent.showImageUploadPopup();
    document.addEventListener('click', this.#onImageUploadPopupOutsideClick);
  };

  #handleImageUploadClick = (content) => {
    this.#changeData(UserAction.UPDATE_ELEMENT, { id: this.#element.id, content });
  };

  #onImageUploadPopupOutsideClick = (evt) => {
    if (this.#elementComponent.element.contains(evt.target)) {
      return;
    }

    this.#elementComponent.hideImageUploadPopup();
    document.removeEventListener('click', this.#onImageUploadPopupOutsideClick);
  };
}
