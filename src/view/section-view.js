import AbstractView from "./abstract-view.js";
import { TagName } from "../const.js";

const createSectionTemplate = (sectionType, sectionNumber, hasContent) => {
  const sectionNumberClassName = sectionNumber ? sectionType + '-' + sectionNumber : '';
  const sectionEmptyClassName = !hasContent ? sectionType + '--empty' : '';
  const sectionPlaceholder = !hasContent ? `<p class="placeholder">${sectionType[0].toUpperCase() + sectionType.slice(1)}</p>` : '';

  return `<div class="${sectionType} ${sectionNumberClassName} ${sectionEmptyClassName}">
      ${sectionPlaceholder}
      <button type="button" class="add-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 20C0 8.96 8.96 0 20 0C31.04 0 40 8.96 40 20C40 31.04 31.04 40 20 40C8.96 40 0 31.04 0 20ZM22 22H30V18H22V9.99999H18V18H10V22H18V30H22V22Z" fill="#80CCF0" />
        </svg>
      </button>

      <div class="choose-elem choose-elem--hide">
        <button type="button" class="choose-elem__btn" data-elem-type="${TagName.H1}">Заголовок H1</button>
        <button type="button" class="choose-elem__btn" data-elem-type="${TagName.H2}">Заголовок H2</button>
        <button type="button" class="choose-elem__btn" data-elem-type="${TagName.H3}">Заголовок H3</button>
        <button type="button" class="choose-elem__btn" data-elem-type="${TagName.P}">Абзац текста</button>
        <button type="button" class="choose-elem__btn" data-elem-type="${TagName.IMG}">Изображение</button>
      </div>

    </div>`;
};

export default class SectionView extends AbstractView {
  #sectionType = null;
  #sectionNumber = null;
  #hasContent = null;

  constructor(sectionType, sectionNumber, hasContent) {
    super();
    this.#sectionType = sectionType;
    this.#sectionNumber = sectionNumber;
    this.#hasContent = hasContent;
  }

  get template() {
    return createSectionTemplate(this.#sectionType, this.#sectionNumber, this.#hasContent);
  }

  toggleChooseElementPanel = () => {
    this.element.querySelector('.choose-elem').classList.toggle('choose-elem--hide');
  };

  setAddElementClickHandler = (callback) => {
    this._callback.addElementClick = callback;

    this.element.querySelector('.add-btn').addEventListener('click', this.#addElementClickHandler);
  };

  setChooseElementPanelClickHandler = (callback) => {
    this._callback.chooseElementPanelClick = callback;

    this.element.querySelector('.choose-elem').addEventListener('click', this.#chooseElementPanelClickHandler);
  };


  #addElementClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.addElementClick();
  };

  #chooseElementPanelClickHandler = (evt) => {
    evt.preventDefault();

    this._callback.chooseElementPanelClick(evt.target.dataset.elemType);
  };
}
