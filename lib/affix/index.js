'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcUtil = require('rc-util');

var _rcUtil2 = _interopRequireDefault(_rcUtil);

function getScroll(w, top) {
  var ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
  var method = 'scroll' + (top ? 'Top' : 'Left');
  if (typeof ret !== 'number') {
    var d = w.document;
    //ie6,7,8 standard mode
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      //quirks mode
      ret = d.body[method];
    }
  }
  return ret;
}

function getOffset(element) {
  var rect = element.getBoundingClientRect();
  var body = document.body;
  var clientTop = element.clientTop || body.clientTop || 0;
  var clientLeft = element.clientLeft || body.clientLeft || 0;
  var scrollTop = getScroll(window, true);
  var scrollLeft = getScroll(window);

  return {
    top: rect.top + scrollTop - clientTop,
    left: rect.left + scrollLeft - clientLeft
  };
}

var Affix = _react2['default'].createClass({
  displayName: 'Affix',

  getDefaultProps: function getDefaultProps() {
    return {
      offset: 0
    };
  },

  propTypes: {
    offset: _react2['default'].PropTypes.number
  },

  getInitialState: function getInitialState() {
    return {
      affix: false,
      affixStyle: null
    };
  },

  handleScroll: function handleScroll() {
    var affix = this.state.affix;
    var scrollTop = getScroll(window, true);
    var elemOffset = getOffset(this.getDOMNode());

    if (!affix && elemOffset.top - this.props.offset < scrollTop) {
      this.setState({
        affix: true,
        affixStyle: {
          top: this.props.offset,
          left: elemOffset.left,
          width: this.getDOMNode().offsetWidth
        }
      });
    }

    if (affix && elemOffset.top - this.props.offset > scrollTop) {
      this.setState({
        affix: false,
        affixStyle: null
      });
    }
  },

  componentDidMount: function componentDidMount() {
    this.scrollEvent = _rcUtil2['default'].Dom.addEventListener(window, 'scroll', this.handleScroll);
    this.resizeEvent = _rcUtil2['default'].Dom.addEventListener(window, 'resize', this.handleScroll);
  },

  componentWillUnmount: function componentWillUnmount() {
    if (this.scrollEvent) {
      this.scrollEvent.remove();
    }
    if (this.resizeEvent) {
      this.resizeEvent.remove();
    }
  },

  render: function render() {
    var _rcUtil$classSet;

    var className = _rcUtil2['default'].classSet((_rcUtil$classSet = {}, _defineProperty(_rcUtil$classSet, this.props.className, this.props.className), _defineProperty(_rcUtil$classSet, 'ant-affix', this.state.affix), _rcUtil$classSet));

    return _react2['default'].createElement(
      'div',
      this.props,
      _react2['default'].createElement(
        'div',
        { className: className, style: this.state.affixStyle },
        this.props.children
      )
    );
  }

});

module.exports = Affix;