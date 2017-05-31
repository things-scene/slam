var { Component, Ellipse, DEFAULT } = scene

const NORTH = 0
const EAST = 1
const SOUTH = 2
const WEST = 3

const QUARTER_PI = Math.PI / 4

function direction(center, position) {
  var rad = Math.atan2(center.y - position.y, position.x - center.x)

  if(-QUARTER_PI < rad && QUARTER_PI >= rad)
    return EAST
  if(QUARTER_PI < rad && QUARTER_PI * 3 >= rad)
    return NORTH
  if(QUARTER_PI * 3 < rad || -QUARTER_PI * 3 >= rad)
    return WEST
  return SOUTH
}

/*
 * Landmark
 *
 * Landmark should have id property.
 */
export default class Landmark extends Ellipse {

  _draw_count(context, x, y, total, count, fontFamily, fontSize) {
    fontSize = fontSize / 2 + (fontSize / 2) * count / (total || 1)

    context.font = Component.font({fontFamily, fontSize})
    context.fillText(String(count), x, y + fontSize / 2);
  }

  _draw_inout(context) {
    var {
      fontFamily = DEFAULT.FONT_FAMILY,
      fontSize = 20
    } = this.model

    var bounds = this.bounds

    var total = this.outs.reduce((sum, count) => {
      return sum + count
    }, 0)
    context.fillStyle = 'navy';

    this._draw_count(context, bounds.left + bounds.width / 2, bounds.top - 20, total, this.outs[0], fontFamily, fontSize);
    this._draw_count(context, bounds.left + bounds.width + 10, bounds.top + bounds.height / 2, total, this.outs[1], fontFamily, fontSize);
    this._draw_count(context, bounds.left + bounds.width / 2, bounds.top + bounds.height + 20, total, this.outs[2], fontFamily, fontSize);
    this._draw_count(context, bounds.left - 30, bounds.top + bounds.height / 2, total, this.outs[3], fontFamily, fontSize);

    total = this.ins.reduce((sum, count) => {
      return sum + count
    }, 0)
    context.fillStyle = 'red';

    this._draw_count(context, bounds.left + bounds.width / 2, bounds.top + 20, total, this.ins[0], fontFamily, fontSize);
    this._draw_count(context, bounds.left + bounds.width - 30, bounds.top + bounds.height / 2, total, this.ins[1], fontFamily, fontSize);
    this._draw_count(context, bounds.left + bounds.width / 2, bounds.top + bounds.height - 20, total, this.ins[2], fontFamily, fontSize);
    this._draw_count(context, bounds.left + 10, bounds.top + bounds.height / 2, total, this.ins[3], fontFamily, fontSize);
  }

  _post_draw(context) {
    super._post_draw(context)
    this._draw_arrows(context)
    this._draw_inout(context)
  }

  is3dish() {
    return false
  }

  get count() {
    return this.molist.length
  }

  get text() {
    return String(this.molist.length)
  }

  get outs() {
    if(!this._outs)
      this._outs = [0,0,0,0]

    return this._outs
  }

  get ins() {
    if(!this._ins)
      this._ins = [0,0,0,0]

    return this._ins
  }

  get molist() {
    if(!this._molist)
      this._molist = []
    return this._molist
  }

  _in(mo) {
    if(this.molist.indexOf(mo) == -1) {
      this.molist.push(mo)
      this.ins[direction(this.center, mo.center)]++
    }
  }

  _out(mo) {
    var idx = this.molist.indexOf(mo)
    if(idx !== -1) {
      this.molist.splice(idx, 1)
      this.outs[direction(this.center, mo.center)]++
    }
  }

  _draw_arrows(context) {

    // draw arrows
    for (var i = 0; i < 4; i++) {
      var amplifier = this._caculateArrowSizeAmplifier(i)
      this._draw_arrow(context, amplifier, i)
    }

  }

  _draw_arrow(context, amplifier, direction) {

    var angleInRad = Math.PI / 2 * direction

    var center = this.center

    var {
      left,
      top,
      width,
      height
    } = this.bounds

    var arrowWidth = width * 0.5
    var arrowHeight = height * 0.25 * amplifier

    context.translate(center.x, center.y)
    context.rotate(angleInRad)
    context.beginPath();
    context.fillStyle = 'green'
    context.moveTo(0, -0.5 * height - arrowHeight)
    context.lineTo(0.5 * arrowWidth, - 0.5 * height - 0.5 * arrowHeight)
    context.lineTo(0.25 * arrowWidth, - 0.5 * height - 0.5 * arrowHeight)
    context.lineTo(0.25 * arrowWidth, - 0.5 * height)
    context.lineTo(- 0.25 * arrowWidth, - 0.5 * height)
    context.lineTo(- 0.25 * arrowWidth, - 0.5 * height - 0.5 * arrowHeight)
    context.lineTo(- 0.5 * arrowWidth, - 0.5 * height - 0.5 * arrowHeight)
    context.lineTo(0, -0.5 * height - arrowHeight)
    context.moveTo(center.x, center.y)
    context.fill()
    context.closePath();
    context.rotate(-angleInRad)
    context.translate(-center.x, -center.y)
  }

  _caculateArrowSizeAmplifier(direction) {
    var count = this.outs[direction]
    var total = this.outs.reduce((sum, count) => {
      return sum + count
    }, 0)

    var amplifier = 1 + count / (total || 1)

    return amplifier > 1.4 ? 1.4 : amplifier
  }

  get eventMap() {
    return {
      '(root)': {
        'mo': {
          change: this.onchange_mo,
          removed: this.onremove_mo
        }
      }
    }
  }

  onchange_mo(after, before, hint) {
    if(!after.hasOwnProperty('left') && !after.hasOwnProperty('top'))
      return;

    var { origin, deliverer } = hint

    var pos = origin.center;
    if(!this.contains(pos.x, pos.y)) {
      this._out(origin)
      return;
    }

    this._in(origin)
  }

  onremove_mo(container, component) {
    this._out(component)
  }
}

Component.register('landmark', Landmark);
