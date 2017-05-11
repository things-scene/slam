var { Component, RectPath, Shape } = scene

/*
 * Moving Object
 *
 * Moving Object should have id property.
 */
export default class Mo extends RectPath(Shape) {

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

      if(bRotation) {
        var to = (after.rotation) % (Math.PI * 2);
        if(to < 0)
          to += MATH.PI * 2;

        var from = (before.rotation || 0) % (Math.PI * 2);
        if(from < 0)
          from += MATH.PI * 2;

        this.dtheta = to - from;
      }

      this.animate({
        step: function(delta) {
          self.delta('tx', - self.dx * (1 - delta));
          self.delta('ty', - self.dy * (1 - delta));
          self.delta('theta', - self.dtheta * (1 - delta));

          self.invalidate();
        },
        delta: 'linear'
      }).start()
    }
  }
}

Component.register('mo', Mo);
