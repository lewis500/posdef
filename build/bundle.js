(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var types;

types = require('./actionTypes');

module.exports = {
  setNumSignals: function(num_signals) {
    return {
      type: types.SET_NUM_SIGNALS,
      num_signals: num_signals
    };
  }
};


},{"./actionTypes":2}],2:[function(require,module,exports){
module.exports = {
  SET_K: 'SET_K',
  PAUSE_PLAY: 'PAUSE_PLAY',
  SET_NUM_SIGNALS: 'SET_NUM_SIGNALS',
  SET_GREEN: 'SET_GREEN',
  SET_CYCLE: 'SET_CYCLE',
  SET_OFFSET: 'SET_OFFSET',
  TICK: 'TICK'
};


},{}],3:[function(require,module,exports){
var ActionCreators, App, React, assign, bindActionCreators, connect, mapDispatchToProps, mapStateToProps;

React = require('react');

assign = require('lodash').assign;

connect = require('react-redux').connect;

bindActionCreators = require('redux').bindActionCreators;

ActionCreators = require('../actions/actionCreators');

App = React.createClass({displayName: "App",
  render: function() {
    return React.createElement("div", null);
  }
});

mapStateToProps = function(state) {
  return assign({}, state);
};

mapDispatchToProps = function(dispatch) {
  var res;
  return res = {
    actions: bindActionCreators(ActionCreators, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);


},{"../actions/actionCreators":1,"lodash":undefined,"react":undefined,"react-redux":undefined,"redux":undefined}],4:[function(require,module,exports){
var App, Provider, React, createStore, render, root, store;

React = require('react');

createStore = require('redux').createStore;

root = require('./reducers/root');

store = createStore(root);

render = require('react-dom').render;

App = require('./components/app');

Provider = require('react-redux').Provider;

render(React.createElement(Provider, {
  "store": store
}, React.createElement(App, null)), document.getElementById('app'));


},{"./components/app":3,"./reducers/root":5,"react":undefined,"react-dom":undefined,"react-redux":undefined,"redux":undefined}],5:[function(require,module,exports){
var Immutable, RootReduce, _, initialState, types;

Immutable = require('immutable');

types = require('../actions/actionTypes');

_ = require('lodash');

initialState = {};

RootReduce = function(state, action) {
  if (state == null) {
    state = initialState;
  }
  return state;
};

module.exports = RootReduce;


},{"../actions/actionTypes":2,"immutable":undefined,"lodash":undefined}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZW5qYWxvdC9jb2RlL3NldG9zYS9wb3NkZWYvYXBwL2FjdGlvbnMvYWN0aW9uQ3JlYXRvcnMuY29mZmVlIiwiL1VzZXJzL2VuamFsb3QvY29kZS9zZXRvc2EvcG9zZGVmL2FwcC9hY3Rpb25zL2FjdGlvblR5cGVzLmNvZmZlZSIsIi9Vc2Vycy9lbmphbG90L2NvZGUvc2V0b3NhL3Bvc2RlZi9hcHAvY29tcG9uZW50cy9hcHAuY2pzeCIsIi9Vc2Vycy9lbmphbG90L2NvZGUvc2V0b3NhL3Bvc2RlZi9hcHAvaW5kZXguY2pzeCIsIi9Vc2Vycy9lbmphbG90L2NvZGUvc2V0b3NhL3Bvc2RlZi9hcHAvcmVkdWNlcnMvcm9vdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBOztBQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsZUFBUjs7QUFFUixNQUFNLENBQUMsT0FBUCxHQUNDO0VBQUEsYUFBQSxFQUFlLFNBQUMsV0FBRDtXQUNkO01BQUMsSUFBQSxFQUFNLEtBQUssQ0FBQyxlQUFiO01BQThCLGFBQUEsV0FBOUI7O0VBRGMsQ0FBZjs7Ozs7QUNIRCxNQUFNLENBQUMsT0FBUCxHQUNDO0VBQUEsS0FBQSxFQUFPLE9BQVA7RUFDQSxVQUFBLEVBQVksWUFEWjtFQUVBLGVBQUEsRUFBaUIsaUJBRmpCO0VBR0EsU0FBQSxFQUFXLFdBSFg7RUFJQSxTQUFBLEVBQVcsV0FKWDtFQUtBLFVBQUEsRUFBWSxZQUxaO0VBTUEsSUFBQSxFQUFNLE1BTk47Ozs7O0FDREQsSUFBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVI7O0FBQ1AsU0FBVSxPQUFBLENBQVEsUUFBUixFQUFWOztBQUNBLFVBQVcsT0FBQSxDQUFRLGFBQVIsRUFBWDs7QUFDQSxxQkFBc0IsT0FBQSxDQUFRLE9BQVIsRUFBdEI7O0FBQ0QsY0FBQSxHQUFpQixPQUFBLENBQVEsMkJBQVI7O0FBRWpCLEdBQUEsR0FBTSxLQUFLLENBQUMsV0FBTixDQUNMO0VBQUEsTUFBQSxFQUFRLFNBQUE7V0FDSixLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQixJQUEzQjtFQURJLENBQVI7Q0FESzs7QUFJTixlQUFBLEdBQWtCLFNBQUMsS0FBRDtTQUNqQixNQUFBLENBQU8sRUFBUCxFQUFXLEtBQVg7QUFEaUI7O0FBR2xCLGtCQUFBLEdBQXFCLFNBQUMsUUFBRDtBQUNwQixNQUFBO1NBQUEsR0FBQSxHQUNDO0lBQUEsT0FBQSxFQUFTLGtCQUFBLENBQW1CLGNBQW5CLEVBQWtDLFFBQWxDLENBQVQ7O0FBRm1COztBQUlyQixNQUFNLENBQUMsT0FBUCxHQUFpQixPQUFBLENBQVEsZUFBUixFQUF3QixrQkFBeEIsQ0FBQSxDQUE0QyxHQUE1Qzs7OztBQ2hCakIsSUFBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVI7O0FBQ1AsY0FBZSxPQUFBLENBQVEsT0FBUixFQUFmOztBQUNELElBQUEsR0FBTyxPQUFBLENBQVEsaUJBQVI7O0FBQ1AsS0FBQSxHQUFRLFdBQUEsQ0FBWSxJQUFaOztBQUdQLFNBQVUsT0FBQSxDQUFRLFdBQVIsRUFBVjs7QUFDRCxHQUFBLEdBQU0sT0FBQSxDQUFRLGtCQUFSOztBQUNMLFdBQVksT0FBQSxDQUFRLGFBQVIsRUFBWjs7QUFDRCxNQUFBLENBQU8sS0FBSyxDQUFDLGFBQU4sQ0FBb0IsUUFBcEIsRUFBOEI7RUFBQyxPQUFBLEVBQVUsS0FBWDtDQUE5QixFQUFrRCxLQUFLLENBQUMsYUFBTixDQUFvQixHQUFwQixFQUF5QixJQUF6QixDQUFsRCxDQUFQLEVBQTBGLFFBQVEsQ0FBQyxjQUFULENBQXdCLEtBQXhCLENBQTFGOzs7O0FDVkEsSUFBQTs7QUFBQSxTQUFBLEdBQVksT0FBQSxDQUFRLFdBQVI7O0FBQ1osS0FBQSxHQUFRLE9BQUEsQ0FBUSx3QkFBUjs7QUFDUixDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVI7O0FBTUosWUFBQSxHQUFlOztBQUVmLFVBQUEsR0FBYSxTQUFDLEtBQUQsRUFBcUIsTUFBckI7O0lBQUMsUUFBTTs7U0FFbkI7QUFGWTs7QUFJYixNQUFNLENBQUMsT0FBUCxHQUFpQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ0eXBlcyA9IHJlcXVpcmUgJy4vYWN0aW9uVHlwZXMnXG5cbm1vZHVsZS5leHBvcnRzID0gXG5cdHNldE51bVNpZ25hbHM6IChudW1fc2lnbmFscyktPlxuXHRcdHt0eXBlOiB0eXBlcy5TRVRfTlVNX1NJR05BTFMsIG51bV9zaWduYWxzfVxuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IFxuXHRTRVRfSzogJ1NFVF9LJ1xuXHRQQVVTRV9QTEFZOiAnUEFVU0VfUExBWSdcblx0U0VUX05VTV9TSUdOQUxTOiAnU0VUX05VTV9TSUdOQUxTJ1xuXHRTRVRfR1JFRU46ICdTRVRfR1JFRU4nXG5cdFNFVF9DWUNMRTogJ1NFVF9DWUNMRSdcblx0U0VUX09GRlNFVDogJ1NFVF9PRkZTRVQnXG5cdFRJQ0s6ICdUSUNLJ1xuIiwiUmVhY3QgPSByZXF1aXJlICdyZWFjdCdcbnthc3NpZ259ID0gcmVxdWlyZSAnbG9kYXNoJ1xue2Nvbm5lY3R9ID0gcmVxdWlyZSAncmVhY3QtcmVkdXgnXG57YmluZEFjdGlvbkNyZWF0b3JzfSA9IHJlcXVpcmUgJ3JlZHV4J1xuQWN0aW9uQ3JlYXRvcnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL2FjdGlvbkNyZWF0b3JzJ1xuXG5BcHAgPSBSZWFjdC5jcmVhdGVDbGFzc1xuXHRyZW5kZXI6IC0+XG4gICAgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgbnVsbCkpXG5cbm1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSktPlxuXHRhc3NpZ24ge30sIHN0YXRlXG5cbm1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCktPlxuXHRyZXMgPSBcblx0XHRhY3Rpb25zOiBiaW5kQWN0aW9uQ3JlYXRvcnMgQWN0aW9uQ3JlYXRvcnMsZGlzcGF0Y2hcblxubW9kdWxlLmV4cG9ydHMgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcyxtYXBEaXNwYXRjaFRvUHJvcHMpKEFwcCkiLCIjbWFrZSB0aGUgc3RvcmVcblJlYWN0ID0gcmVxdWlyZSAncmVhY3QnXG57Y3JlYXRlU3RvcmV9ID0gcmVxdWlyZSAncmVkdXgnXG5yb290ID0gcmVxdWlyZSAnLi9yZWR1Y2Vycy9yb290J1xuc3RvcmUgPSBjcmVhdGVTdG9yZSByb290XG5cbiNyaWcgdXAgdGhlIGFwcFxue3JlbmRlcn0gPSByZXF1aXJlICdyZWFjdC1kb20nXG5BcHAgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvYXBwJ1xue1Byb3ZpZGVyfSA9IHJlcXVpcmUgJ3JlYWN0LXJlZHV4J1xucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHJvdmlkZXIsIHtcInN0b3JlXCI6IChzdG9yZSl9LCBSZWFjdC5jcmVhdGVFbGVtZW50KEFwcCwgbnVsbCkpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpXG4iLCJJbW11dGFibGUgPSByZXF1aXJlICdpbW11dGFibGUnXG50eXBlcyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvYWN0aW9uVHlwZXMnXG5fID0gcmVxdWlyZSAnbG9kYXNoJ1xuXG4jcmVkdWNlciBmdW5jdGlvbnNcbiN0ZW1wb3JhcnkgY29zbnRhbnRzXG5cblxuaW5pdGlhbFN0YXRlID0ge31cblxuUm9vdFJlZHVjZSA9IChzdGF0ZT1pbml0aWFsU3RhdGUsIGFjdGlvbiktPlxuXHRcblx0c3RhdGVcblxubW9kdWxlLmV4cG9ydHMgPSBSb290UmVkdWNlIl19
