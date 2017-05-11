var noop = () => {}

global.Canvas = require('canvas');

Canvas.prototype.setAttribute = noop;
Canvas.prototype.style = {};

global.Image = Canvas.Image;
global.screen = {
  width: 1280,
  height: 800
};

global.window = global;

global.addEventListener = noop;
global.location = {};
global.getComputedStyle = noop;
