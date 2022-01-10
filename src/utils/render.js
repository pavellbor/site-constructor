import { RenderPosition } from "../const.js";
import AbstractView from "../view/abstract-view.js";

export const render = (container, element, position) => {
  let parentElement = (container instanceof AbstractView) ? container.element : container;
  let childElement = (element instanceof AbstractView) ? element.element : element;

  switch (position) {
    case RenderPosition.BEFOREBEGIN:
      parentElement.before(childElement);
      break;
    case RenderPosition.AFTERBEGIN:
      parentElement.prepend(childElement);
      break;
    case RenderPosition.BEFOREEND:
      parentElement.append(childElement);
      break;
    case RenderPosition.AFTEREND:
      parentElement.after(childElement);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');

  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const remove = (component) => {
  component.element.remove();
  component.removeElement();
};

export const replace = (oldComponent, newComponent) => {
  oldComponent.element.replaceWith(newComponent.element);
};
