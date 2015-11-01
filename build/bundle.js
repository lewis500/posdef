(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var types;

types = require('./actionTypes');

module.exports = {
  pausePlay: function() {
    return {
      type: types.PAUSE_PLAY
    };
  },
  setNumSignals: function(num_signals) {
    return {
      type: types.SET_NUM_SIGNALS,
      num_signals: num_signals
    };
  },
  setGreen: function(green) {
    return {
      type: types.SET_GREEN,
      green: green
    };
  },
  setOffset: function(offset) {
    return {
      type: types.SET_OFFSET,
      offset: offset
    };
  },
  setCycle: function(cycle) {
    return {
      type: types.SET_CYCLE,
      cycle: cycle
    };
  },
  tick: function() {
    return {
      type: types.TICK
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
var CumChart, KJ, PureRenderMixin, Q0, React, d3, height, line, m, ref, ref1, width, x, xAxis, y, yAxis;

React = require('react');

PureRenderMixin = require('react-addons-pure-render-mixin');

d3 = require('d3');

ref = require('../constants/constants'), Q0 = ref.Q0, KJ = ref.KJ;

ref1 = [250, 250], width = ref1[0], height = ref1[1];

m = {
  t: 20,
  l: 50,
  b: 30,
  r: 10
};

x = d3.scale.linear().domain([0, 5000]).range([0, width]);

y = d3.scale.linear().domain([0, 2000]).range([height, 0]);

xAxis = d3.svg.axis().scale(x);

yAxis = d3.svg.axis().scale(y).orient('left');

line = d3.svg.line().x(function(d) {
  return x(d.time);
}).y(function(d) {
  return y(d.val);
});

CumChart = React.createClass({displayName: "CumChart",
  componentDidMount: function() {
    d3.select(this.refs.xAxis).call(xAxis);
    return d3.select(this.refs.yAxis).call(yAxis);
  },
  render: function() {
    return React.createElement("svg", {
      "id": 'mfdChart',
      "width": width + m.l + m.r,
      "height": height + m.t + m.b
    }, React.createElement("g", {
      "transform": "translate(" + m.l + "," + m.t + ")"
    }, React.createElement("rect", {
      "width": width,
      "height": height,
      "className": 'bg'
    }), React.createElement("g", {
      "className": 'g-paths'
    }, React.createElement("path", {
      "d": line(this.props.en),
      "className": 'en'
    }), React.createElement("path", {
      "d": line(this.props.ex),
      "className": 'ex'
    })), React.createElement("g", {
      "className": 'y axis',
      "ref": 'yAxis'
    }), React.createElement("g", {
      "className": 'x axis',
      "ref": 'xAxis',
      "transform": "translate(0," + height + ")"
    })));
  }
});

module.exports = CumChart;


},{"../constants/constants":9,"d3":undefined,"react":undefined,"react-addons-pure-render-mixin":undefined}],4:[function(require,module,exports){
var KJ, MFDChart, PureRenderMixin, Q0, React, d3, height, line, m, ref, ref1, width, x, xAxis, y, yAxis;

React = require('react');

PureRenderMixin = require('react-addons-pure-render-mixin');

d3 = require('d3');

ref = require('../constants/constants'), Q0 = ref.Q0, KJ = ref.KJ;

ref1 = [250, 250], width = ref1[0], height = ref1[1];

m = {
  t: 20,
  l: 50,
  b: 30,
  r: 10
};

x = d3.scale.linear().domain([0, KJ]).range([0, width]);

y = d3.scale.linear().domain([0, Q0]).range([height, 0]);

xAxis = d3.svg.axis().scale(x);

yAxis = d3.svg.axis().scale(y).orient('left');

line = d3.svg.line().x(function(d) {
  return x(d.k);
}).y(function(d) {
  return y(d.q);
});

MFDChart = React.createClass({displayName: "MFDChart",
  componentDidMount: function() {
    d3.select(this.refs.xAxis).call(xAxis);
    return d3.select(this.refs.yAxis).call(yAxis);
  },
  render: function() {
    return React.createElement("svg", {
      "id": 'mfdChart',
      "width": width + m.l + m.r,
      "height": height + m.t + m.b
    }, React.createElement("g", {
      "transform": "translate(" + m.l + "," + m.t + ")"
    }, React.createElement("rect", {
      "width": width,
      "height": height,
      "className": 'bg'
    }), React.createElement("g", {
      "className": 'g-paths'
    }, React.createElement("path", {
      "d": line(this.props.mfd),
      "className": 'mfd'
    }), this.props.data.map((function(_this) {
      return function(d) {
        return React.createElement("circle", {
          "className": 'memory',
          "key": d.name,
          "r": '3',
          "transform": _this.place_circle(d)
        });
      };
    })(this))), React.createElement("g", {
      "className": 'y axis',
      "ref": 'yAxis'
    }), React.createElement("g", {
      "className": 'x axis',
      "ref": 'xAxis',
      "transform": "translate(0," + height + ")"
    })));
  },
  place_circle: function(d) {
    var ref2, tx, ty;
    ref2 = [x(d.k), y(d.q)], tx = ref2[0], ty = ref2[1];
    return "translate(" + tx + "," + ty + ")";
  }
});

module.exports = MFDChart;


},{"../constants/constants":9,"d3":undefined,"react":undefined,"react-addons-pure-render-mixin":undefined}],5:[function(require,module,exports){
var NUM_CELLS, PureRenderMixin, React, RingRoad, _, classNames;

React = require('react');

classNames = require('classNames');

PureRenderMixin = require('react-addons-pure-render-mixin');

NUM_CELLS = require('../constants/constants').NUM_CELLS;

_ = require('lodash');


/*
receives cars,signals
 */

RingRoad = React.createClass({displayName: "RingRoad",
  render: function() {
    var cars, ref, signals;
    ref = this.props, cars = ref.cars, signals = ref.signals;
    return React.createElement("svg", {
      "id": 'vis',
      "baseProfile": "basic",
      "x": "0",
      "y": "0",
      "viewBox": "0 0 110 110"
    }, React.createElement("g", {
      "transform": 'translate(55,55)'
    }, React.createElement("circle", {
      "className": 'road',
      "r": '50'
    }), React.createElement("g", {
      "className": 'g-cars'
    }, _.map(cars, (function(_this) {
      return function(c) {
        return React.createElement("rect", {
          "className": 'car',
          "key": c.name,
          "width": '.5',
          "height": '.3',
          "y": '-.15',
          "transform": _this.transformer(c),
          "fill": c.fill
        });
      };
    })(this))), React.createElement("g", {
      "className": 'g-signals'
    }, _.map(signals, (function(_this) {
      return function(s) {
        return React.createElement("rect", {
          "key": s.name,
          "className": classNames('signal', {
            green: s.green
          }),
          "width": '.6',
          "height": '2',
          "y": '-1',
          "transform": _this.transformer(s)
        });
      };
    })(this)))));
  },
  transformer: function(d) {
    var loc;
    loc = d.loc / NUM_CELLS * 360;
    return "rotate(" + loc + ") translate(0,50)";
  }
});

module.exports = RingRoad;


},{"../constants/constants":9,"classNames":undefined,"lodash":undefined,"react":undefined,"react-addons-pure-render-mixin":undefined}],6:[function(require,module,exports){
var ActionCreators, App, CumChart, Header, MFDChart, PureRenderMixin, React, RingRoad, _, bindActionCreators, connect, mapDispatchToProps, mapStateToProps, timer;

React = require('react');

RingRoad = require('./RingRoad');

_ = require('lodash');

Header = require('./header');

PureRenderMixin = require('react-addons-pure-render-mixin');

connect = require('react-redux').connect;

bindActionCreators = require('redux').bindActionCreators;

ActionCreators = require('../actions/actionCreators');

timer = require('d3').timer;

MFDChart = require('./MFDChart');

CumChart = require('./CumChart');

App = React.createClass({displayName: "App",
  render: function() {
    var actions, cum, cycle, green, k, long_memory, mfd, num_signals, offset, ref, ref1, settings, signals, traveling;
    ref = this.props, actions = ref.actions, traveling = ref.traveling, signals = ref.signals, long_memory = ref.long_memory, mfd = ref.mfd, cum = ref.cum;
    settings = (ref1 = this.props, k = ref1.k, cycle = ref1.cycle, green = ref1.green, offset = ref1.offset, num_signals = ref1.num_signals, ref1);
    return React.createElement("div", {
      "data-layout": 'column',
      "id": 'main'
    }, React.createElement("div", {
      "data-flex": true,
      "layout": 'row'
    }, React.createElement("button", {
      "flex": true,
      "onClick": this.pausePlay
    }, "Move")), React.createElement(Header, {
      "actions": actions,
      "settings": settings
    }), React.createElement("div", {
      "flex": true,
      "data-layout": 'row'
    }, React.createElement("div", {
      "data-flex": true
    }, React.createElement(RingRoad, {
      "cars": traveling,
      "signals": signals
    })), React.createElement("div", {
      "data-flex": true
    }, React.createElement(MFDChart, {
      "data": long_memory,
      "mfd": mfd
    })), React.createElement("div", {
      "data-flex": true
    }, React.createElement(CumChart, {
      "en": cum.EN_memory,
      "ex": cum.EX_memory
    }))));
  },
  pausePlay: function() {
    if (this.props.paused) {
      timer((function(_this) {
        return function() {
          _this.props.actions.tick();
          return _this.props.paused;
        };
      })(this));
    }
    return this.props.actions.pausePlay();
  }
});

mapStateToProps = function(state) {
  return _.assign({}, state);
};

mapDispatchToProps = function(dispatch) {
  return {
    actions: bindActionCreators(ActionCreators, dispatch)
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);


},{"../actions/actionCreators":1,"./CumChart":3,"./MFDChart":4,"./RingRoad":5,"./header":7,"d3":undefined,"lodash":undefined,"react":undefined,"react-addons-pure-render-mixin":undefined,"react-redux":undefined,"redux":undefined}],7:[function(require,module,exports){
var Header, PureRenderMixin, React, Slider;

React = require('react');

PureRenderMixin = require('react-addons-pure-render-mixin');

Slider = require('./slider');


/*
receives SS, actions
 */

Header = React.createClass({displayName: "Header",
  render: function() {
    var UU, cycle, green, k, num_signals, offset, ref;
    ref = this.props.settings, num_signals = ref.num_signals, green = ref.green, cycle = ref.cycle, k = ref.k, offset = ref.offset;
    UU = (function(_this) {
      return function(action, e) {
        return _this.props.actions[action](+e.target.value);
      };
    })(this);
    return React.createElement("div", {
      "flex": true,
      "layout": 'column'
    }, React.createElement(Slider, {
      "value": num_signals,
      "max": '40',
      "min": '0',
      "step": '1',
      "onChange": UU.bind(this, 'setNumSignals'),
      "label": 'number signals'
    }), React.createElement(Slider, {
      "value": offset,
      "max": '30',
      "min": '0',
      "step": '1',
      "onChange": UU.bind(this, 'setOffset'),
      "label": 'offset'
    }), React.createElement(Slider, {
      "value": green,
      "max": '200',
      "min": '0',
      "step": '10',
      "onChange": UU.bind(this, 'setGreen'),
      "label": 'green'
    }), React.createElement(Slider, {
      "value": cycle,
      "max": '200',
      "min": '0',
      "step": '10',
      "onChange": UU.bind(this, 'setCycle'),
      "label": 'cycle'
    }));
  }
});

module.exports = Header;


},{"./slider":8,"react":undefined,"react-addons-pure-render-mixin":undefined}],8:[function(require,module,exports){
var React, Slider;

React = require('react');


/*
receives label, value, onChange,max,min,step
 */

Slider = React.createClass({displayName: "Slider",
  render: function() {
    var label, max, min, onChange, ref, step, value;
    ref = this.props, value = ref.value, label = ref.label, onChange = ref.onChange, max = ref.max, min = ref.min, step = ref.step;
    return React.createElement("div", {
      "flex": true
    }, React.createElement("input", {
      "type": "range",
      "value": value,
      "max": max,
      "min": min,
      "step": step,
      "onChange": onChange
    }), " ", label, ":", value);
  }
});

module.exports = Slider;


},{"react":undefined}],9:[function(require,module,exports){
var COLORS, KJ, MAX_MEMORY, MEMORY_FREQ, NUM_CELLS, Q0, VF, W;

MAX_MEMORY = 3;

MEMORY_FREQ = 100;

NUM_CELLS = 1000;

COLORS = ['#03A9F4', '#E91E63', '#4CAF50', '#FF5722'];

Q0 = 1 / 3;

KJ = 1;

VF = 1;

W = 1 / 2;

module.exports = {
  MAX_MEMORY: MAX_MEMORY,
  MEMORY_FREQ: MEMORY_FREQ,
  NUM_CELLS: NUM_CELLS,
  COLORS: COLORS,
  Q0: Q0,
  KJ: KJ,
  VF: VF,
  W: W
};


},{}],10:[function(require,module,exports){
var App, Provider, React, actions, render, store;

render = require('react-dom').render;

App = require('./components/app');

store = require('./stores/store');

React = require('react');

Provider = require('react-redux').Provider;

actions = require('./actions/actionCreators');

render(React.createElement(Provider, {
  "store": store
}, React.createElement(App, null)), document.getElementById('app'));

store.dispatch(actions.setNumSignals(30));

store.dispatch;


},{"./actions/actionCreators":1,"./components/app":6,"./stores/store":15,"react":undefined,"react-dom":undefined,"react-redux":undefined}],11:[function(require,module,exports){
var Immutable, MAX_MEMORY, MEMORY_FREQ, NUM_CELLS, _, memoryReduce, ref,
  slice = [].slice;

Immutable = require('immutable');

_ = require('lodash');

ref = require('../constants/constants'), MAX_MEMORY = ref.MAX_MEMORY, MEMORY_FREQ = ref.MEMORY_FREQ, NUM_CELLS = ref.NUM_CELLS;

memoryReduce = function(short_memory, long_memory, q, k, time) {
  var denom, newMemory;
  short_memory.q += q;
  short_memory.k += k;
  if ((time % MEMORY_FREQ) === 0) {
    denom = MEMORY_FREQ * NUM_CELLS;
    newMemory = {
      q: short_memory.q / denom,
      k: short_memory.k / denom,
      name: _.uniqueId()
    };
    long_memory = slice.call(long_memory).concat([newMemory]);
    short_memory = {
      q: 0,
      k: 0
    };
    if (long_memory.length > MAX_MEMORY) {
      long_memory = _.drop(long_memory, 1);
    }
  }
  return {
    short_memory: short_memory,
    long_memory: long_memory
  };
};

module.exports = memoryReduce;


},{"../constants/constants":9,"immutable":undefined,"lodash":undefined}],12:[function(require,module,exports){
var KJ, MFDReduce, Q0, VF, W, _, d3, find_mfd, find_min, get_entry, loop_over_entries, make_table, ref,
  slice = [].slice;

d3 = require('d3');

_ = require('lodash');

ref = require('../constants/constants'), VF = ref.VF, Q0 = ref.Q0, KJ = ref.KJ, W = ref.W;

loop_over_entries = function(d, cycle, green, offset, direction) {
  var entry, g, g0, i, ref1, res;
  ref1 = [1000, 999, 0, []], g0 = ref1[0], g = ref1[1], i = ref1[2], res = ref1[3];
  while (g > 0 && Math.abs(i) < 100) {
    entry = get_entry(i, d, cycle, green, offset);
    g = entry.g;
    res.push(entry);
    if (direction === 'forward') {
      i++;
    } else {
      i--;
    }
  }
  return res;
};

get_entry = function(i, d, cycle, green, offset) {
  var c, e, g, t, tr, tt, v, x;
  v = i < 0 ? -W : VF;
  x = d * i;
  tt = x / v;
  e = tt - i * offset;
  g = green - e;
  green = Math.max(g, 0);
  tr = Math.max(cycle - e, 0);
  t = tt + cycle - e;
  c = Q0 * green + Math.max(0, -x * KJ);
  return {
    t: t,
    c: c,
    x: x,
    g: g
  };
};

make_table = function(d, cycle, green, offset) {
  var backward_entries, forward_entries;
  forward_entries = loop_over_entries(d, cycle, green, offset, 'forward');
  backward_entries = loop_over_entries(d, cycle, green, offset, 'backward');
  return slice.call(forward_entries).concat(slice.call(backward_entries));
};

find_min = function(k, table) {
  var costs, e, q;
  costs = (function() {
    var j, len, results;
    results = [];
    for (j = 0, len = table.length; j < len; j++) {
      e = table[j];
      results.push((e.c + e.x * k) / e.t);
    }
    return results;
  })();
  q = _.min(slice.call(costs).concat([VF * k], [W * (KJ - k)]));
  return {
    k: k,
    q: q
  };
};

find_mfd = function(table) {
  var j, k, len, ref1, results;
  ref1 = _.range(0, 1.01, .01);
  results = [];
  for (j = 0, len = ref1.length; j < len; j++) {
    k = ref1[j];
    results.push(find_min(k, table));
  }
  return results;
};

MFDReduce = function(mfd, d, cycle, green, offset) {
  return find_mfd(make_table(d, cycle, green, offset));
};

module.exports = MFDReduce;


},{"../constants/constants":9,"d3":undefined,"lodash":undefined}],13:[function(require,module,exports){
var COLORS, Immutable, MFDReduce, NUM_CARS, NUM_CELLS, RUSH_LENGTH, RootReduce, TRIP_LENGTH, _, initialState, j, memoryReduce, ref, results, tickReduce, types, waiting;

Immutable = require('immutable');

types = require('../actions/actionTypes');

_ = require('lodash');

ref = require('../constants/constants'), NUM_CELLS = ref.NUM_CELLS, COLORS = ref.COLORS;

memoryReduce = require('./memory');

tickReduce = require('./tick');

MFDReduce = require('./mfd');

NUM_CARS = 2000;

RUSH_LENGTH = 3500;

TRIP_LENGTH = 300;

waiting = _.map((function() {
  results = [];
  for (var j = 0; 0 <= NUM_CARS ? j < NUM_CARS : j > NUM_CARS; 0 <= NUM_CARS ? j++ : j--){ results.push(j); }
  return results;
}).apply(this), function(n) {
  var entry_loc, entry_time, exit_loc, exited, fill, loc, moved, name;
  entry_time = RUSH_LENGTH * n / NUM_CARS;
  entry_loc = _.random(0, NUM_CELLS);
  exit_loc = (entry_loc + TRIP_LENGTH) % NUM_CELLS;
  name = _.uniqueId();
  moved = true;
  fill = _.sample(COLORS);
  loc = entry_loc;
  exited = false;
  return {
    entry_time: entry_time,
    name: name,
    loc: loc,
    moved: moved,
    fill: fill,
    exited: exited,
    entry_loc: entry_loc,
    exit_loc: exit_loc
  };
});

initialState = {
  paused: true,
  time: 0,
  short_memory: {
    q: 0,
    k: 0
  },
  long_memory: [],
  traveling: [],
  cum: {
    EN: 0,
    EX: 0,
    EN_memory: [],
    EX_memory: []
  },
  waiting: waiting,
  signals: [],
  cycle: 100,
  green: 50,
  offset: 0,
  num_signals: 5,
  d: 1000 / 5,
  cells: (function() {
    var l, results1;
    results1 = [];
    for (l = 0; l < 1000; l++) {
      results1.push(100);
    }
    return results1;
  })(),
  mfd: []
};

RootReduce = function(state, action) {
  var cells, cum, cycle, d, green, i, k, l, long_memory, m, mfd, n, num_entered, num_exited, num_signals, offset, paused, q, ref1, ref2, results1, short_memory, signals, time, traveling;
  if (state == null) {
    state = initialState;
  }
  waiting = state.waiting, traveling = state.traveling, signals = state.signals, time = state.time, cells = state.cells, paused = state.paused, long_memory = state.long_memory, short_memory = state.short_memory, mfd = state.mfd, cycle = state.cycle, offset = state.offset, green = state.green, d = state.d, num_signals = state.num_signals, cum = state.cum;
  switch (action.type) {
    case types.SET_GREEN:
      green = action.green;
      mfd = MFDReduce(mfd, d, cycle, green, offset);
      break;
    case types.SET_CYCLE:
      cycle = action.cycle;
      mfd = MFDReduce(mfd, d, cycle, green, offset);
      break;
    case types.SET_OFFSET:
      offset = 1 / num_signals * Math.round(action.offset * num_signals);
      mfd = MFDReduce(mfd, d, cycle, green, offset);
      break;
    case types.SET_NUM_SIGNALS:
      n = num_signals = action.num_signals;
      d = NUM_CELLS / n;
      offset = 1 / n * Math.round(offset * n);
      signals = _.map((function() {
        results1 = [];
        for (var l = 0; 0 <= num_signals ? l < num_signals : l > num_signals; 0 <= num_signals ? l++ : l--){ results1.push(l); }
        return results1;
      }).apply(this), function(i) {
        var res;
        return res = {
          loc: Math.floor(i / num_signals * NUM_CELLS),
          name: _.uniqueId(),
          green: true
        };
      });
      mfd = MFDReduce(mfd, d, cycle, green, offset);
      break;
    case types.TICK:
      for (i = m = 0; m < 5; i = ++m) {
        time = time + 1;
        ref1 = tickReduce(traveling, waiting, signals, cells, time, offset, cycle, green), traveling = ref1.traveling, waiting = ref1.waiting, signals = ref1.signals, cells = ref1.cells, q = ref1.q, k = ref1.k, num_entered = ref1.num_entered, num_exited = ref1.num_exited;
        ref2 = memoryReduce(short_memory, long_memory, q, k, time), long_memory = ref2.long_memory, short_memory = ref2.short_memory;
        cum.EN += num_entered;
        cum.EX += num_exited;
        cum.EN_memory.push({
          time: time,
          val: cum.EN
        });
        cum.EX_memory.push({
          time: time,
          val: cum.EX
        });
      }
      break;
    case types.PAUSE_PLAY:
      paused = !paused;
  }
  return {
    waiting: waiting,
    cum: cum,
    traveling: traveling,
    signals: signals,
    time: time,
    cells: cells,
    paused: paused,
    long_memory: long_memory,
    short_memory: short_memory,
    mfd: mfd,
    cycle: cycle,
    offset: offset,
    green: green,
    d: d,
    num_signals: num_signals,
    cum: cum
  };
};

module.exports = RootReduce;


},{"../actions/actionTypes":2,"../constants/constants":9,"./memory":11,"./mfd":12,"./tick":14,"immutable":undefined,"lodash":undefined}],14:[function(require,module,exports){
var NUM_CELLS, W, _, ref, tickReduce,
  slice = [].slice,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

ref = require('../constants/constants'), NUM_CELLS = ref.NUM_CELLS, W = ref.W;

_ = require('lodash');

tickReduce = function(traveling, waiting, signals, cells, time, offset, cycle, green) {
  var arrivals, c, k, num_entered, num_exited, q, reds, space;
  q = 0;
  cells = (function() {
    var j, len, results;
    results = [];
    for (j = 0, len = cells.length; j < len; j++) {
      c = cells[j];
      results.push(c + 1);
    }
    return results;
  })();
  _.forEach(traveling, function(car) {
    return cells[car.loc] = 0;
  });
  arrivals = _.filter(waiting, function(car) {
    var entry_loc;
    entry_loc = car.entry_loc;
    if (car.entry_time <= time && cells[entry_loc] > 0) {
      q++;
      cells[entry_loc] = 0;
      return true;
    } else {
      return false;
    }
  });
  waiting = _.without.apply(_, [waiting].concat(slice.call(arrivals)));
  signals = _.map(signals, function(signal, i) {
    var time_in_cycle;
    time_in_cycle = modulo(time - i * offset, cycle);
    return _.assign({}, signal, {
      green: time_in_cycle <= green
    });
  });
  reds = Array(NUM_CELLS);
  _.forEach(signals, function(signal) {
    return reds[signal.loc] = !signal.green;
  });
  space = 1 / W;
  num_exited = 0;
  traveling = _.map(traveling, function(car, i) {
    var exited, loc_next;
    loc_next = (car.loc + 1) % NUM_CELLS;
    if (cells[loc_next] >= space && !reds[loc_next]) {
      q++;
      exited = car.loc === car.exit_loc;
      if (exited) {
        num_exited++;
      }
      return _.assign({}, car, {
        loc: loc_next,
        exited: exited
      });
    } else {
      return car;
    }
  });
  k = traveling.length;
  traveling = _.filter(traveling, function(car) {
    return !car.exited;
  });
  traveling = slice.call(traveling).concat(slice.call(arrivals));
  num_entered = arrivals.length;
  return {
    traveling: traveling,
    waiting: waiting,
    cells: cells,
    signals: signals,
    q: q,
    k: k,
    num_entered: num_entered,
    num_exited: num_exited
  };
};

module.exports = tickReduce;


},{"../constants/constants":9,"lodash":undefined}],15:[function(require,module,exports){
var createStore, root, store;

createStore = require('redux').createStore;

root = require('../reducers/root');

store = createStore(root);

module.exports = store;


},{"../reducers/root":13,"redux":undefined}]},{},[10])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvcmVhY3QvYXBwL2FjdGlvbnMvYWN0aW9uQ3JlYXRvcnMuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3JlYWN0L2FwcC9hY3Rpb25zL2FjdGlvblR5cGVzLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9yZWFjdC9hcHAvY29tcG9uZW50cy9DdW1DaGFydC5janN4IiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3JlYWN0L2FwcC9jb21wb25lbnRzL01GRENoYXJ0LmNqc3giLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvcmVhY3QvYXBwL2NvbXBvbmVudHMvUmluZ1JvYWQuY2pzeCIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9yZWFjdC9hcHAvY29tcG9uZW50cy9hcHAuY2pzeCIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9yZWFjdC9hcHAvY29tcG9uZW50cy9oZWFkZXIuY2pzeCIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9yZWFjdC9hcHAvY29tcG9uZW50cy9zbGlkZXIuY2pzeCIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9yZWFjdC9hcHAvY29uc3RhbnRzL2NvbnN0YW50cy5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvcmVhY3QvYXBwL2luZGV4LmNqc3giLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvcmVhY3QvYXBwL3JlZHVjZXJzL21lbW9yeS5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvcmVhY3QvYXBwL3JlZHVjZXJzL21mZC5jb2ZmZWUiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvcmVhY3QvYXBwL3JlZHVjZXJzL3Jvb3QuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3JlYWN0L2FwcC9yZWR1Y2Vycy90aWNrLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9yZWFjdC9hcHAvc3RvcmVz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LEdBQUosR0FBUSxDQUFULENBQUEsR0FBWTtJQUN2QixJQUFHLEtBQU0sQ0FBQSxRQUFBLENBQU4sSUFBaUIsS0FBakIsSUFBMkIsQ0FBQyxJQUFLLENBQUEsUUFBQSxDQUFwQztNQUNDLENBQUE7TUFDQSxNQUFBLEdBQVMsR0FBRyxDQUFDLEdBQUosS0FBVyxHQUFHLENBQUM7TUFDeEIsSUFBRyxNQUFIO1FBQWUsVUFBQSxHQUFmOzthQUNBLENBQUMsQ0FBQyxNQUFGLENBQVMsRUFBVCxFQUFZLEdBQVosRUFBZ0I7UUFBQyxHQUFBLEVBQUssUUFBTjtRQUFlLFFBQUEsTUFBZjtPQUFoQixFQUpEO0tBQUEsTUFBQTthQU1DLElBTkQ7O0VBRjRCLENBQWpCO0VBVVosQ0FBQSxHQUFJLFNBQVMsQ0FBQztFQUNkLFNBQUEsR0FBWSxDQUFDLENBQUMsTUFBRixDQUFTLFNBQVQsRUFBb0IsU0FBQyxHQUFEO1dBQVEsQ0FBQyxHQUFHLENBQUM7RUFBYixDQUFwQjtFQUdaLFNBQUEsR0FBYSxXQUFBLFNBQUEsQ0FBQSxRQUFhLFdBQUEsUUFBQSxDQUFiO0VBQ2IsV0FBQSxHQUFjLFFBQVEsQ0FBQztTQUN2QjtJQUFDLFdBQUEsU0FBRDtJQUFXLFNBQUEsT0FBWDtJQUFtQixPQUFBLEtBQW5CO0lBQXlCLFNBQUEsT0FBekI7SUFBaUMsR0FBQSxDQUFqQztJQUFtQyxHQUFBLENBQW5DO0lBQXFDLGFBQUEsV0FBckM7SUFBaUQsWUFBQSxVQUFqRDs7QUE1Q1k7O0FBOENiLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDaERqQixJQUFBOztBQUFDLGNBQWUsT0FBQSxDQUFRLE9BQVIsRUFBZjs7QUFDRCxJQUFBLEdBQU8sT0FBQSxDQUFRLGtCQUFSOztBQUVQLEtBQUEsR0FBUSxXQUFBLENBQVksSUFBWjs7QUFDUixNQUFNLENBQUMsT0FBUCxHQUFpQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ0eXBlcyA9IHJlcXVpcmUgJy4vYWN0aW9uVHlwZXMnXG5cbm1vZHVsZS5leHBvcnRzID0gXG5cdHBhdXNlUGxheTogLT5cblx0XHR7dHlwZTogdHlwZXMuUEFVU0VfUExBWX1cblxuXHRzZXROdW1TaWduYWxzOiAobnVtX3NpZ25hbHMpLT5cblx0XHR7dHlwZTogdHlwZXMuU0VUX05VTV9TSUdOQUxTLCBudW1fc2lnbmFsc31cblxuXHRzZXRHcmVlbjogKGdyZWVuKS0+XG5cdFx0e3R5cGU6IHR5cGVzLlNFVF9HUkVFTiwgZ3JlZW59XG5cblx0c2V0T2Zmc2V0OiAob2Zmc2V0KS0+XG5cdFx0e3R5cGU6IHR5cGVzLlNFVF9PRkZTRVQsIG9mZnNldH1cblxuXHRzZXRDeWNsZTogKGN5Y2xlKS0+XG5cdFx0e3R5cGU6IHR5cGVzLlNFVF9DWUNMRSwgY3ljbGV9XG5cblx0dGljazogLT5cblx0XHR7dHlwZTogdHlwZXMuVElDS31cbiIsIm1vZHVsZS5leHBvcnRzID0gXG5cdFNFVF9LOiAnU0VUX0snXG5cdFBBVVNFX1BMQVk6ICdQQVVTRV9QTEFZJ1xuXHRTRVRfTlVNX1NJR05BTFM6ICdTRVRfTlVNX1NJR05BTFMnXG5cdFNFVF9HUkVFTjogJ1NFVF9HUkVFTidcblx0U0VUX0NZQ0xFOiAnU0VUX0NZQ0xFJ1xuXHRTRVRfT0ZGU0VUOiAnU0VUX09GRlNFVCdcblx0VElDSzogJ1RJQ0snXG4iLCJSZWFjdCA9IHJlcXVpcmUgJ3JlYWN0J1xuUHVyZVJlbmRlck1peGluID0gcmVxdWlyZSAncmVhY3QtYWRkb25zLXB1cmUtcmVuZGVyLW1peGluJ1xuZDMgPSByZXF1aXJlICdkMydcbntRMCxLSn0gPSByZXF1aXJlICcuLi9jb25zdGFudHMvY29uc3RhbnRzJ1xuXG5bd2lkdGgsaGVpZ2h0XSA9IFsyNTAsMjUwXVxubSA9IFxuXHR0OiAyMFxuXHRsOiA1MFxuXHRiOiAzMFxuXHRyOiAxMFxuXG54ID0gZDMuc2NhbGUubGluZWFyKClcblx0LmRvbWFpbiBbMCw1MDAwXVxuXHQucmFuZ2UgWzAsd2lkdGhdXG5cbnkgPSBkMy5zY2FsZS5saW5lYXIoKVxuXHQuZG9tYWluIFswLDIwMDBdXG5cdC5yYW5nZSBbaGVpZ2h0LDBdXG5cbnhBeGlzID0gZDMuc3ZnLmF4aXMoKVxuXHQuc2NhbGUgeFxuXG55QXhpcyA9IGQzLnN2Zy5heGlzKClcblx0LnNjYWxlIHlcblx0Lm9yaWVudCAnbGVmdCdcblxubGluZSA9IGQzLnN2Zy5saW5lKClcblx0LnggKGQpLT4geCBkLnRpbWVcblx0LnkgKGQpLT4geSBkLnZhbFxuXG5DdW1DaGFydCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG5cdGNvbXBvbmVudERpZE1vdW50OiAtPlxuXHRcdGQzLnNlbGVjdCB0aGlzLnJlZnMueEF4aXNcblx0XHRcdC5jYWxsIHhBeGlzXG5cdFx0ZDMuc2VsZWN0IHRoaXMucmVmcy55QXhpc1xuXHRcdFx0LmNhbGwgeUF4aXNcblx0cmVuZGVyOiAtPlxuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwge1wiaWRcIjogJ21mZENoYXJ0JywgXCJ3aWR0aFwiOiAod2lkdGgrbS5sK20uciksIFwiaGVpZ2h0XCI6IChoZWlnaHQrbS50K20uYil9LFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImdcIiwge1widHJhbnNmb3JtXCI6IChcInRyYW5zbGF0ZSgje20ubH0sI3ttLnR9KVwiKX0sXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJyZWN0XCIsIHtcIndpZHRoXCI6ICh3aWR0aCksIFwiaGVpZ2h0XCI6IChoZWlnaHQpLCBcImNsYXNzTmFtZVwiOiAnYmcnfSksXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJnXCIsIHtcImNsYXNzTmFtZVwiOiAnZy1wYXRocyd9LFxuXHRcdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJwYXRoXCIsIHtcImRcIjogKGxpbmUodGhpcy5wcm9wcy5lbikpLCBcImNsYXNzTmFtZVwiOiAnZW4nfSksXG5cdFx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1wiZFwiOiAobGluZSh0aGlzLnByb3BzLmV4KSksIFwiY2xhc3NOYW1lXCI6ICdleCd9KVxuXHRcdFx0XHQpLFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiZ1wiLCB7XCJjbGFzc05hbWVcIjogJ3kgYXhpcycsIFwicmVmXCI6ICd5QXhpcyd9KSxcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImdcIiwge1wiY2xhc3NOYW1lXCI6ICd4IGF4aXMnLCBcInJlZlwiOiAneEF4aXMnLCBcInRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZSgwLCN7aGVpZ2h0fSlcIn0pXG5cblx0XHRcdClcdFx0XHRcblx0XHQpXG5cbm1vZHVsZS5leHBvcnRzID0gQ3VtQ2hhcnRcbiIsIlJlYWN0ID0gcmVxdWlyZSAncmVhY3QnXG5QdXJlUmVuZGVyTWl4aW4gPSByZXF1aXJlICdyZWFjdC1hZGRvbnMtcHVyZS1yZW5kZXItbWl4aW4nXG5kMyA9IHJlcXVpcmUgJ2QzJ1xue1EwLEtKfSA9IHJlcXVpcmUgJy4uL2NvbnN0YW50cy9jb25zdGFudHMnXG5cblt3aWR0aCxoZWlnaHRdID0gWzI1MCwyNTBdXG5tID0gXG5cdHQ6IDIwXG5cdGw6IDUwXG5cdGI6IDMwXG5cdHI6IDEwXG5cbnggPSBkMy5zY2FsZS5saW5lYXIoKVxuXHQuZG9tYWluIFswLEtKXVxuXHQucmFuZ2UgWzAsd2lkdGhdXG5cbnkgPSBkMy5zY2FsZS5saW5lYXIoKVxuXHQuZG9tYWluIFswLFEwXVxuXHQucmFuZ2UgW2hlaWdodCwwXVxuXG54QXhpcyA9IGQzLnN2Zy5heGlzKClcblx0LnNjYWxlIHhcblxueUF4aXMgPSBkMy5zdmcuYXhpcygpXG5cdC5zY2FsZSB5XG5cdC5vcmllbnQgJ2xlZnQnXG5cbmxpbmUgPSBkMy5zdmcubGluZSgpXG5cdC54IChkKS0+IHggZC5rXG5cdC55IChkKS0+IHkgZC5xXG5cbk1GRENoYXJ0ID0gUmVhY3QuY3JlYXRlQ2xhc3Ncblx0Y29tcG9uZW50RGlkTW91bnQ6IC0+XG5cdFx0ZDMuc2VsZWN0IHRoaXMucmVmcy54QXhpc1xuXHRcdFx0LmNhbGwgeEF4aXNcblx0XHRkMy5zZWxlY3QgdGhpcy5yZWZzLnlBeGlzXG5cdFx0XHQuY2FsbCB5QXhpc1xuXHRyZW5kZXI6IC0+XG5cdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7XCJpZFwiOiAnbWZkQ2hhcnQnLCBcIndpZHRoXCI6ICh3aWR0aCttLmwrbS5yKSwgXCJoZWlnaHRcIjogKGhlaWdodCttLnQrbS5iKX0sXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiZ1wiLCB7XCJ0cmFuc2Zvcm1cIjogKFwidHJhbnNsYXRlKCN7bS5sfSwje20udH0pXCIpfSxcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInJlY3RcIiwge1wid2lkdGhcIjogKHdpZHRoKSwgXCJoZWlnaHRcIjogKGhlaWdodCksIFwiY2xhc3NOYW1lXCI6ICdiZyd9KSxcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImdcIiwge1wiY2xhc3NOYW1lXCI6ICdnLXBhdGhzJ30sXG5cdFx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInBhdGhcIiwge1wiZFwiOiAobGluZSh0aGlzLnByb3BzLm1mZCkpLCBcImNsYXNzTmFtZVwiOiAnbWZkJ30pLFxuXHRcdFx0XHRcdChcblx0XHRcdFx0XHRcdHRoaXMucHJvcHMuZGF0YS5tYXAgKGQpPT5cblx0XHRcdFx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImNpcmNsZVwiLCB7XCJjbGFzc05hbWVcIjogJ21lbW9yeScsIFwia2V5XCI6IChkLm5hbWUpLCBcInJcIjogJzMnLCBcInRyYW5zZm9ybVwiOiAodGhpcy5wbGFjZV9jaXJjbGUoZCkpfSlcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCksXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJnXCIsIHtcImNsYXNzTmFtZVwiOiAneSBheGlzJywgXCJyZWZcIjogJ3lBeGlzJ30pLFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiZ1wiLCB7XCJjbGFzc05hbWVcIjogJ3ggYXhpcycsIFwicmVmXCI6ICd4QXhpcycsIFwidHJhbnNmb3JtXCI6IFwidHJhbnNsYXRlKDAsI3toZWlnaHR9KVwifSlcblxuXHRcdFx0KVx0XHRcdFxuXHRcdClcblx0cGxhY2VfY2lyY2xlOiAoZCktPlxuXHRcdFt0eCx0eV0gPSBbeChkLmspLCB5KGQucSldXG5cdFx0XCJ0cmFuc2xhdGUoI3t0eH0sI3t0eX0pXCJcblxubW9kdWxlLmV4cG9ydHMgPSBNRkRDaGFydFxuIiwiUmVhY3QgPSByZXF1aXJlICdyZWFjdCdcbmNsYXNzTmFtZXMgPSByZXF1aXJlICdjbGFzc05hbWVzJ1xuUHVyZVJlbmRlck1peGluID0gcmVxdWlyZSAncmVhY3QtYWRkb25zLXB1cmUtcmVuZGVyLW1peGluJ1xue05VTV9DRUxMU30gPSByZXF1aXJlICcuLi9jb25zdGFudHMvY29uc3RhbnRzJ1xuXyA9IHJlcXVpcmUgJ2xvZGFzaCdcbiMjI1xucmVjZWl2ZXMgY2FycyxzaWduYWxzXG4jIyNcblxuUmluZ1JvYWQgPSBSZWFjdC5jcmVhdGVDbGFzc1xuXHQjIG1peGluczogW1B1cmVSZW5kZXJNaXhpbl1cblx0cmVuZGVyOiAtPlxuXHRcdHtjYXJzLHNpZ25hbHN9ID0gdGhpcy5wcm9wc1xuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwge1wiaWRcIjogJ3ZpcycsIFwiYmFzZVByb2ZpbGVcIjogXCJiYXNpY1wiLCBcInhcIjogXCIwXCIsIFwieVwiOiBcIjBcIiwgXCJ2aWV3Qm94XCI6IFwiMCAwIDExMCAxMTBcIn0sXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiZ1wiLCB7XCJ0cmFuc2Zvcm1cIjogJ3RyYW5zbGF0ZSg1NSw1NSknfSxcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImNpcmNsZVwiLCB7XCJjbGFzc05hbWVcIjogJ3JvYWQnLCBcInJcIjogJzUwJ30pLFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiZ1wiLCB7XCJjbGFzc05hbWVcIjogJ2ctY2Fycyd9LFxuXHRcdFx0XHRcdChcblx0XHRcdFx0XHRcdF8ubWFwIGNhcnMsIChjKT0+XG5cdFx0XHRcdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJyZWN0XCIsIHtcImNsYXNzTmFtZVwiOiAnY2FyJywgXCJrZXlcIjogKGMubmFtZSksIFwid2lkdGhcIjogJy41JywgXCJoZWlnaHRcIjogJy4zJywgXCJ5XCI6ICctLjE1JywgXCJ0cmFuc2Zvcm1cIjogKHRoaXMudHJhbnNmb3JtZXIoYykpLCBcImZpbGxcIjogKGMuZmlsbCl9KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KSxcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImdcIiwge1wiY2xhc3NOYW1lXCI6ICdnLXNpZ25hbHMnfSxcblx0XHRcdFx0XHQoXG5cdFx0XHRcdFx0XHRfLm1hcCBzaWduYWxzLCAocyk9PlxuXHRcdFx0XHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwicmVjdFwiLCB7XCJrZXlcIjogKHMubmFtZSksIFwiY2xhc3NOYW1lXCI6IChjbGFzc05hbWVzKCdzaWduYWwnLHtncmVlbjogcy5ncmVlbn0pKSwgXCJ3aWR0aFwiOiAnLjYnLCBcImhlaWdodFwiOiAnMicsIFwieVwiOiAnLTEnLCBcInRyYW5zZm9ybVwiOiAodGhpcy50cmFuc2Zvcm1lcihzKSl9KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KVxuXHRcdFx0KVx0XHRcdFxuXHRcdClcblx0dHJhbnNmb3JtZXI6IChkKS0+XG5cdFx0bG9jID0gZC5sb2MvTlVNX0NFTExTKjM2MFxuXHRcdFwicm90YXRlKCN7bG9jfSkgdHJhbnNsYXRlKDAsNTApXCJcblxubW9kdWxlLmV4cG9ydHMgPSBSaW5nUm9hZFxuIiwiUmVhY3QgPSByZXF1aXJlICdyZWFjdCdcblJpbmdSb2FkID0gcmVxdWlyZSAnLi9SaW5nUm9hZCdcbl8gPSByZXF1aXJlICdsb2Rhc2gnXG5IZWFkZXIgPSByZXF1aXJlICcuL2hlYWRlcidcblB1cmVSZW5kZXJNaXhpbiA9IHJlcXVpcmUgJ3JlYWN0LWFkZG9ucy1wdXJlLXJlbmRlci1taXhpbidcbntjb25uZWN0fSA9IHJlcXVpcmUgJ3JlYWN0LXJlZHV4J1xue2JpbmRBY3Rpb25DcmVhdG9yc30gPSByZXF1aXJlICdyZWR1eCdcbkFjdGlvbkNyZWF0b3JzID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9hY3Rpb25DcmVhdG9ycydcbnt0aW1lcn0gPSByZXF1aXJlICdkMydcbk1GRENoYXJ0ID0gcmVxdWlyZSAnLi9NRkRDaGFydCdcbkN1bUNoYXJ0ID0gcmVxdWlyZSAnLi9DdW1DaGFydCdcbkFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG5cdHJlbmRlcjogLT5cblx0XHR7YWN0aW9ucyx0cmF2ZWxpbmcsc2lnbmFscyxsb25nX21lbW9yeSwgbWZkLGN1bX0gPSB0aGlzLnByb3BzXG5cdFx0c2V0dGluZ3MgPSB7ayxjeWNsZSxncmVlbixvZmZzZXQsbnVtX3NpZ25hbHN9ID0gdGhpcy5wcm9wc1xuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiZGF0YS1sYXlvdXRcIjogJ2NvbHVtbicsIFwiaWRcIjogJ21haW4nfSxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiZGF0YS1mbGV4XCI6IHRydWUsIFwibGF5b3V0XCI6ICdyb3cnfSxcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiLCB7XCJmbGV4XCI6IHRydWUsIFwib25DbGlja1wiOiAodGhpcy5wYXVzZVBsYXkpfSwgXCJNb3ZlXCIpXG5cdFx0XHQpLFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChIZWFkZXIsIHtcImFjdGlvbnNcIjogKGFjdGlvbnMpLCBcInNldHRpbmdzXCI6IChzZXR0aW5ncyl9KSxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiZmxleFwiOiB0cnVlLCBcImRhdGEtbGF5b3V0XCI6ICdyb3cnfSxcblx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJkYXRhLWZsZXhcIjogdHJ1ZX0sXG5cdFx0XHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChSaW5nUm9hZCwge1wiY2Fyc1wiOiAodHJhdmVsaW5nKSwgXCJzaWduYWxzXCI6IChzaWduYWxzKX0pXG5cdFx0XHRcdCksXG5cdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiZGF0YS1mbGV4XCI6IHRydWV9LFxuXHRcdFx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoTUZEQ2hhcnQsIHtcImRhdGFcIjogKGxvbmdfbWVtb3J5KSwgXCJtZmRcIjogKG1mZCl9KVxuXHRcdFx0XHQpLFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcImRhdGEtZmxleFwiOiB0cnVlfSxcblx0XHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KEN1bUNoYXJ0LCB7XCJlblwiOiAoY3VtLkVOX21lbW9yeSksIFwiZXhcIjogKGN1bS5FWF9tZW1vcnkpfSlcblx0XHRcdFx0KVxuXHRcdFx0KVxuXHRcdClcblxuXHRwYXVzZVBsYXk6LT5cblx0XHRpZiB0aGlzLnByb3BzLnBhdXNlZFxuXHRcdFx0dGltZXIgPT5cblx0XHRcdFx0dGhpcy5wcm9wcy5hY3Rpb25zLnRpY2soKVxuXHRcdFx0XHR0aGlzLnByb3BzLnBhdXNlZFxuXHRcdHRoaXMucHJvcHMuYWN0aW9ucy5wYXVzZVBsYXkoKVxubWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKS0+XG5cdF8uYXNzaWduIHt9LCBzdGF0ZVxuXG5tYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpLT5cblx0e2FjdGlvbnM6IGJpbmRBY3Rpb25DcmVhdG9ycyhBY3Rpb25DcmVhdG9ycyxkaXNwYXRjaCl9XG5cbm1vZHVsZS5leHBvcnRzID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsbWFwRGlzcGF0Y2hUb1Byb3BzKShBcHApIiwiUmVhY3QgPSByZXF1aXJlICdyZWFjdCdcblB1cmVSZW5kZXJNaXhpbiA9IHJlcXVpcmUgJ3JlYWN0LWFkZG9ucy1wdXJlLXJlbmRlci1taXhpbidcblNsaWRlciA9IHJlcXVpcmUgJy4vc2xpZGVyJ1xuXG4jIyNcbnJlY2VpdmVzIFNTLCBhY3Rpb25zXG5cbiMjI1xuXG5IZWFkZXIgPSBSZWFjdC5jcmVhdGVDbGFzc1xuXHRyZW5kZXI6IC0+XG5cdFx0e251bV9zaWduYWxzLGdyZWVuLGN5Y2xlLGssb2Zmc2V0fSA9IHRoaXMucHJvcHMuc2V0dGluZ3Ncblx0XHRVVSA9IChhY3Rpb24sIGUpID0+IFxuXHRcdFx0dGhpcy5wcm9wcy5hY3Rpb25zW2FjdGlvbl0gK2UudGFyZ2V0LnZhbHVlXG5cdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJmbGV4XCI6IHRydWUsIFwibGF5b3V0XCI6ICdjb2x1bW4nfSxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2xpZGVyLCB7XCJ2YWx1ZVwiOiAobnVtX3NpZ25hbHMpLCBcIm1heFwiOiAnNDAnLCBcIm1pblwiOiAnMCcsIFwic3RlcFwiOiAnMScsIFwib25DaGFuZ2VcIjogKFVVLmJpbmQodGhpcywnc2V0TnVtU2lnbmFscycpKSwgXCJsYWJlbFwiOiAnbnVtYmVyIHNpZ25hbHMnfSksXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFNsaWRlciwge1widmFsdWVcIjogKG9mZnNldCksIFwibWF4XCI6ICczMCcsIFwibWluXCI6ICcwJywgXCJzdGVwXCI6ICcxJywgXCJvbkNoYW5nZVwiOiAoVVUuYmluZCh0aGlzLCdzZXRPZmZzZXQnKSksIFwibGFiZWxcIjogJ29mZnNldCd9KSxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2xpZGVyLCB7XCJ2YWx1ZVwiOiAoZ3JlZW4pLCBcIm1heFwiOiAnMjAwJywgXCJtaW5cIjogJzAnLCBcInN0ZXBcIjogJzEwJywgXCJvbkNoYW5nZVwiOiAoVVUuYmluZCh0aGlzLCdzZXRHcmVlbicpKSwgXCJsYWJlbFwiOiAnZ3JlZW4nfSksXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFNsaWRlciwge1widmFsdWVcIjogKGN5Y2xlKSwgXCJtYXhcIjogJzIwMCcsIFwibWluXCI6ICcwJywgXCJzdGVwXCI6ICcxMCcsIFwib25DaGFuZ2VcIjogKFVVLmJpbmQodGhpcywnc2V0Q3ljbGUnKSksIFwibGFiZWxcIjogJ2N5Y2xlJ30pXG5cdFx0KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlclxuIiwiUmVhY3QgPSByZXF1aXJlICdyZWFjdCdcblxuIyMjXG5yZWNlaXZlcyBsYWJlbCwgdmFsdWUsIG9uQ2hhbmdlLG1heCxtaW4sc3RlcFxuIyMjXG5cblxuU2xpZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Ncblx0cmVuZGVyOiAtPlxuXHRcdHt2YWx1ZSxsYWJlbCxvbkNoYW5nZSxtYXgsbWluLHN0ZXB9ID0gdGhpcy5wcm9wc1xuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1wiZmxleFwiOiB0cnVlfSxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCB7XCJ0eXBlXCI6IFwicmFuZ2VcIiwgXCJ2YWx1ZVwiOiAodmFsdWUpLCBcIm1heFwiOiAobWF4KSwgXCJtaW5cIjogKG1pbiksIFwic3RlcFwiOiAoc3RlcCksIFwib25DaGFuZ2VcIjogKG9uQ2hhbmdlKX0pLCBcIiBcIiwgKGxhYmVsKSwgXCI6XCIsICh2YWx1ZSlcblx0XHQpXG5cbm1vZHVsZS5leHBvcnRzID0gU2xpZGVyXG4iLCJNQVhfTUVNT1JZID0gM1xuTUVNT1JZX0ZSRVEgPSAxMDBcbk5VTV9DRUxMUyA9IDEwMDBcbkNPTE9SUyA9IFtcblx0JyMwM0E5RjQnXG5cdCcjRTkxRTYzJ1xuXHQnIzRDQUY1MCdcblx0JyNGRjU3MjInXG5dXG5cblEwID0gMS8zXG5LSiA9MSBcblZGID0gMVxuVyA9IDEvMlxubW9kdWxlLmV4cG9ydHMgPSB7TUFYX01FTU9SWSxNRU1PUllfRlJFUSxOVU1fQ0VMTFMsQ09MT1JTLFEwLCBLSixWRixXfSIsIntyZW5kZXJ9ID0gcmVxdWlyZSAncmVhY3QtZG9tJ1xuQXBwID0gcmVxdWlyZSAnLi9jb21wb25lbnRzL2FwcCdcbnN0b3JlID0gcmVxdWlyZSAnLi9zdG9yZXMvc3RvcmUnXG5SZWFjdCA9IHJlcXVpcmUgJ3JlYWN0J1xue1Byb3ZpZGVyfSA9IHJlcXVpcmUgJ3JlYWN0LXJlZHV4J1xuYWN0aW9ucyA9IHJlcXVpcmUgJy4vYWN0aW9ucy9hY3Rpb25DcmVhdG9ycydcblxucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHJvdmlkZXIsIHtcInN0b3JlXCI6IChzdG9yZSl9LCBSZWFjdC5jcmVhdGVFbGVtZW50KEFwcCwgbnVsbCkpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpXG5zdG9yZS5kaXNwYXRjaCBhY3Rpb25zLnNldE51bVNpZ25hbHMgMzBcblxuc3RvcmUuZGlzcGF0Y2giLCJJbW11dGFibGUgPSByZXF1aXJlICdpbW11dGFibGUnXG5fID0gcmVxdWlyZSAnbG9kYXNoJ1xue01BWF9NRU1PUlksTUVNT1JZX0ZSRVEsTlVNX0NFTExTfSA9IHJlcXVpcmUgJy4uL2NvbnN0YW50cy9jb25zdGFudHMnXG5cbm1lbW9yeVJlZHVjZSA9IChzaG9ydF9tZW1vcnksbG9uZ19tZW1vcnkscSxrLHRpbWUpLT5cblx0c2hvcnRfbWVtb3J5LnErPXFcblx0c2hvcnRfbWVtb3J5LmsrPWtcblxuXHRpZiAodGltZSVNRU1PUllfRlJFUSk9PTBcblx0XHRkZW5vbSA9IE1FTU9SWV9GUkVRKk5VTV9DRUxMU1xuXHRcdG5ld01lbW9yeSA9IFxuXHRcdFx0cTogc2hvcnRfbWVtb3J5LnEvZGVub21cblx0XHRcdGs6IHNob3J0X21lbW9yeS5rL2Rlbm9tXG5cdFx0XHRuYW1lOiBfLnVuaXF1ZUlkKClcblxuXHRcdCNpbmNvcnBvcmF0ZVxuXHRcdGxvbmdfbWVtb3J5ICA9IFtsb25nX21lbW9yeS4uLixuZXdNZW1vcnldXG5cblx0XHQjcmVzZXQgc2hvcnQgbWVtb3J5XG5cdFx0c2hvcnRfbWVtb3J5ID0gXG5cdFx0XHRxOiAwXG5cdFx0XHRrOjBcblx0XHQjbWFrZSBzdXJlIGl0J3Mgbm90IHRvbyBsb25nXG5cdFx0aWYgbG9uZ19tZW1vcnkubGVuZ3RoID4gTUFYX01FTU9SWVxuXHRcdFx0bG9uZ19tZW1vcnkgPSBfLmRyb3AgbG9uZ19tZW1vcnksMVxuXHRcdFx0XG5cdHtzaG9ydF9tZW1vcnksbG9uZ19tZW1vcnl9XG5cbm1vZHVsZS5leHBvcnRzID0gbWVtb3J5UmVkdWNlIiwiZDMgPSByZXF1aXJlICdkMydcbl8gPSByZXF1aXJlICdsb2Rhc2gnXG57VkYsUTAsS0osV30gPSByZXF1aXJlICcuLi9jb25zdGFudHMvY29uc3RhbnRzJ1xuXG5sb29wX292ZXJfZW50cmllcyA9IChkLGN5Y2xlLGdyZWVuLG9mZnNldCxkaXJlY3Rpb24pLT5cblx0W2cwLGcsaSxyZXNdID0gWzEwMDAsOTk5LDAsW11dXG5cdHdoaWxlIGc+MCBhbmQgTWF0aC5hYnMoaSk8MTAwXG5cdFx0ZW50cnkgPSBnZXRfZW50cnkgaSxkLGN5Y2xlLGdyZWVuLG9mZnNldFxuXHRcdGc9ZW50cnkuZ1xuXHRcdHJlcy5wdXNoIGVudHJ5XG5cdFx0aWYgZGlyZWN0aW9uIGlzICdmb3J3YXJkJyB0aGVuIGkrKyBlbHNlIGktLVxuXHRyZXNcblxuZ2V0X2VudHJ5ID0gKGksZCxjeWNsZSxncmVlbixvZmZzZXQpLT5cblx0diA9IGlmIGk8MCB0aGVuIC1XIGVsc2UgVkZcblx0eCA9IGQqaVxuXHR0dCA9IHgvdlxuXHRlID0gKHR0LWkqb2Zmc2V0KVxuXHQjIHMgPSBvZmZzZXQqaVxuXHQjIGEgPSBzLWN5Y2xlKk1hdGguZmxvb3Iocy9jeWNsZSlcblx0ZyA9IGdyZWVuLWVcblx0Z3JlZW4gPSBNYXRoLm1heCBnLDBcblx0dHIgPSBNYXRoLm1heCBjeWNsZS1lLDBcblx0dCA9IHR0K2N5Y2xlLWVcblx0YyA9IFEwKmdyZWVuICsgTWF0aC5tYXgoMCwteCpLSilcblx0e3QsYyx4LGd9XG5cbm1ha2VfdGFibGUgPShkLGN5Y2xlLGdyZWVuLG9mZnNldCkgLT5cblx0Zm9yd2FyZF9lbnRyaWVzID0gbG9vcF9vdmVyX2VudHJpZXMgZCxjeWNsZSxncmVlbixvZmZzZXQsJ2ZvcndhcmQnXG5cdGJhY2t3YXJkX2VudHJpZXMgPSBsb29wX292ZXJfZW50cmllcyBkLGN5Y2xlLGdyZWVuLG9mZnNldCwnYmFja3dhcmQnXG5cdFtmb3J3YXJkX2VudHJpZXMuLi4sYmFja3dhcmRfZW50cmllcy4uLl1cblxuZmluZF9taW4gPSAoayx0YWJsZSktPlxuXHRjb3N0cyA9ICgoZS5jK2UueCprKS9lLnQgZm9yIGUgaW4gdGFibGUpXG5cdHEgPSBfLm1pbiBbY29zdHMuLi4sKFZGKmspLChXKihLSi1rKSldXG5cdHtrLHF9XG5cbmZpbmRfbWZkID0gKHRhYmxlKS0+XG5cdChmaW5kX21pbiBrLHRhYmxlIGZvciBrIGluIF8ucmFuZ2UgMCwxLjAxLC4wMSlcblxuTUZEUmVkdWNlID0gKG1mZCxkLGN5Y2xlLGdyZWVuLG9mZnNldCktPlxuXHRmaW5kX21mZCBtYWtlX3RhYmxlIGQsY3ljbGUsZ3JlZW4sb2Zmc2V0XG5cbm1vZHVsZS5leHBvcnRzID0gTUZEUmVkdWNlIiwiSW1tdXRhYmxlID0gcmVxdWlyZSAnaW1tdXRhYmxlJ1xudHlwZXMgPSByZXF1aXJlICcuLi9hY3Rpb25zL2FjdGlvblR5cGVzJ1xuXyA9IHJlcXVpcmUgJ2xvZGFzaCdcbntOVU1fQ0VMTFMsIENPTE9SU30gPSByZXF1aXJlICcuLi9jb25zdGFudHMvY29uc3RhbnRzJ1xuI3JlZHVjZXIgZnVuY3Rpb25zXG5tZW1vcnlSZWR1Y2UgPSByZXF1aXJlICcuL21lbW9yeSdcbnRpY2tSZWR1Y2UgPSByZXF1aXJlICcuL3RpY2snXG5NRkRSZWR1Y2UgPSByZXF1aXJlICcuL21mZCdcbiN0ZW1wb3JhcnkgY29zbnRhbnRzXG5OVU1fQ0FSUyA9IDIwMDBcblJVU0hfTEVOR1RIID0gMzUwMFxuVFJJUF9MRU5HVEggPSAzMDBcblxuI2NyZWF0ZSB0aGUgY2Fyc1xud2FpdGluZyA9IF8ubWFwIFswLi4uTlVNX0NBUlNdLCAobiktPlxuXHRlbnRyeV90aW1lID0gUlVTSF9MRU5HVEgqbi9OVU1fQ0FSU1xuXHRlbnRyeV9sb2MgPSBfLnJhbmRvbSgwLE5VTV9DRUxMUylcblx0ZXhpdF9sb2MgPSAoZW50cnlfbG9jK1RSSVBfTEVOR1RIKSVOVU1fQ0VMTFNcblx0bmFtZSA9IF8udW5pcXVlSWQoKVxuXHRtb3ZlZCA9IHRydWVcblx0ZmlsbCA9IF8uc2FtcGxlIENPTE9SU1xuXHRsb2MgPSBlbnRyeV9sb2Ncblx0ZXhpdGVkID0gZmFsc2Vcblx0e2VudHJ5X3RpbWUsbmFtZSxsb2MsbW92ZWQsZmlsbCxleGl0ZWQsZW50cnlfbG9jLGV4aXRfbG9jfVxuXG5pbml0aWFsU3RhdGUgPSBcblx0cGF1c2VkOiB0cnVlXG5cdHRpbWU6IDBcblx0c2hvcnRfbWVtb3J5OiB7cTogMCwgazowIH1cblx0bG9uZ19tZW1vcnk6IFtdXG5cdHRyYXZlbGluZzogW11cblx0Y3VtOiB7RU46IDAsIEVYOjAsIEVOX21lbW9yeTpbXSwgRVhfbWVtb3J5OiBbXX1cblx0d2FpdGluZzogd2FpdGluZ1xuXHRzaWduYWxzOiBbXVxuXHRjeWNsZTogMTAwXG5cdGdyZWVuOiA1MFxuXHRvZmZzZXQ6IDBcblx0bnVtX3NpZ25hbHM6IDVcblx0ZDogMTAwMC81XG5cdGNlbGxzOiAoMTAwIGZvciBbMC4uLjEwMDBdKVxuXHRtZmQ6IFtdXG5cblJvb3RSZWR1Y2UgPSAoc3RhdGU9aW5pdGlhbFN0YXRlLCBhY3Rpb24pLT5cblx0e3dhaXRpbmcsdHJhdmVsaW5nLHNpZ25hbHMsdGltZSxjZWxscyxwYXVzZWQsbG9uZ19tZW1vcnksc2hvcnRfbWVtb3J5LG1mZCxjeWNsZSxvZmZzZXQsZ3JlZW4sZCxudW1fc2lnbmFscyxjdW19ID0gc3RhdGVcblxuXHRzd2l0Y2ggYWN0aW9uLnR5cGVcblx0XHR3aGVuIHR5cGVzLlNFVF9HUkVFTlxuXHRcdFx0Z3JlZW4gPSBhY3Rpb24uZ3JlZW5cblx0XHRcdG1mZCA9IE1GRFJlZHVjZSBtZmQsZCxjeWNsZSxncmVlbixvZmZzZXRcblx0XHR3aGVuIHR5cGVzLlNFVF9DWUNMRVxuXHRcdFx0Y3ljbGUgPSBhY3Rpb24uY3ljbGVcblx0XHRcdG1mZCA9IE1GRFJlZHVjZSBtZmQsZCxjeWNsZSxncmVlbixvZmZzZXRcblx0XHR3aGVuIHR5cGVzLlNFVF9PRkZTRVRcblx0XHRcdG9mZnNldCA9ICAxL251bV9zaWduYWxzICogTWF0aC5yb3VuZCggYWN0aW9uLm9mZnNldCpudW1fc2lnbmFscylcblx0XHRcdG1mZCA9IE1GRFJlZHVjZSBtZmQsZCxjeWNsZSxncmVlbixvZmZzZXRcblx0XHR3aGVuIHR5cGVzLlNFVF9OVU1fU0lHTkFMUyBcblx0XHRcdG4gPSBudW1fc2lnbmFscyA9IGFjdGlvbi5udW1fc2lnbmFsc1xuXHRcdFx0ZCA9IE5VTV9DRUxMUy9uXG5cdFx0XHRvZmZzZXQgPSAxL24gKiBNYXRoLnJvdW5kIG9mZnNldCpuXG5cdFx0XHRzaWduYWxzID0gXy5tYXAgWzAuLi5udW1fc2lnbmFsc10sKGkpLT5cblx0XHRcdFx0cmVzID0gXG5cdFx0XHRcdFx0bG9jOiBNYXRoLmZsb29yKGkvbnVtX3NpZ25hbHMqTlVNX0NFTExTKVxuXHRcdFx0XHRcdG5hbWU6IF8udW5pcXVlSWQoKVxuXHRcdFx0XHRcdGdyZWVuOiB0cnVlXG5cdFx0XHRtZmQgPSBNRkRSZWR1Y2UgbWZkLGQsY3ljbGUsZ3JlZW4sb2Zmc2V0XG5cdFx0d2hlbiB0eXBlcy5USUNLXG5cdFx0XHRmb3IgaSBpbiBbMC4uLjVdXG5cdFx0XHRcdHRpbWUgPSB0aW1lKzFcblx0XHRcdFx0e3RyYXZlbGluZyx3YWl0aW5nLHNpZ25hbHMsY2VsbHMscSxrLG51bV9lbnRlcmVkLG51bV9leGl0ZWR9ID0gdGlja1JlZHVjZSggdHJhdmVsaW5nLHdhaXRpbmcsc2lnbmFscyxjZWxscyx0aW1lLG9mZnNldCxjeWNsZSxncmVlbilcblx0XHRcdFx0e2xvbmdfbWVtb3J5LHNob3J0X21lbW9yeX0gPSBtZW1vcnlSZWR1Y2UoIHNob3J0X21lbW9yeSxsb25nX21lbW9yeSxxLGssdGltZSlcblx0XHRcdFx0Y3VtLkVOKz1udW1fZW50ZXJlZFxuXHRcdFx0XHRjdW0uRVgrPW51bV9leGl0ZWRcblx0XHRcdFx0Y3VtLkVOX21lbW9yeS5wdXNoIHt0aW1lLHZhbDogY3VtLkVOfVxuXHRcdFx0XHRjdW0uRVhfbWVtb3J5LnB1c2gge3RpbWUsdmFsOiBjdW0uRVh9XG5cdFx0d2hlbiB0eXBlcy5QQVVTRV9QTEFZXG5cdFx0XHRwYXVzZWQgPSAhcGF1c2VkXG5cblx0e3dhaXRpbmcsY3VtLHRyYXZlbGluZyxzaWduYWxzLHRpbWUsY2VsbHMscGF1c2VkLGxvbmdfbWVtb3J5LHNob3J0X21lbW9yeSxtZmQsY3ljbGUsb2Zmc2V0LGdyZWVuLGQsbnVtX3NpZ25hbHMsY3VtfVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJvb3RSZWR1Y2UiLCJ7TlVNX0NFTExTLFd9ID0gcmVxdWlyZSAnLi4vY29uc3RhbnRzL2NvbnN0YW50cydcbl8gPSByZXF1aXJlICdsb2Rhc2gnXG50aWNrUmVkdWNlID0gKHRyYXZlbGluZyx3YWl0aW5nLHNpZ25hbHMsY2VsbHMsdGltZSxvZmZzZXQsY3ljbGUsZ3JlZW4pLT5cblx0cSA9IDBcblx0I2NlbGxzXG5cdGNlbGxzID0gKGMrMSBmb3IgYyBpbiBjZWxscylcblx0Xy5mb3JFYWNoIHRyYXZlbGluZywgKGNhciktPiBjZWxsc1tjYXIubG9jXSA9IDBcblxuXHQjY2FycyBhcnJpdmUgYW5kIGdldCByZW1vdmVkIGZyb20gd2FpdGluZ1xuXHRhcnJpdmFscyA9IF8uZmlsdGVyIHdhaXRpbmcsIChjYXIpLT4gXG5cdFx0ZW50cnlfbG9jID0gY2FyLmVudHJ5X2xvY1xuXHRcdGlmIGNhci5lbnRyeV90aW1lPD10aW1lIGFuZCBjZWxsc1tlbnRyeV9sb2NdPjBcblx0XHRcdHErK1xuXHRcdFx0Y2VsbHNbZW50cnlfbG9jXSA9IDBcblx0XHRcdHRydWVcblx0XHRlbHNlXG5cdFx0XHRmYWxzZVxuXG5cdHdhaXRpbmcgPSBfLndpdGhvdXQgd2FpdGluZyxhcnJpdmFscy4uLlxuXG5cdCNmaW5kIHJlZCBsaWdodHNcblx0c2lnbmFscyA9IF8ubWFwIHNpZ25hbHMsIChzaWduYWwsaSktPlxuXHRcdHRpbWVfaW5fY3ljbGUgPSAodGltZS1pKm9mZnNldCklJWN5Y2xlXG5cdFx0Xy5hc3NpZ24ge30sIHNpZ25hbCx7Z3JlZW46KHRpbWVfaW5fY3ljbGU8PWdyZWVuKX1cblx0cmVkcyA9IEFycmF5IE5VTV9DRUxMU1xuXHRfLmZvckVhY2ggc2lnbmFscywgKHNpZ25hbCktPiByZWRzW3NpZ25hbC5sb2NdPSFzaWduYWwuZ3JlZW5cblxuXHQjbW92ZSB0cmF2ZWxpbmdcblx0c3BhY2UgPSAxL1dcblx0bnVtX2V4aXRlZCA9IDBcblx0dHJhdmVsaW5nID0gXy5tYXAgdHJhdmVsaW5nLCAoY2FyLGkpLT5cblx0XHRsb2NfbmV4dCA9IChjYXIubG9jKzEpJU5VTV9DRUxMU1xuXHRcdGlmIGNlbGxzW2xvY19uZXh0XT49c3BhY2UgYW5kICFyZWRzW2xvY19uZXh0XVxuXHRcdFx0cSsrXG5cdFx0XHRleGl0ZWQgPSBjYXIubG9jIGlzIGNhci5leGl0X2xvY1xuXHRcdFx0aWYgZXhpdGVkIHRoZW4gbnVtX2V4aXRlZCsrXG5cdFx0XHRfLmFzc2lnbiB7fSxjYXIse2xvYzogbG9jX25leHQsZXhpdGVkfVxuXHRcdGVsc2Vcblx0XHRcdGNhclxuXG5cdGsgPSB0cmF2ZWxpbmcubGVuZ3RoXG5cdHRyYXZlbGluZyA9IF8uZmlsdGVyIHRyYXZlbGluZywgKGNhciktPiAhY2FyLmV4aXRlZFxuXG5cdCNhZGQgYXJyaXZhbHMgdG8gdHJhdmVsaW5nXG5cdHRyYXZlbGluZyA9IFt0cmF2ZWxpbmcuLi4sYXJyaXZhbHMuLi5dXG5cdG51bV9lbnRlcmVkID0gYXJyaXZhbHMubGVuZ3RoXG5cdHt0cmF2ZWxpbmcsd2FpdGluZyxjZWxscyxzaWduYWxzLHEsayxudW1fZW50ZXJlZCxudW1fZXhpdGVkfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRpY2tSZWR1Y2UiLCJ7Y3JlYXRlU3RvcmV9ID0gcmVxdWlyZSAncmVkdXgnXG5yb290ID0gcmVxdWlyZSAnLi4vcmVkdWNlcnMvcm9vdCdcbiMgcHV0IHRoZSBpbml0aWFsIHN0YXRlIGluIGhlcmUhXG5zdG9yZSA9IGNyZWF0ZVN0b3JlIHJvb3Rcbm1vZHVsZS5leHBvcnRzID0gc3RvcmUiXX0=
