/*
 * Copyright © HatioLab Inc. All rights reserved.
 */
import './util'

import { expect } from 'chai'

import '../../bower_components/things-scene-core/things-scene-min'
import { Mo } from '../../src/index'

describe('Mo', function () {

  var board;

  beforeEach(function () {
    board = scene.create({
      model: {
        components: [{
          id: 'mo',
          type: 'mo'
        }]
      }
    })
  });

  it('component should be found by its id.', function () {

    var component = board.findById('mo')

    expect(!!component).not.to.equal(false);
  });
});
