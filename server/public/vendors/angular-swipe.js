'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

exports.default = (0, _angular.module)('swipe', []).factory('swipe', function () {
  var MOVE_BUFFER_RADIUS = 40;
  var MAX_RATIO = 0.3;

  var POINTER_EVENTS = {
    'mouse': {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup'
    },
    'touch': {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      cancel: 'touchcancel'
    }
  };

  function getCoordinates(event) {
    var originalEvent = event.originalEvent || event;
    var touches = originalEvent.touches && originalEvent.touches.length ? originalEvent.touches : [originalEvent];
    var e = originalEvent.changedTouches && originalEvent.changedTouches[0] || touches[0];

    return {
      x: e.clientX,
      y: e.clientY
    };
  }

  function getEvents(pointerTypes, eventType) {
    var res = [];
    angular.forEach(pointerTypes, function (pointerType) {
      var eventName = POINTER_EVENTS[pointerType][eventType];
      if (eventName) {
        res.push(eventName);
      }
    });
    return res.join(' ');
  }

  return {

    bind: function bind(element, eventHandlers, pointerTypes) {

      // Absolute total movement
      var totalX, totalY;
      // Coordinates of the start position.
      var startCoords;
      var lastPos;
      // Whether a swipe is active.
      var active = false;
      // Decide where we are going
      var isDecided = false;
      var isVertical = true;

      pointerTypes = pointerTypes || ['mouse', 'touch'];

      element.on(getEvents(pointerTypes, 'start'), function (event) {
        startCoords = getCoordinates(event);
        active = true;
        totalX = 0;
        totalY = 0;
        isDecided = false;
        isVertical = true;
        lastPos = startCoords;
        eventHandlers['start'] && eventHandlers['start'](startCoords, event);
      });

      element.on(getEvents(pointerTypes, 'cancel'), function (event) {
        active = false;
        eventHandlers['cancel'] && eventHandlers['cancel'](event);
      });

      element.on(getEvents(pointerTypes, 'move'), function (event) {

        if (!active) {
          return;
        }

        if (!startCoords) {
          return;
        }

        var coords = getCoordinates(event);

        totalX += Math.abs(coords.x - lastPos.x);
        totalY += Math.abs(coords.y - lastPos.y);

        lastPos = coords;

        if (totalX < MOVE_BUFFER_RADIUS && totalY < MOVE_BUFFER_RADIUS) {
          return;
        } else {
          if (!isDecided) {

            var deltaX, deltaY, ratio;

            deltaX = Math.abs(coords.x - startCoords.x);
            deltaY = Math.abs(coords.y - startCoords.y);

            ratio = deltaY / deltaX;

            if (ratio < MAX_RATIO) {
              event.preventDefault();
              isVertical = false;
            } else {
              isVertical = true;
            }

            isDecided = true;
          }
        }

        event.isVertical = isVertical;
        eventHandlers['move'] && eventHandlers['move'](coords, event);
      });

      element.on(getEvents(pointerTypes, 'end'), function (event) {
        if (!active) {
          return;
        }
        event.isVertical = isVertical;
        active = false;
        eventHandlers['end'] && eventHandlers['end'](getCoordinates(event), event);
      });
    }
  };
}).directive('ngSwipeLeft', makeSwipeDirective('ngSwipeLeft', -1, false, 'swipeleft')).directive('ngSwipeRight', makeSwipeDirective('ngSwipeRight', 1, false, 'swiperight')).directive('ngSwipeUp', makeSwipeDirective('ngSwipeUp', -1, true, 'swipeup')).directive('ngSwipeDown', makeSwipeDirective('ngSwipeDown', 1, true, 'swipedown'));

function makeSwipeDirective(directiveName, direction, axis, eventName) {
  return ['$parse', 'swipe', function ($parse, swipe) {
    var MAX_OTHER_AXIS_DISTANCE = 75,
        MAX_RATIO = 0.3,
        MIN_DISTANCE = 30;

    return function (scope, element, attr) {
      var swipeHandler = $parse(attr[directiveName]);
      var startCoords = undefined,
          valid = undefined;

      function validSwipe(coords) {
        if (!startCoords || !valid) {
          return false;
        }

        var deltaY = (coords.y - startCoords.y) * direction;
        var deltaX = (coords.x - startCoords.x) * direction;

        if (!axis) {
          // horizontal swipe
          return Math.abs(deltaY) < MAX_OTHER_AXIS_DISTANCE && deltaX > 0 && deltaX > MIN_DISTANCE && Math.abs(deltaY) / deltaX < MAX_RATIO;
        } else {
          // vertical swipe
          return Math.abs(deltaX) < MAX_OTHER_AXIS_DISTANCE && deltaY > 0 && deltaY > MIN_DISTANCE && Math.abs(deltaX) / deltaY < MAX_RATIO;
        }
      }

      var pointerTypes = ['touch'];

      if (!angular.isDefined(attr['ngSwipeDisableMouse'])) {
        pointerTypes.push('mouse');
      }

      swipe.bind(element, {
        'start': function start(coords, event) {
          var className = event.target.getAttribute('class');
          if (axis && (!className || className && className.match('noPreventDefault') === null)) {
            event.preventDefault();
          }
          startCoords = coords;
          valid = true;
        },
        'cancel': function cancel() {
          valid = false;
        },
        'end': function end(coords, event) {
          if (validSwipe(coords)) {
            scope.$apply(function () {
              element.triggerHandler(eventName);
              swipeHandler(scope, { $event: event });
            });
          }
        }
      }, pointerTypes);
    };
  }];
}
