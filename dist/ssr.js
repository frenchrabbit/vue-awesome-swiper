"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.install = exports.swiper = exports.Swiper = void 0;

var _swiper = _interopRequireDefault(require("swiper"));

var _objectAssign = _interopRequireDefault(require("object-assign"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Swiper = window.Swiper || _swiper["default"];
exports.Swiper = Swiper;
var DEFAULT_EVENTS = ['beforeDestroy', 'slideChange', 'slideChangeTransitionStart', 'slideChangeTransitionEnd', 'slideNextTransitionStart', 'slideNextTransitionEnd', 'slidePrevTransitionStart', 'slidePrevTransitionEnd', 'transitionStart', 'transitionEnd', 'touchStart', 'touchMove', 'touchMoveOpposite', 'sliderMove', 'touchEnd', 'click', 'tap', 'doubleTap', 'imagesReady', 'progress', 'reachBeginning', 'reachEnd', 'fromEdge', 'setTranslate', 'setTransition', 'resize'];

var swiperDirective = function swiperDirective(globalOptions) {
  var getInstanceName = function getInstanceName(el, binding, vnode) {
    var instanceName = null;

    if (binding.arg) {
      instanceName = binding.arg;
    } else if (vnode.data.attrs && (vnode.data.attrs.instanceName || vnode.data.attrs['instance-name'])) {
      instanceName = vnode.data.attrs.instanceName || vnode.data.attrs['instance-name'];
    } else if (el.id) {
      instanceName = el.id;
    }

    return instanceName || 'swiper';
  };

  return {
    bind: function bind(el, binding, vnode) {
      var self = vnode.context;

      if (el.className.indexOf('swiper-container') === -1) {
        el.className += (el.className ? ' ' : '') + 'swiper-container';
      }
    },
    inserted: function inserted(el, binding, vnode) {
      var self = vnode.context;
      var options = binding.value;
      var instanceName = getInstanceName(el, binding, vnode);
      var swiper = self[instanceName];

      var eventEmit = function eventEmit(vnode, name, data) {
        var handlers = vnode.data && vnode.data.on || vnode.componentOptions && vnode.componentOptions.listeners;
        if (handlers && handlers[name]) handlers[name].fns(data);
      };

      if (!swiper) {
        var swiperOptions = (0, _objectAssign["default"])({}, globalOptions, options);
        swiper = self[instanceName] = new Swiper(el, swiperOptions);
        DEFAULT_EVENTS.forEach(function (eventName) {
          swiper.on(eventName, function () {
            eventEmit.apply(void 0, [vnode, eventName].concat(Array.prototype.slice.call(arguments)));
            eventEmit.apply(void 0, [vnode, eventName.replace(/([A-Z])/g, '-$1')].concat(Array.prototype.slice.call(arguments)));
          });
        });
      }

      eventEmit(vnode, 'ready', swiper);
    },
    componentUpdated: function componentUpdated(el, binding, vnode) {
      var instanceName = getInstanceName(el, binding, vnode);
      var swiper = vnode.context[instanceName];

      if (swiper) {
        swiper.update && swiper.update();
        swiper.navigation && swiper.navigation.update();
        swiper.pagination && swiper.pagination.render();
        swiper.pagination && swiper.pagination.update();
      }
    },
    unbind: function unbind(el, binding, vnode) {
      var instanceName = getInstanceName(el, binding, vnode);
      var swiper = vnode.context[instanceName];

      if (swiper) {
        swiper.destroy && swiper.destroy();
        delete vnode.context[instanceName];
      }
    }
  };
};

var swiper = swiperDirective({});
exports.swiper = swiper;

var install = function install(Vue) {
  var globalOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  Vue.directive('swiper', swiperDirective(globalOptions));
};

exports.install = install;
var VueAwesomeSwiper = {
  Swiper: Swiper,
  swiper: swiper,
  install: install
};
var _default = VueAwesomeSwiper;
exports["default"] = _default;
