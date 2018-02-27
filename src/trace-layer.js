/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import { Component, Layer } from '@hatiolab/things-scene';

/*
 * TraceLayer Moving Object의 동선궤적을 유지한다.
 *
 */

export default class TraceLayer extends Layer {

  // _pre_draw(context) {
  //
  //   var {
  //     translate,
  //     scale = {
  //       x: 1,
  //       y: 1
  //     },
  //     rotation
  //   } = this.model;
  //
  //   translate && context.translate(translate.x * scene.DPPX, translate.y * scene.DPPX);
  //
  //   context.scale(scale.x * scene.DPPX, scale.y * scene.DPPX);
  //   rotation && context.rotate(rotation);
  // }
  //

  dispose() {
    super.dispose();

    delete this.histories;
  }

  _draw(context) {
    if(!this.histories)
      return;

    context.globalAlpha *= .5;
    context.lineWidth = 1;

    for(var id in this.histories) {

      var target = this.root.findById(id);
      if(!target)
        continue;

      context.beginPath();
      this.histories[id].forEach(function(location, i) {
        if(i == 0)
          context.moveTo(location.x, location.y);
        else
          context.lineTo(location.x, location.y);
      })

      context.strokeStyle = target.get('strokeStyle');
      context.stroke();
    }
  }

  _onchange(after, before, hint) {
    if(!after.hasOwnProperty('left') && !after.hasOwnProperty('top'))
      return;

    var id = hint.origin.get('id');
    if(id === undefined)
      return;

    if(!this.histories)
      this.histories = {};
    this.histories[id] = this.histories[id]
    var list = this.histories[id];
    if(!list)
      list = this.histories[id] = [];

    var location = hint.origin.center;
    list.push(location);

    this.invalidate()
  }

  get eventMap() {
    return {
      'model-layer': {
        'mo': {
          change: this._onchange
        }
      }
    }
  }
}

Component.register('trace-layer', TraceLayer);
