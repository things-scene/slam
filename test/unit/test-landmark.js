/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import './util'

import { expect } from 'chai'

import '../../bower_components/things-scene-core/things-scene-min'
import { Landmark } from '../../src/index'

const NORTH = 0
const EAST = 1
const SOUTH = 2
const WEST = 3

const CENTER =  300

describe('Landmark', function () {

  var board;

  beforeEach(function () {
    board = scene.create({
      model: {
        components: [{
          id: 'landmark',
          type: 'landmark',
          cx: CENTER,
          cy: CENTER,
          rx: 100,
          ry: 100
        }, {
          id: 'mo',
          type: 'mo',
          left: 0,
          top: 0,
          width: 20,
          height: 20
        }]
      }
    })
  });

  it('component should be found by its id.', function () {

    var landmark = board.findById('landmark')

    expect(!!landmark).not.to.equal(false);
  });

  it('MO가 랜드마크로 들어가고 나가는 각도에 따라, ins와 outs의 방향별 카운트가 증가해야한다.', function() {
    var mo = board.findById('mo')
    var landmark = board.findById('landmark')

    // NORTH 방향으로 들어감.
    mo.center = {x: CENTER + 1, y: CENTER - 50}
    expect(landmark.ins[NORTH]).to.equals(1)

    mo.center = {x: CENTER - 2, y: CENTER - 150}
    expect(landmark.outs[NORTH]).to.equals(1)

    mo.center = {x: CENTER + 150, y: CENTER + 1}

    mo.center = {x: CENTER + 50, y: CENTER - 2}
    expect(landmark.ins[EAST]).to.equals(1)

    mo.center = {x: CENTER + 150, y: CENTER + 2}
    expect(landmark.outs[EAST]).to.equals(1)

    mo.center = {x: CENTER + 1, y: CENTER + 150}

    mo.center = {x: CENTER - 5, y: CENTER + 50}
    expect(landmark.ins[SOUTH]).to.equals(1)

    mo.center = {x: CENTER + 5, y: CENTER + 150}
    expect(landmark.outs[SOUTH]).to.equals(1)

    mo.center = {x: CENTER - 150, y: CENTER - 1}

    mo.center = {x: CENTER - 50, y: CENTER - 5}
    expect(landmark.ins[WEST]).to.equals(1)

    mo.center = {x: CENTER - 150, y: CENTER + 1}
    expect(landmark.outs[WEST]).to.equals(1)
  });

  it('랜드마크안에 들어와있던 MO가 사라지게되면 랜드마크의 현재 카운트도 감소해야한다.', function () {
    var mo = board.findById('mo')
    var landmark = board.findById('landmark')

    mo.center = {x: CENTER, y: CENTER}
    expect(landmark.count).to.equals(1);

    mo.removeSelf(true)
    expect(landmark.count).to.equals(0);
  });

});
