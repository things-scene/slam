import locales from './locales';

import landmark from './assets/no-image.png';
import mo from './assets/no-image.png';

var templates = [{
  type: 'landmark',
  description: 'landmark',
  group: 'IoT', /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon: landmark,
  model: {
    type: 'landmark',
    cx: 200,
    cy: 200,
    rx: 50,
    ry: 50,
    fillStyle: '#eeeeee',
    fontSize: 30
  }
}, {
  type: 'moving object',
  description: 'moving object',
  group: 'IoT', /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon: mo,
  model: {
    type: 'mo',
    top: 100,
    left: 100,
    width:10,
    height: 10,
    fillStyle: '#00ff00',
    strokeStyle: 'red',
    lineWidth: 1,
    lineCap: 'round',
    trace: true
  }
}];

module.exports = {
  templates,
  locales
};
