import { Coordinates } from '../pdf-viewer/pdf-viewer.component';

export const getPosition = (element: HTMLElement): Coordinates => {
  let positionX = 0;
  let positionY = 0;

  while (element) {
    positionX += element.offsetLeft;
    positionY += element.offsetTop;
    element = element?.offsetParent as HTMLElement;
  }

  return {
    positionX,
    positionY,
  };
};
