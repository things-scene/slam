import locales from './locales'

var templates = [{
  name: 'landmark',
  /* 다국어 키 표현을 어떻게.. */
  description: '...',
  /* 다국어 키 표현을 어떻게.. */
  group: 'IoT',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon: '../',
  /* 또는, Object */
  template: {
    type: 'landmark',
    model: {
      type: 'landmark',
      cx: 200,
      cy: 200,
      rx: 50,
      ry: 50,
      fillStyle: '#eeeeee',
      fontSize: 30
    }
  }
}, {
  name: 'moving object',
  /* 다국어 키 표현을 어떻게.. */
  description: '...',
  /* 다국어 키 표현을 어떻게.. */
  group: 'IoT',
  /* line|shape|textAndMedia|chartAndGauge|table|container|dataSource|IoT|3D|warehouse|form|etc */
  icon: '../',
  /* 또는, Object */
  template: {
    type: 'moving object',
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
  }
}];

module.exports = {
  templates,
  locales
};
