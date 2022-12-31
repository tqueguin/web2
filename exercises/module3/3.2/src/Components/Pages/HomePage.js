import { renderHeaderTitle } from '../../utils/render';

const EXPECTED_RECT_COUNT = 101;

/**
 * WARNING : THE STROBOSCOPIC EFFECT OF THIS DEMO COULD LEAD TO EPILEPSY !!!
 * PLEASE DON'T EXECUTE THIS DEMO IF YOUR ARE SUBJECT TO EPILEPSY !
 */

const HomePage = () => {
  const main = document.querySelector('main');
  const mainWidth = main.clientWidth;
  const mainHeight = main.clientHeight;
  let canvas;
  let canvasContext;
  let req;
  let isPlaying = true;
  let shapeSide = 20;
  let color = 'blue';

  renderHeaderTitle('Canvas Animation');
  renderCanvasWrapper();
  setCanvasContextAndSize();
  removePotentialVerticalAndHorizontalScrollbars();
  requestAnimationFrame(drawOneFrame);
  addLeftClickEventListener();
  addZoomEventListener();
  addRightClickEventListener();

  function addLeftClickEventListener() {
    main.addEventListener('click', () => {
      if (isPlaying) {
        cancelAnimationFrame(req);
        isPlaying = false;
      } else {
        requestAnimationFrame(drawOneFrame);
        isPlaying = true;
      }
    });
  }

  function addRightClickEventListener() {
    main.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      // const randomNumber = Math.floor(Math.random() * 256);
      color = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
    });
  }

  function addZoomEventListener() {
    document.addEventListener('keydown', (event) => {
      if (event.key === '+') {
        shapeSide *= 1.1;
      } else if (event.key === '-') {
        shapeSide *= 0.9;
      }
    });
  }

  function renderCanvasWrapper() {
    main.innerHTML = '<canvas />';
    canvas = document.querySelector('canvas');
  }

  function setCanvasContextAndSize() {
    canvasContext = canvas.getContext('2d');
    canvas.width = mainWidth;
    canvas.height = mainHeight;
  }

  /**
   * This function remove the vertical scrollbar that spuriously appears
   * even though the canvas is not meant to extend beyond the height
   * of the browser windows.
   */
  function removePotentialVerticalAndHorizontalScrollbars() {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';
  }

  function drawOneFrame() {
    clearFrame();

    drawRectanglesAtRandomLocations();
    // drawAlwaysFullRectanglesAtRandomLocations();

    req = requestAnimationFrame(drawOneFrame);

    // requestAnimationFrame(() => setTimeout(drawOneFrame, 1000));
  }

  function clearFrame() {
    canvasContext.clearRect(0, 0, mainWidth, mainHeight);
  }

  function drawRectanglesAtRandomLocations() {
    canvasContext.fillStyle = color;

    for (let i = 0; i < EXPECTED_RECT_COUNT; i += 1) {
      canvasContext.fillRect(
        Math.random() * mainWidth,
        Math.random() * mainHeight,
        shapeSide,
        shapeSide,
      );
    }
  }

  /* function drawAlwaysFullRectanglesAtRandomLocations() {
    canvasContext.fillStyle = DEFAULT_COLOR;

    for (let i = 0; i < EXPECTED_RECT_COUNT; i += 1) {
      const randomX = Math.random() * mainWidth;
      let expectedX = randomX;
      if (randomX < DEFAULT_SHAPE_SIDE) expectedX = 0;
      else if (randomX > mainWidth - DEFAULT_SHAPE_SIDE) expectedX = mainWidth - DEFAULT_SHAPE_SIDE;

      const randomY = Math.random() * mainHeight;
      let expectedY = randomY;
      if (randomY < DEFAULT_SHAPE_SIDE) expectedY = 0;
      else if (randomY > mainHeight - DEFAULT_SHAPE_SIDE) {
        expectedY = mainHeight - DEFAULT_SHAPE_SIDE;
      }

      canvasContext.fillRect(expectedX, expectedY, DEFAULT_SHAPE_SIDE, DEFAULT_SHAPE_SIDE);
    }
  } */
};

export default HomePage;
