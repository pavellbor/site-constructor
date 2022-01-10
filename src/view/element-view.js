import { TagName } from "../const.js";
import AbstractView from "./abstract-view.js";

const tagNameToPlaceholder = {
  [TagName.H1]: 'Заголовок 1',
  [TagName.H2]: 'Заголовок 2',
  [TagName.H3]: 'Заголовок 3',
  [TagName.P]: 'Абзац текста'
};

const getElementClassName = (element, content) => {
  let elementClassName = null;

  switch (element) {
    case TagName.IMG:
      elementClassName = content ? 'element--uploaded image' : `element--image image`;
      break;
    case TagName.P:
      elementClassName = 'text';
      break;
    default:
      elementClassName = 'title';
  }

  return elementClassName;
};

const createImageContentTemplate = (content) => {
  const imageTemplate = content ? `<img src="${content}">` : '';

  return `<button type="button" class="add-img-btn">
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6 2V8H0V12H6V18H10V12H16V8H10V2H6ZM12 14V20H6V40C6 42.2 7.8 44 10 44H42C44.2 44 46 42.2 46 40V16C46 13.8 44.2 12 42 12H35.66L32 8H18V14H12ZM26 38C31.52 38 36 33.52 36 28C36 22.48 31.52 18 26 18C20.48 18 16 22.48 16 28C16 33.52 20.48 38 26 38ZM26 34C22.68 34 20 31.32 20 28C20 24.68 22.68 22 26 22C29.32 22 32 24.68 32 28C32 31.32 29.32 34 26 34Z" />
      </svg>
    </button>
    <div class="img-upload">
      <p>Загрузите изображение</p>
      <input type="url" placeholder="Вставьте ссылку на изображение">
      <label class="img-upload__label">Загрузить
        <input class="visually-hidden" type="file" accept="image/png, image/jpeg">
      </label>
    </div>
    ${imageTemplate}`;
};

const createTextContentTemplate = (element, content) => {
  const elementContent = content || '';

  return `<${element} contenteditable="true" data-placeholder="${tagNameToPlaceholder[element]}">${elementContent}</${element}>`;
};

const createElementTemplate = (element) => {
  const { id, element: tagName, content } = element;
  const elementClassName = getElementClassName(tagName, content);
  const contentTemplate = (tagName === TagName.IMG) ? createImageContentTemplate(content) : createTextContentTemplate(tagName, content);

  return `<div class="element ${elementClassName}" tabindex="0" data-element-id=${id}>
      ${contentTemplate}
      <button type="button" class="delete-btn">
        <span class="visually-hidden">Удалить элемент</span>
      </button>
    </div>`;
};

export default class ElementView extends AbstractView {
  #element = null;

  constructor(element) {
    super();
    this.#element = element;
  }

  get template() {
    return createElementTemplate(this.#element);
  }

  setDeleteElementClickHandler = (callback) => {
    this._callback.deleteElementClick = callback;

    this.element.querySelector('.delete-btn').addEventListener('click', this.#deleteElementClickHandler);
  };

  setChangeTextElementHandler = (callback) => {
    this._callback.changeTextElement = callback;

    this.element.querySelector('[contenteditable=true]').addEventListener('keydown', this.#onTextElementEnterKeyDown);
    this.element.querySelector('[contenteditable=true]').addEventListener('blur', this.#onTextElementBlur);
  };

  setAddImageClickHandler = (callback) => {
    this._callback.addImageClick = callback;

    this.element.querySelector('.add-img-btn').addEventListener('click', this.#addImageClickHandler);
  };

  setImageUploadClickHandler = (callback) => {
    this._callback.imageUploadClick = callback;

    this.element.querySelector('.img-upload__label').addEventListener('click', this.#imageUploadClickHandler);
  };

  showImageUploadPopup = () => {
    this.element.classList.add('element--uploading');
  };

  hideImageUploadPopup = () => {
    this.element.classList.remove('element--uploading');
  };

  #deleteElementClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.deleteElementClick();
  };

  #onTextElementEnterKeyDown = (evt) => {
    if (evt.key !== 'Enter') {
      return;
    }

    this._callback.changeTextElement(evt.target.textContent);
  };

  #onTextElementBlur = (evt) => {
    this._callback.changeTextElement(evt.target.textContent);
  };

  #addImageClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.addImageClick();
  };

  #imageUploadClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.imageUploadClick(this.element.querySelector('[type=url]').value);
  };
}
