/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
var { Component, RectPath, Shape } = scene

/*
 * Anchor
 *
 * Anchor should have id property.
 */
export default class Anchor extends RectPath(Shape) {

  _pre_draw(context) {
    var center = this.center;

    context.beginPath();
    var length = this.trace.length
    this.trace.forEach(function(location, i) {
      if(i == 0)
        context.moveTo(location.x, location.y);
      else if(i < length - 1)
        context.lineTo(location.x, location.y);
    })

    context.lineTo(center.x + this.delta('tx'), center.y + this.delta('ty'));

    context.strokeStyle = this.get('strokeStyle');
    context.stroke();

    super._pre_draw(context);
  }

  _draw(context) {
    var {
      top,
      left,
      width,
      strokeStyle
    } = this.model;

    var center = this.center;

    // 이동 및 각도 변경시에 animation 효과 필요함.

    context.beginPath();
    context.moveTo(left, top);
    context.lineTo(left + width, top);

    context.lineWidth = 4;
    context.strokeStyle = 'black';
    context.stroke();

    context.beginPath();

    context.moveTo(center.x, center.y);
    context.lineTo(left, top);
    context.lineTo(left + width, top);
    context.lineTo(center.x, center.y);
  }

  is3dish() {
    return false
  }

  get hasTextProperty() {
    return false
  }

  get trace() {
    if(!this._trace)
      this._trace = []
    return this._trace
  }

  onchange(after, before) {
    var bLeft = after.hasOwnProperty('left');
    var bTop = after.hasOwnProperty('top');
    var bRotation = after.hasOwnProperty('rotation');

    if(bLeft || bTop || bRotation) {
      var self = this;

      if(bLeft)
        this.dx = after.left - before.left;
      if(bTop)
        this.dy = after.top - before.top;

      if(bLeft || bTop)
        this.trace.push(this.center)

      if(bRotation) {
        var to = (after.rotation) % (Math.PI * 2);
        if(to < -Math.PI)
          to += Math.PI * 2;
        if(to > Math.PI)
          to -= Math.PI * 2;

        var from = (before.rotation || 0) % (Math.PI * 2);
        if(from < -Math.PI)
          from += Math.PI * 2;
        if(from > Math.PI)
          from -= Math.PI * 2;

        this.dtheta = to - from;
        if(this.dtheta > Math.PI)
          this.dtheta -= Math.PI * 2
        else if(this.dtheta < -Math.PI)
          this.dtheta += Math.PI * 2
      }

      this.dx && this.delta('tx', - this.dx);
      this.dy && this.delta('ty', - this.dy);
      this.dtheta && this.delta('theta', - this.dtheta);

      this.animate({
        step: function(delta) {

          self.dx && self.delta('tx', - self.dx * (1 - delta));
          self.dy && self.delta('ty', - self.dy * (1 - delta));
          self.dtheta && self.delta('theta', - self.dtheta * (1 - delta));

          self.invalidate();

          if(delta >= 1) {
            delete self.dx
            delete self.dy
            delete self.dtheta
          }
        },
        delta: 'linear'
      }).start()
    }
  }
}

Component.register('anchor', Anchor);
