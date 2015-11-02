(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var types;

types = require('./actionTypes');

module.exports = {
  setEntries: function(entries) {
    return {
      type: types.SET_ENTRIES,
      entries: entries
    };
  }
};


},{"./actionTypes":2}],2:[function(require,module,exports){
module.exports = {
  SET_ENTRIES: 'SET_ENTRIES'
};


},{}],3:[function(require,module,exports){
var ActionCreators, App, Equation, Matrix, Plot, React, assign, bindActionCreators, connect, mapDispatchToProps, mapStateToProps;

React = require('react');

Matrix = require('./matrix');

Plot = require('./plot');

Equation = require('./equation');

App = React.createClass({displayName: "App",
  render: function() {
    return React.createElement("div", null, React.createElement(Matrix, {
      "setEntries": this.props.actions.setEntries
    }), React.createElement(Plot, {
      "entries": this.props.entries
    }));
  }
});

assign = require('lodash').assign;

connect = require('react-redux').connect;

bindActionCreators = require('redux').bindActionCreators;

ActionCreators = require('../actions/actionCreators');

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


},{"../actions/actionCreators":1,"./equation":4,"./matrix":5,"./plot":6,"lodash":undefined,"react":undefined,"react-redux":undefined,"redux":undefined}],4:[function(require,module,exports){
var Equation, React;

React = require('react');

Equation = React.createClass({displayName: "Equation",
  render: function() {
    var A, asdf;
    A = this.props.entries;
    return asdf = "\gamma * " + A[0][0];
  }
});

module.exports = Equation;


},{"react":undefined}],5:[function(require,module,exports){
var Matrix, React, d3, local_entries, matrix;

React = require('react');

d3 = require('d3');

local_entries = [[1, 0], [0, 1]];

matrix = new d3.svg.matrix().data(local_entries).mapping([["a", "b"], ["b", "c"]]).cellWidth(40).cellHeight(40).margin([10, 10]);

Matrix = React.createClass({displayName: "Matrix",
  componentDidMount: function() {
    matrix.update(d3.select(this.refs.mainGroup));
    return matrix.on('change', (function(_this) {
      return function() {
        return _this.props.setEntries(local_entries);
      };
    })(this));
  },
  render: function() {
    var entries;
    entries = this.props.entries;
    return React.createElement("svg", {
      "width": '100%',
      "height": '200px'
    }, React.createElement("g", {
      "transform": 'translate(20,30)',
      "ref": 'mainGroup'
    }));
  }
});

module.exports = Matrix;


},{"d3":undefined,"react":undefined}],6:[function(require,module,exports){
var Plot, React, d3, entries;

React = require('react');

d3 = require('d3');

entries = [];

Plot = React.createClass({displayName: "Plot",
  componentDidMount: function() {
    var area, camera, mathbox, r, three, view;
    mathbox = mathBox({
      element: this.refs.plot,
      plugins: ['core', 'cursor', 'controls'],
      controls: {
        klass: THREE.OrbitControls
      }
    });
    three = mathbox.three;
    three.renderer.setClearColor(new THREE.Color(0xffffff), 1.0);
    mathbox.set({
      scale: 720,
      focus: 3
    });
    camera = mathbox.camera({
      proxy: true,
      position: [0, -1.0, 1.1]
    });
    view = mathbox.cartesian({
      range: [[-10, 10], [-10, 10], [-10, 15]],
      scale: [1, 1, 1]
    });
    view.axis({
      axis: 1,
      width: 2
    });
    view.axis({
      axis: 2,
      width: 2
    });
    view.axis({
      axis: 3,
      width: 2
    });
    view.grid({
      width: 1,
      divideX: 20,
      divideY: 20,
      opacity: 1
    });
    r = 3;
    area = view.area({
      id: "main",
      width: 20,
      height: 20,
      axes: [0, 2],
      rangeX: [-r, r],
      rangeY: [-r, r],
      expr: function(emit, x, y, i, j, time, delta) {
        var a, b, c, z;
        if (entries.length === 0) {
          return;
        }
        a = entries[0][0];
        b = entries[0][1];
        c = entries[1][1];
        z = (a * x * x + 2 * b * x * y + c * y * y) * 0.2;
        return emit(x, y, z);
      },
      channels: 3
    });
    area.shader({
      code: "#plot-vertex-xyz"
    }).vertex({
      pass: 'data'
    }).shader({
      code: "#plot-fragment-shader"
    }).fragment({
      gamma: true
    }).surface({
      fill: true,
      lineX: false,
      lineY: false,
      width: 1,
      zBias: 1
    });
    return area.surface({
      fill: false,
      lineX: true,
      lineY: true,
      width: 1.5,
      zBias: 1,
      color: "#c6cfd1",
      width: 0.5,
      opacity: 1
    });
  },
  render: function() {
    entries = this.props.entries;
    return React.createElement("div", null, React.createElement("div", {
      "ref": 'plot',
      "id": 'plot'
    }));
  }
});

module.exports = Plot;


},{"d3":undefined,"react":undefined}],7:[function(require,module,exports){
var d3 = require('d3')
d3.layout.matrix = matrixLayout;
d3.svg.matrix = matrixComponent;

function matrixComponent() {
    var g;
    var data = [
        []
    ];
    var mapping = [
        []
    ];
    var nodes = [];
    var layout = d3.layout.matrix();
    var margin = layout.margin();
    var cellWidth = layout.cellWidth();
    var cellHeight = layout.cellHeight();
    /*
    TODO
      make scrubbing configurable, per-cell
    */
    var dispatch = d3.dispatch("change")

    this.update = function(group) {
        if (group) g = group;
        nodes = layout.nodes(data);

        var line = d3.svg.line()
            .x(function(d) {
                return d[0]
            })
            .y(function(d) {
                return d[1]
            })

        var brackets = g.selectAll("path.bracket")
            .data([1, -1])
        brackets.enter().append("path").classed("bracket", true)
            .attr("d", function(d) {
                var nRows = data.length;
                var x0 = d * cellWidth / 4;
                var x1 = -margin[0] / 2;
                var y0 = -margin[1] / 2;
                var y1 = (cellHeight + margin[1]) * nRows - margin[1] / 2
                if (d === 1) {
                    return line([
                        [x0, y0],
                        [x1, y0],
                        [x1, y1],
                        [x0, y1]
                    ])
                } else {
                    var dx = (cellWidth + margin[0]) * data[0].length - margin[0] / 2
                    x0 -= margin[0] / 2
                    return line([
                        [x0 + dx, y0],
                        [dx, y0],
                        [dx, y1],
                        [x0 + dx, y1]
                    ])
                }
            }).attr({
                stroke: "#111",
                fill: "none"
            })

        var cells = g.selectAll("g.number").data(nodes)
        var enter = cells.enter().append("g").classed("number", true)

        enter.append("rect").classed("bg", true)
        cells.select("rect.bg")
            .attr({
                width: cellWidth,
                height: cellHeight,
                x: function(d) {
                    return d.x
                },
                y: function(d) {
                    return d.y
                },
                fill: "#fff"
            })
        enter.append("text")
        cells.select("text").attr({
            x: function(d) {
                return d.x + cellWidth / 2
            },
            y: function(d) {
                return d.y + cellHeight / 2
            },
            "alignment-baseline": "middle",
            "text-anchor": "middle",
            "line-height": cellHeight,
            "fill": "#091242"
        }).text(function(d) {
            return d.data
        })

        var step = 0.1;
        var that = this;
        var drag = d3.behavior.drag()
            .on("drag", function(d) {
                var oldData = d.data;
                var val = d.data + d3.event.dx * step
                val = +(Math.round(val * 10) / 10).toFixed(1)
                set(val, d.i, d.j);
                //data[d.i][d.j] = val;
                that.update()
                dispatch.change(d, oldData)
            })
        cells.call(drag)

        return this;
    }

    function set(val, i, j) {
        var m = mapping[i][j];
        if (m) {
            mapping.forEach(function(row, mi) {
                row.forEach(function(col, mj) {
                    if (col === m) {
                        data[mi][mj] = val;
                    }
                })
            })
        }
        data[i][j] = val;
    }
    this.mapping = function(val) {
        if (val) {
            // TODO make sure dims match
            mapping = val;
            return this;
        }
        return mapping;
    }

    this.data = function(val) {
        if (val) {
            data = val;
            nodes = layout.nodes(data);
            return this;
        }
        return data;
    }

    this.margin = function(val) {
        if (val) {
            margin = val;
            layout.margin(margin);
            return this;
        }
        return margin;
    }

    this.cellWidth = function(val) {
        if (val) {
            cellWidth = val;
            layout.cellWidth(cellWidth);
            return this;
        }
        return cellWidth;
    }
    this.cellHeight = function(val) {
        if (val) {
            cellHeight = val;
            layout.cellHeight(cellHeight);
            return this;
        }
        return cellHeight;
    }

    d3.rebind(this, dispatch, "on")
    return this;

}

function matrixLayout() {
    /*
      We accept our matrix data as a list of rows:
      [ [a, b],
        [c, d] ]
    */
    var data = [
        []
    ];
    var nodes;
    var margin = [0, 0];
    var cellWidth = 20;
    var cellHeight = 20;
    var nRows;

    function getX(i) {
        return i * (cellWidth + margin[0])
    }

    function getY(j) {
        return j * (cellHeight + margin[1])
    }

    function newNodes() {
        nRows = data.length;
        nodes = [];
        data.forEach(function(rows, i) {
            rows.forEach(function(col, j) {
                var node = {
                    x: getX(j),
                    y: getY(i),
                    data: col,
                    i: i,
                    j: j,
                    index: i * nRows + j
                }
                nodes.push(node);
            })
        })
    }

    function calculate() {
        nRows = data.length;
        data.forEach(function(rows, i) {
            rows.forEach(function(col, j) {
                var node = nodes[i * nRows + j];
                if (!node) return;

                node.data = col;
                node.x = getX(j);
                node.y = getY(i);
            })
        })
    }

    this.nodes = function(val) {
        if (val) {
            this.data(val);
        }
        return nodes;
    }

    this.data = function(val) {
        if (val) {
            if (val.length === data.length && val[0].length === data[0].length) {
                // if the same size matrix is being updated, 
                // just update the values by reference
                // the positions shouldn't change
                data = val;
                calculate();
            } else {
                data = val;
                newNodes();
            }
            nRows = data.length;
            return this;
        }
        return data;
    }

    this.margin = function(val) {
        if (val) {
            margin = val;
            calculate();
            return this;
        }
        return margin;
    }

    this.cellWidth = function(val) {
        if (val) {
            cellWidth = val;
            calculate();
            return this;
        }
        return cellWidth;
    }
    this.cellHeight = function(val) {
        if (val) {
            cellHeight = val
            calculate();
            return this;
        }
        return cellHeight;
    }

    return this;
}

},{"d3":undefined}],8:[function(require,module,exports){
var App, Provider, React, createStore, render, root, store;

require('./d3-matrix.js');

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


},{"./components/app":3,"./d3-matrix.js":7,"./reducers/root":9,"react":undefined,"react-dom":undefined,"react-redux":undefined,"redux":undefined}],9:[function(require,module,exports){
var Immutable, RootReduce, _, initialState, types;

Immutable = require('immutable');

types = require('../actions/actionTypes');

_ = require('lodash');

initialState = {
  entries: [[1, 0], [0, 1]]
};

RootReduce = function(state, action) {
  var entries;
  if (state == null) {
    state = initialState;
  }
  entries = state.entries;
  switch (action.type) {
    case types.SET_ENTRIES:
      entries = action.entries;
  }
  return {
    entries: entries
  };
};

module.exports = RootReduce;


},{"../actions/actionTypes":2,"immutable":undefined,"lodash":undefined}]},{},[8])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZW5qYWxvdC9jb2RlL3NldG9zYS9wb3NkZWYvYXBwL2FjdGlvbnMvYWN0aW9uQ3JlYXRvcnMuY29mZmVlIiwiL1VzZXJzL2VuamFsb3QvY29kZS9zZXRvc2EvcG9zZGVmL2FwcC9hY3Rpb25zL2FjdGlvblR5cGVzLmNvZmZlZSIsIi9Vc2Vycy9lbmphbG90L2NvZGUvc2V0b3NhL3Bvc2RlZi9hcHAvY29tcG9uZW50cy9hcHAuY2pzeCIsIi9Vc2Vycy9lbmphbG90L2NvZGUvc2V0b3NhL3Bvc2RlZi9hcHAvY29tcG9uZW50cy9lcXVhdGlvbi5janN4IiwiL1VzZXJzL2VuamFsb3QvY29kZS9zZXRvc2EvcG9zZGVmL2FwcC9jb21wb25lbnRzL21hdHJpeC5janN4IiwiL1VzZXJzL2VuamFsb3QvY29kZS9zZXRvc2EvcG9zZGVmL2FwcC9jb21wb25lbnRzL3Bsb3QuY2pzeCIsImFwcC9kMy1tYXRyaXguanMiLCIvVXNlcnMvZW5qYWxvdC9jb2RlL3NldG9zYS9wb3NkZWYvYXBwL2luZGV4LmNqc3giLCIvVXNlcnMvZW5qYWxvdC9jb2RlL3NldG9zYS9wb3NkZWYvYXBwL3JlZHVjZXJzL3Jvb3QuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLGVBQVI7O0FBRVIsTUFBTSxDQUFDLE9BQVAsR0FDQztFQUFBLFVBQUEsRUFBWSxTQUFDLE9BQUQ7V0FDWDtNQUFDLElBQUEsRUFBTSxLQUFLLENBQUMsV0FBYjtNQUEwQixTQUFBLE9BQTFCOztFQURXLENBQVo7Ozs7O0FDSEQsTUFBTSxDQUFDLE9BQVAsR0FDQztFQUFBLFdBQUEsRUFBYSxhQUFiOzs7OztBQ0FELElBQUE7O0FBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxPQUFSOztBQUNSLE1BQUEsR0FBUyxPQUFBLENBQVEsVUFBUjs7QUFDVCxJQUFBLEdBQU8sT0FBQSxDQUFRLFFBQVI7O0FBQ1AsUUFBQSxHQUFXLE9BQUEsQ0FBUSxZQUFSOztBQUNYLEdBQUEsR0FBTSxLQUFLLENBQUMsV0FBTixDQUNMO0VBQUEsTUFBQSxFQUFRLFNBQUE7V0FDUCxLQUFLLENBQUMsYUFBTixDQUFvQixLQUFwQixFQUEyQixJQUEzQixFQUNDLEtBQUssQ0FBQyxhQUFOLENBQW9CLE1BQXBCLEVBQTRCO01BQUMsWUFBQSxFQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQW5DO0tBQTVCLENBREQsRUFFQyxLQUFLLENBQUMsYUFBTixDQUFvQixJQUFwQixFQUEwQjtNQUFDLFNBQUEsRUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQXhCO0tBQTFCLENBRkQ7RUFETyxDQUFSO0NBREs7O0FBUUwsU0FBVSxPQUFBLENBQVEsUUFBUixFQUFWOztBQUVBLFVBQVcsT0FBQSxDQUFRLGFBQVIsRUFBWDs7QUFDQSxxQkFBc0IsT0FBQSxDQUFRLE9BQVIsRUFBdEI7O0FBQ0QsY0FBQSxHQUFpQixPQUFBLENBQVEsMkJBQVI7O0FBRWpCLGVBQUEsR0FBa0IsU0FBQyxLQUFEO1NBQ2pCLE1BQUEsQ0FBTyxFQUFQLEVBQVcsS0FBWDtBQURpQjs7QUFHbEIsa0JBQUEsR0FBcUIsU0FBQyxRQUFEO0FBQ3BCLE1BQUE7U0FBQSxHQUFBLEdBQ0M7SUFBQSxPQUFBLEVBQVMsa0JBQUEsQ0FBbUIsY0FBbkIsRUFBa0MsUUFBbEMsQ0FBVDs7QUFGbUI7O0FBS3JCLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLE9BQUEsQ0FBUSxlQUFSLEVBQXdCLGtCQUF4QixDQUFBLENBQTRDLEdBQTVDOzs7O0FDM0JqQixJQUFBOztBQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsT0FBUjs7QUFFUixRQUFBLEdBQVcsS0FBSyxDQUFDLFdBQU4sQ0FDVjtFQUFBLE1BQUEsRUFBUSxTQUFBO0FBQ1AsUUFBQTtJQUFBLENBQUEsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1dBQ2YsSUFBQSxHQUFPLFdBQUEsR0FBWSxDQUFFLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQTtFQUZqQixDQUFSO0NBRFU7O0FBUVgsTUFBTSxDQUFDLE9BQVAsR0FBaUI7Ozs7QUNWakIsSUFBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVI7O0FBQ1IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSOztBQUVMLGFBQUEsR0FBZ0IsQ0FDZixDQUFDLENBQUQsRUFBRyxDQUFILENBRGUsRUFFZixDQUFDLENBQUQsRUFBRyxDQUFILENBRmU7O0FBS2hCLE1BQUEsR0FBYSxJQUFBLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBUCxDQUFBLENBQ1gsQ0FBQyxJQURVLENBQ0wsYUFESyxDQUVYLENBQUMsT0FGVSxDQUVGLENBQ1AsQ0FBQyxHQUFELEVBQU0sR0FBTixDQURPLEVBRVAsQ0FBQyxHQUFELEVBQU0sR0FBTixDQUZPLENBRkUsQ0FNWCxDQUFDLFNBTlUsQ0FNQSxFQU5BLENBT1gsQ0FBQyxVQVBVLENBT0MsRUFQRCxDQVFYLENBQUMsTUFSVSxDQVFILENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FSRzs7QUFVYixNQUFBLEdBQVMsS0FBSyxDQUFDLFdBQU4sQ0FDUjtFQUFBLGlCQUFBLEVBQWtCLFNBQUE7SUFDakIsTUFBTSxDQUFDLE1BQVAsQ0FBYyxFQUFFLENBQUMsTUFBSCxDQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBcEIsQ0FBZDtXQUNBLE1BQU0sQ0FBQyxFQUFQLENBQVUsUUFBVixFQUFvQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUE7ZUFDbkIsS0FBSSxDQUFDLEtBQUssQ0FBQyxVQUFYLENBQXNCLGFBQXRCO01BRG1CO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFwQjtFQUZpQixDQUFsQjtFQUtBLE1BQUEsRUFBUSxTQUFBO0FBQ1AsUUFBQTtJQUFDLFVBQVcsSUFBSSxDQUFDLE1BQWhCO1dBQ0QsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkI7TUFBQyxPQUFBLEVBQVMsTUFBVjtNQUFrQixRQUFBLEVBQVUsT0FBNUI7S0FBM0IsRUFDQyxLQUFLLENBQUMsYUFBTixDQUFvQixHQUFwQixFQUF5QjtNQUFDLFdBQUEsRUFBYSxrQkFBZDtNQUFrQyxLQUFBLEVBQU8sV0FBekM7S0FBekIsQ0FERDtFQUZPLENBTFI7Q0FEUTs7QUFZVCxNQUFNLENBQUMsT0FBUCxHQUFpQjs7OztBQzlCakIsSUFBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVI7O0FBQ1IsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSOztBQUVMLE9BQUEsR0FBVTs7QUFFVixJQUFBLEdBQU8sS0FBSyxDQUFDLFdBQU4sQ0FDTjtFQUFBLGlCQUFBLEVBQWtCLFNBQUE7QUFDakIsUUFBQTtJQUFBLE9BQUEsR0FBVSxPQUFBLENBQ1Q7TUFBQSxPQUFBLEVBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFuQjtNQUNBLE9BQUEsRUFBUyxDQUFDLE1BQUQsRUFBUyxRQUFULEVBQW1CLFVBQW5CLENBRFQ7TUFFQSxRQUFBLEVBQ0M7UUFBQSxLQUFBLEVBQU8sS0FBSyxDQUFDLGFBQWI7T0FIRDtLQURTO0lBT1YsS0FBQSxHQUFRLE9BQU8sQ0FBQztJQUNoQixLQUFLLENBQUMsUUFBUSxDQUFDLGFBQWYsQ0FBaUMsSUFBQSxLQUFLLENBQUMsS0FBTixDQUFZLFFBQVosQ0FBakMsRUFBd0QsR0FBeEQ7SUFHQSxPQUFPLENBQUMsR0FBUixDQUFZO01BQUUsS0FBQSxFQUFPLEdBQVQ7TUFBYyxLQUFBLEVBQU8sQ0FBckI7S0FBWjtJQUNBLE1BQUEsR0FBUyxPQUFPLENBQUMsTUFBUixDQUFlO01BQUUsS0FBQSxFQUFPLElBQVQ7TUFBZSxRQUFBLEVBQVUsQ0FBQyxDQUFELEVBQUksQ0FBQyxHQUFMLEVBQVMsR0FBVCxDQUF6QjtLQUFmO0lBR1QsSUFBQSxHQUFPLE9BQ04sQ0FBQyxTQURLLENBQ0s7TUFDVixLQUFBLEVBQU8sQ0FBQyxDQUFDLENBQUMsRUFBRixFQUFNLEVBQU4sQ0FBRCxFQUFZLENBQUMsQ0FBQyxFQUFGLEVBQU0sRUFBTixDQUFaLEVBQXVCLENBQUMsQ0FBQyxFQUFGLEVBQU0sRUFBTixDQUF2QixDQURHO01BRVYsS0FBQSxFQUFPLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLENBRkc7S0FETDtJQU9QLElBQUksQ0FBQyxJQUFMLENBQVU7TUFBRSxJQUFBLEVBQU0sQ0FBUjtNQUFXLEtBQUEsRUFBTyxDQUFsQjtLQUFWO0lBQ0EsSUFBSSxDQUFDLElBQUwsQ0FBVTtNQUFFLElBQUEsRUFBTSxDQUFSO01BQVcsS0FBQSxFQUFPLENBQWxCO0tBQVY7SUFDQSxJQUFJLENBQUMsSUFBTCxDQUFVO01BQUUsSUFBQSxFQUFNLENBQVI7TUFBVyxLQUFBLEVBQU8sQ0FBbEI7S0FBVjtJQUNBLElBQUksQ0FBQyxJQUFMLENBQVU7TUFBRSxLQUFBLEVBQU8sQ0FBVDtNQUFZLE9BQUEsRUFBUyxFQUFyQjtNQUF5QixPQUFBLEVBQVMsRUFBbEM7TUFBc0MsT0FBQSxFQUFRLENBQTlDO0tBQVY7SUFFQSxDQUFBLEdBQUk7SUFFSixJQUFBLEdBQU8sSUFBSSxDQUFDLElBQUwsQ0FDTjtNQUFBLEVBQUEsRUFBSSxNQUFKO01BQ0EsS0FBQSxFQUFPLEVBRFA7TUFFQSxNQUFBLEVBQVEsRUFGUjtNQUdBLElBQUEsRUFBTSxDQUFDLENBQUQsRUFBSSxDQUFKLENBSE47TUFJQSxNQUFBLEVBQVEsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFMLENBSlI7TUFLQSxNQUFBLEVBQVEsQ0FBQyxDQUFDLENBQUYsRUFBSyxDQUFMLENBTFI7TUFNQSxJQUFBLEVBQU0sU0FBQyxJQUFELEVBQU8sQ0FBUCxFQUFVLENBQVYsRUFBYSxDQUFiLEVBQWdCLENBQWhCLEVBQW1CLElBQW5CLEVBQXlCLEtBQXpCO0FBQ0wsWUFBQTtRQUFBLElBQUcsT0FBTyxDQUFDLE1BQVIsS0FBa0IsQ0FBckI7QUFBNEIsaUJBQTVCOztRQUNBLENBQUEsR0FBSSxPQUFRLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQTtRQUNmLENBQUEsR0FBSSxPQUFRLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQTtRQUNmLENBQUEsR0FBSSxPQUFRLENBQUEsQ0FBQSxDQUFHLENBQUEsQ0FBQTtRQUNmLENBQUEsR0FBSSxDQUFDLENBQUEsR0FBSSxDQUFKLEdBQU0sQ0FBTixHQUFVLENBQUEsR0FBRSxDQUFGLEdBQUksQ0FBSixHQUFNLENBQWhCLEdBQW9CLENBQUEsR0FBSSxDQUFKLEdBQU0sQ0FBM0IsQ0FBQSxHQUFnQztlQUNwQyxJQUFBLENBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFUO01BTkssQ0FOTjtNQWFBLFFBQUEsRUFBUyxDQWJUO0tBRE07SUFnQlAsSUFBSSxDQUFDLE1BQUwsQ0FBWTtNQUFFLElBQUEsRUFBTSxrQkFBUjtLQUFaLENBQ0UsQ0FBQyxNQURILENBQ1U7TUFBRSxJQUFBLEVBQU0sTUFBUjtLQURWLENBRUUsQ0FBQyxNQUZILENBRVU7TUFBRSxJQUFBLEVBQU0sdUJBQVI7S0FGVixDQUdBLENBQUMsUUFIRCxDQUdVO01BQUMsS0FBQSxFQUFPLElBQVI7S0FIVixDQUlFLENBQUMsT0FKSCxDQUlXO01BQ1AsSUFBQSxFQUFNLElBREM7TUFFUCxLQUFBLEVBQU8sS0FGQTtNQUdQLEtBQUEsRUFBTyxLQUhBO01BSVAsS0FBQSxFQUFPLENBSkE7TUFLUCxLQUFBLEVBQU8sQ0FMQTtLQUpYO1dBWUEsSUFBSSxDQUFDLE9BQUwsQ0FDSTtNQUFBLElBQUEsRUFBTSxLQUFOO01BQ0EsS0FBQSxFQUFPLElBRFA7TUFFQSxLQUFBLEVBQU8sSUFGUDtNQUdBLEtBQUEsRUFBTyxHQUhQO01BSUEsS0FBQSxFQUFPLENBSlA7TUFLQSxLQUFBLEVBQU8sU0FMUDtNQU1BLEtBQUEsRUFBTyxHQU5QO01BT0EsT0FBQSxFQUFTLENBUFQ7S0FESjtFQTFEaUIsQ0FBbEI7RUFvRUEsTUFBQSxFQUFRLFNBQUE7SUFDUCxPQUFBLEdBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUNyQixXQUNDLEtBQUssQ0FBQyxhQUFOLENBQW9CLEtBQXBCLEVBQTJCLElBQTNCLEVBQ0MsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsS0FBcEIsRUFBMkI7TUFBQyxLQUFBLEVBQU8sTUFBUjtNQUFnQixJQUFBLEVBQU0sTUFBdEI7S0FBM0IsQ0FERDtFQUhNLENBcEVSO0NBRE07O0FBNkVQLE1BQU0sQ0FBQyxPQUFQLEdBQWlCOzs7O0FDbEZqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1UkEsSUFBQTs7QUFBQSxPQUFBLENBQVEsZ0JBQVI7O0FBRUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxPQUFSOztBQUNQLGNBQWUsT0FBQSxDQUFRLE9BQVIsRUFBZjs7QUFDRCxJQUFBLEdBQU8sT0FBQSxDQUFRLGlCQUFSOztBQUNQLEtBQUEsR0FBUSxXQUFBLENBQVksSUFBWjs7QUFHUCxTQUFVLE9BQUEsQ0FBUSxXQUFSLEVBQVY7O0FBQ0QsR0FBQSxHQUFNLE9BQUEsQ0FBUSxrQkFBUjs7QUFDTCxXQUFZLE9BQUEsQ0FBUSxhQUFSLEVBQVo7O0FBQ0QsTUFBQSxDQUFPLEtBQUssQ0FBQyxhQUFOLENBQW9CLFFBQXBCLEVBQThCO0VBQUMsT0FBQSxFQUFVLEtBQVg7Q0FBOUIsRUFBa0QsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsR0FBcEIsRUFBeUIsSUFBekIsQ0FBbEQsQ0FBUCxFQUEwRixRQUFRLENBQUMsY0FBVCxDQUF3QixLQUF4QixDQUExRjs7OztBQ1pBLElBQUE7O0FBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxXQUFSOztBQUNaLEtBQUEsR0FBUSxPQUFBLENBQVEsd0JBQVI7O0FBQ1IsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSOztBQUtKLFlBQUEsR0FDQztFQUFBLE9BQUEsRUFBUyxDQUFDLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBRCxFQUFPLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBUCxDQUFUOzs7QUFFRCxVQUFBLEdBQWEsU0FBQyxLQUFELEVBQXFCLE1BQXJCO0FBQ1osTUFBQTs7SUFEYSxRQUFNOztFQUNsQixVQUFXLE1BQVg7QUFDRCxVQUFPLE1BQU0sQ0FBQyxJQUFkO0FBQUEsU0FDTSxLQUFLLENBQUMsV0FEWjtNQUVFLE9BQUEsR0FBVSxNQUFNLENBQUM7QUFGbkI7U0FHQTtJQUFDLFNBQUEsT0FBRDs7QUFMWTs7QUFPYixNQUFNLENBQUMsT0FBUCxHQUFpQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ0eXBlcyA9IHJlcXVpcmUgJy4vYWN0aW9uVHlwZXMnXG5cbm1vZHVsZS5leHBvcnRzID0gXG5cdHNldEVudHJpZXM6IChlbnRyaWVzKS0+XG5cdFx0e3R5cGU6IHR5cGVzLlNFVF9FTlRSSUVTLCBlbnRyaWVzfVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcblx0U0VUX0VOVFJJRVM6ICdTRVRfRU5UUklFUydcbiIsIiNNQUtFIFRIRSBNQUlOIENPTVBPTkVOVFxuUmVhY3QgPSByZXF1aXJlICdyZWFjdCdcbk1hdHJpeCA9IHJlcXVpcmUgJy4vbWF0cml4J1xuUGxvdCA9IHJlcXVpcmUgJy4vcGxvdCdcbkVxdWF0aW9uID0gcmVxdWlyZSAnLi9lcXVhdGlvbidcbkFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG5cdHJlbmRlcjogLT5cblx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIG51bGwsXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KE1hdHJpeCwge1wic2V0RW50cmllc1wiOiAodGhpcy5wcm9wcy5hY3Rpb25zLnNldEVudHJpZXMpfSksXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFBsb3QsIHtcImVudHJpZXNcIjogKHRoaXMucHJvcHMuZW50cmllcyl9KSBcblx0XHQpXG5cbiNXSVJFIFRISU5HUyBVUCBGT1JFIFJFRFVYXG57YXNzaWdufSA9IHJlcXVpcmUgJ2xvZGFzaCdcblx0XHRcdCMgPEVxdWF0aW9uIGVudHJpZXM9e3RoaXMucHJvcHMuZW50cmllc30vPlxue2Nvbm5lY3R9ID0gcmVxdWlyZSAncmVhY3QtcmVkdXgnXG57YmluZEFjdGlvbkNyZWF0b3JzfSA9IHJlcXVpcmUgJ3JlZHV4J1xuQWN0aW9uQ3JlYXRvcnMgPSByZXF1aXJlICcuLi9hY3Rpb25zL2FjdGlvbkNyZWF0b3JzJ1xuXG5tYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGUpLT5cblx0YXNzaWduIHt9LCBzdGF0ZVxuXG5tYXBEaXNwYXRjaFRvUHJvcHMgPSAoZGlzcGF0Y2gpLT5cblx0cmVzID0gXG5cdFx0YWN0aW9uczogYmluZEFjdGlvbkNyZWF0b3JzIEFjdGlvbkNyZWF0b3JzLGRpc3BhdGNoXG5cbiNFWFBPUlQgSVRcbm1vZHVsZS5leHBvcnRzID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsbWFwRGlzcGF0Y2hUb1Byb3BzKShBcHApIiwiUmVhY3QgPSByZXF1aXJlICdyZWFjdCdcblxuRXF1YXRpb24gPSBSZWFjdC5jcmVhdGVDbGFzc1xuXHRyZW5kZXI6IC0+XG5cdFx0QSA9IHRoaXMucHJvcHMuZW50cmllc1xuXHRcdGFzZGYgPSBcIlxcZ2FtbWEgKiAje0FbMF1bMF19XCJcblx0XHQjIGNvbnNvbGUubG9nIGFzZGZcblxuXHRcdCMgPGRpdiByZWY9J2VxJz48L2Rpdj5cblxubW9kdWxlLmV4cG9ydHMgPSBFcXVhdGlvblxuIiwiUmVhY3QgPSByZXF1aXJlICdyZWFjdCdcbmQzID0gcmVxdWlyZSAnZDMnXG5cbmxvY2FsX2VudHJpZXMgPSBbXG5cdFsxLDBdLFxuXHRbMCwxXVxuXVxuXG5tYXRyaXggPSBuZXcgZDMuc3ZnLm1hdHJpeCgpXG5cdFx0LmRhdGEgbG9jYWxfZW50cmllc1xuXHRcdC5tYXBwaW5nKFtcblx0XHRcdFx0W1wiYVwiLCBcImJcIl0sXG5cdFx0XHRcdFtcImJcIiwgXCJjXCJdXG5cdFx0XSlcblx0XHQuY2VsbFdpZHRoKDQwKVxuXHRcdC5jZWxsSGVpZ2h0KDQwKVxuXHRcdC5tYXJnaW4oWzEwLCAxMF0pXG5cbk1hdHJpeCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG5cdGNvbXBvbmVudERpZE1vdW50Oi0+XG5cdFx0bWF0cml4LnVwZGF0ZSBkMy5zZWxlY3QgdGhpcy5yZWZzLm1haW5Hcm91cFxuXHRcdG1hdHJpeC5vbiAnY2hhbmdlJywgPT5cblx0XHRcdHRoaXMucHJvcHMuc2V0RW50cmllcyBsb2NhbF9lbnRyaWVzXG5cblx0cmVuZGVyOiAtPlxuXHRcdHtlbnRyaWVzfSA9IHRoaXMucHJvcHNcblx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwic3ZnXCIsIHtcIndpZHRoXCI6ICcxMDAlJywgXCJoZWlnaHRcIjogJzIwMHB4J30sXG5cdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiZ1wiLCB7XCJ0cmFuc2Zvcm1cIjogJ3RyYW5zbGF0ZSgyMCwzMCknLCBcInJlZlwiOiAnbWFpbkdyb3VwJ30pXG5cdFx0KVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hdHJpeFxuIiwiUmVhY3QgPSByZXF1aXJlICdyZWFjdCdcbmQzID0gcmVxdWlyZSAnZDMnXG5cbmVudHJpZXMgPSBbXVxuXG5QbG90ID0gUmVhY3QuY3JlYXRlQ2xhc3Ncblx0Y29tcG9uZW50RGlkTW91bnQ6LT5cblx0XHRtYXRoYm94ID0gbWF0aEJveFxuXHRcdFx0ZWxlbWVudDogdGhpcy5yZWZzLnBsb3Rcblx0XHRcdHBsdWdpbnM6IFsnY29yZScsICdjdXJzb3InLCAnY29udHJvbHMnXVxuXHRcdFx0Y29udHJvbHM6XG5cdFx0XHRcdGtsYXNzOiBUSFJFRS5PcmJpdENvbnRyb2xzXG5cblx0XHQjIC8vIFNldCByZW5kZXJlciBiYWNrZ3JvdW5kXG5cdFx0dGhyZWUgPSBtYXRoYm94LnRocmVlXG5cdFx0dGhyZWUucmVuZGVyZXIuc2V0Q2xlYXJDb2xvcihuZXcgVEhSRUUuQ29sb3IoMHhmZmZmZmYpLCAxLjApXG5cblx0XHQjIC8vIFNldCBtYXRoYm94IHVuaXRzIGFuZCBwbGFjZSBjYW1lcmFcblx0XHRtYXRoYm94LnNldCh7IHNjYWxlOiA3MjAsIGZvY3VzOiAzIH0pXG5cdFx0Y2FtZXJhID0gbWF0aGJveC5jYW1lcmEoeyBwcm94eTogdHJ1ZSwgcG9zaXRpb246IFswLCAtMS4wLDEuMV0gfSlcblxuXHRcdCMgLy8gQ3JlYXRlIGNhcnRlc2lhbiB2aWV3XG5cdFx0dmlldyA9IG1hdGhib3hcblx0XHRcdC5jYXJ0ZXNpYW4oe1xuXHRcdFx0XHRyYW5nZTogW1stMTAsIDEwXSwgWy0xMCwgMTBdLCBbLTEwLCAxNV1dLFxuXHRcdFx0XHRzY2FsZTogWzEsMSwxXSxcblx0XHRcdH0pXG5cblx0XHQjIC8vIDJEIGF4ZXMgLyBncmlkXG5cdFx0dmlldy5heGlzKHsgYXhpczogMSwgd2lkdGg6IDIgfSlcblx0XHR2aWV3LmF4aXMoeyBheGlzOiAyLCB3aWR0aDogMiB9KVxuXHRcdHZpZXcuYXhpcyh7IGF4aXM6IDMsIHdpZHRoOiAyIH0pXG5cdFx0dmlldy5ncmlkKHsgd2lkdGg6IDEsIGRpdmlkZVg6IDIwLCBkaXZpZGVZOiAyMCwgb3BhY2l0eToxIH0pXG5cblx0XHRyID0gM1xuXG5cdFx0YXJlYSA9IHZpZXcuYXJlYVxuXHRcdFx0aWQ6IFwibWFpblwiXG5cdFx0XHR3aWR0aDogMjBcblx0XHRcdGhlaWdodDogMjBcblx0XHRcdGF4ZXM6IFswLCAyXVxuXHRcdFx0cmFuZ2VYOiBbLXIsIHJdXG5cdFx0XHRyYW5nZVk6IFstciwgcl1cblx0XHRcdGV4cHI6IChlbWl0LCB4LCB5LCBpLCBqLCB0aW1lLCBkZWx0YSkgLT5cblx0XHRcdFx0aWYgZW50cmllcy5sZW5ndGggPT0gMCB0aGVuIHJldHVyblxuXHRcdFx0XHRhID0gZW50cmllc1swXVswXVxuXHRcdFx0XHRiID0gZW50cmllc1swXVsxXVxuXHRcdFx0XHRjID0gZW50cmllc1sxXVsxXVxuXHRcdFx0XHR6ID0gKGEgKiB4KnggKyAyKmIqeCp5ICsgYyAqIHkqeSkgKiAwLjJcblx0XHRcdFx0ZW1pdCB4LHkselxuXHRcdFx0Y2hhbm5lbHM6M1xuXG5cdFx0YXJlYS5zaGFkZXIoeyBjb2RlOiBcIiNwbG90LXZlcnRleC14eXpcIiB9KVxuICAgIC52ZXJ0ZXgoeyBwYXNzOiAnZGF0YScgfSlcbiAgICAuc2hhZGVyKHsgY29kZTogXCIjcGxvdC1mcmFnbWVudC1zaGFkZXJcIiB9KVxuXHRcdC5mcmFnbWVudCh7Z2FtbWE6IHRydWUgfSlcbiAgICAuc3VyZmFjZSh7XG4gICAgICBmaWxsOiB0cnVlLFxuICAgICAgbGluZVg6IGZhbHNlLFxuICAgICAgbGluZVk6IGZhbHNlLFxuICAgICAgd2lkdGg6IDEsXG4gICAgICB6QmlhczogMSxcbiAgICB9KVxuXG5cdFx0YXJlYS5zdXJmYWNlXG4gICAgICBmaWxsOiBmYWxzZVxuICAgICAgbGluZVg6IHRydWVcbiAgICAgIGxpbmVZOiB0cnVlXG4gICAgICB3aWR0aDogMS41XG4gICAgICB6QmlhczogMVxuICAgICAgY29sb3I6IFwiI2M2Y2ZkMVwiXG4gICAgICB3aWR0aDogMC41XG4gICAgICBvcGFjaXR5OiAxXG5cblx0cmVuZGVyOiAtPlxuXHRcdGVudHJpZXMgPSB0aGlzLnByb3BzLmVudHJpZXNcblx0XHRyZXR1cm4gKFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuXHRcdFx0XHRSZWFjdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcInJlZlwiOiAncGxvdCcsIFwiaWRcIjogJ3Bsb3QnfSlcblx0XHRcdClcblx0XHRcdClcblxubW9kdWxlLmV4cG9ydHMgPSBQbG90XG4iLCJ2YXIgZDMgPSByZXF1aXJlKCdkMycpXG5kMy5sYXlvdXQubWF0cml4ID0gbWF0cml4TGF5b3V0O1xuZDMuc3ZnLm1hdHJpeCA9IG1hdHJpeENvbXBvbmVudDtcblxuZnVuY3Rpb24gbWF0cml4Q29tcG9uZW50KCkge1xuICAgIHZhciBnO1xuICAgIHZhciBkYXRhID0gW1xuICAgICAgICBbXVxuICAgIF07XG4gICAgdmFyIG1hcHBpbmcgPSBbXG4gICAgICAgIFtdXG4gICAgXTtcbiAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICB2YXIgbGF5b3V0ID0gZDMubGF5b3V0Lm1hdHJpeCgpO1xuICAgIHZhciBtYXJnaW4gPSBsYXlvdXQubWFyZ2luKCk7XG4gICAgdmFyIGNlbGxXaWR0aCA9IGxheW91dC5jZWxsV2lkdGgoKTtcbiAgICB2YXIgY2VsbEhlaWdodCA9IGxheW91dC5jZWxsSGVpZ2h0KCk7XG4gICAgLypcbiAgICBUT0RPXG4gICAgICBtYWtlIHNjcnViYmluZyBjb25maWd1cmFibGUsIHBlci1jZWxsXG4gICAgKi9cbiAgICB2YXIgZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaChcImNoYW5nZVwiKVxuXG4gICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbihncm91cCkge1xuICAgICAgICBpZiAoZ3JvdXApIGcgPSBncm91cDtcbiAgICAgICAgbm9kZXMgPSBsYXlvdXQubm9kZXMoZGF0YSk7XG5cbiAgICAgICAgdmFyIGxpbmUgPSBkMy5zdmcubGluZSgpXG4gICAgICAgICAgICAueChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRbMF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAueShmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRbMV1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgdmFyIGJyYWNrZXRzID0gZy5zZWxlY3RBbGwoXCJwYXRoLmJyYWNrZXRcIilcbiAgICAgICAgICAgIC5kYXRhKFsxLCAtMV0pXG4gICAgICAgIGJyYWNrZXRzLmVudGVyKCkuYXBwZW5kKFwicGF0aFwiKS5jbGFzc2VkKFwiYnJhY2tldFwiLCB0cnVlKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgblJvd3MgPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgeDAgPSBkICogY2VsbFdpZHRoIC8gNDtcbiAgICAgICAgICAgICAgICB2YXIgeDEgPSAtbWFyZ2luWzBdIC8gMjtcbiAgICAgICAgICAgICAgICB2YXIgeTAgPSAtbWFyZ2luWzFdIC8gMjtcbiAgICAgICAgICAgICAgICB2YXIgeTEgPSAoY2VsbEhlaWdodCArIG1hcmdpblsxXSkgKiBuUm93cyAtIG1hcmdpblsxXSAvIDJcbiAgICAgICAgICAgICAgICBpZiAoZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGluZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBbeDAsIHkwXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt4MSwgeTBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3gxLCB5MV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbeDAsIHkxXVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkeCA9IChjZWxsV2lkdGggKyBtYXJnaW5bMF0pICogZGF0YVswXS5sZW5ndGggLSBtYXJnaW5bMF0gLyAyXG4gICAgICAgICAgICAgICAgICAgIHgwIC09IG1hcmdpblswXSAvIDJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpbmUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgW3gwICsgZHgsIHkwXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkeCwgeTBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2R4LCB5MV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbeDAgKyBkeCwgeTFdXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuYXR0cih7XG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMxMTFcIixcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIlxuICAgICAgICAgICAgfSlcblxuICAgICAgICB2YXIgY2VsbHMgPSBnLnNlbGVjdEFsbChcImcubnVtYmVyXCIpLmRhdGEobm9kZXMpXG4gICAgICAgIHZhciBlbnRlciA9IGNlbGxzLmVudGVyKCkuYXBwZW5kKFwiZ1wiKS5jbGFzc2VkKFwibnVtYmVyXCIsIHRydWUpXG5cbiAgICAgICAgZW50ZXIuYXBwZW5kKFwicmVjdFwiKS5jbGFzc2VkKFwiYmdcIiwgdHJ1ZSlcbiAgICAgICAgY2VsbHMuc2VsZWN0KFwicmVjdC5iZ1wiKVxuICAgICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgICAgIHdpZHRoOiBjZWxsV2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBjZWxsSGVpZ2h0LFxuICAgICAgICAgICAgICAgIHg6IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQueFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeTogZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC55XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmaWxsOiBcIiNmZmZcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgZW50ZXIuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICBjZWxscy5zZWxlY3QoXCJ0ZXh0XCIpLmF0dHIoe1xuICAgICAgICAgICAgeDogZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnggKyBjZWxsV2lkdGggLyAyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeTogZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnkgKyBjZWxsSGVpZ2h0IC8gMlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWxpZ25tZW50LWJhc2VsaW5lXCI6IFwibWlkZGxlXCIsXG4gICAgICAgICAgICBcInRleHQtYW5jaG9yXCI6IFwibWlkZGxlXCIsXG4gICAgICAgICAgICBcImxpbmUtaGVpZ2h0XCI6IGNlbGxIZWlnaHQsXG4gICAgICAgICAgICBcImZpbGxcIjogXCIjMDkxMjQyXCJcbiAgICAgICAgfSkudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5kYXRhXG4gICAgICAgIH0pXG5cbiAgICAgICAgdmFyIHN0ZXAgPSAwLjE7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIGRyYWcgPSBkMy5iZWhhdmlvci5kcmFnKClcbiAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHZhciBvbGREYXRhID0gZC5kYXRhO1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkLmRhdGEgKyBkMy5ldmVudC5keCAqIHN0ZXBcbiAgICAgICAgICAgICAgICB2YWwgPSArKE1hdGgucm91bmQodmFsICogMTApIC8gMTApLnRvRml4ZWQoMSlcbiAgICAgICAgICAgICAgICBzZXQodmFsLCBkLmksIGQuaik7XG4gICAgICAgICAgICAgICAgLy9kYXRhW2QuaV1bZC5qXSA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZSgpXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2guY2hhbmdlKGQsIG9sZERhdGEpXG4gICAgICAgICAgICB9KVxuICAgICAgICBjZWxscy5jYWxsKGRyYWcpXG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0KHZhbCwgaSwgaikge1xuICAgICAgICB2YXIgbSA9IG1hcHBpbmdbaV1bal07XG4gICAgICAgIGlmIChtKSB7XG4gICAgICAgICAgICBtYXBwaW5nLmZvckVhY2goZnVuY3Rpb24ocm93LCBtaSkge1xuICAgICAgICAgICAgICAgIHJvdy5mb3JFYWNoKGZ1bmN0aW9uKGNvbCwgbWopIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbCA9PT0gbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVttaV1bbWpdID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtpXVtqXSA9IHZhbDtcbiAgICB9XG4gICAgdGhpcy5tYXBwaW5nID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIC8vIFRPRE8gbWFrZSBzdXJlIGRpbXMgbWF0Y2hcbiAgICAgICAgICAgIG1hcHBpbmcgPSB2YWw7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwcGluZztcbiAgICB9XG5cbiAgICB0aGlzLmRhdGEgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgZGF0YSA9IHZhbDtcbiAgICAgICAgICAgIG5vZGVzID0gbGF5b3V0Lm5vZGVzKGRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgdGhpcy5tYXJnaW4gPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgbWFyZ2luID0gdmFsO1xuICAgICAgICAgICAgbGF5b3V0Lm1hcmdpbihtYXJnaW4pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcmdpbjtcbiAgICB9XG5cbiAgICB0aGlzLmNlbGxXaWR0aCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICBjZWxsV2lkdGggPSB2YWw7XG4gICAgICAgICAgICBsYXlvdXQuY2VsbFdpZHRoKGNlbGxXaWR0aCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2VsbFdpZHRoO1xuICAgIH1cbiAgICB0aGlzLmNlbGxIZWlnaHQgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgY2VsbEhlaWdodCA9IHZhbDtcbiAgICAgICAgICAgIGxheW91dC5jZWxsSGVpZ2h0KGNlbGxIZWlnaHQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNlbGxIZWlnaHQ7XG4gICAgfVxuXG4gICAgZDMucmViaW5kKHRoaXMsIGRpc3BhdGNoLCBcIm9uXCIpXG4gICAgcmV0dXJuIHRoaXM7XG5cbn1cblxuZnVuY3Rpb24gbWF0cml4TGF5b3V0KCkge1xuICAgIC8qXG4gICAgICBXZSBhY2NlcHQgb3VyIG1hdHJpeCBkYXRhIGFzIGEgbGlzdCBvZiByb3dzOlxuICAgICAgWyBbYSwgYl0sXG4gICAgICAgIFtjLCBkXSBdXG4gICAgKi9cbiAgICB2YXIgZGF0YSA9IFtcbiAgICAgICAgW11cbiAgICBdO1xuICAgIHZhciBub2RlcztcbiAgICB2YXIgbWFyZ2luID0gWzAsIDBdO1xuICAgIHZhciBjZWxsV2lkdGggPSAyMDtcbiAgICB2YXIgY2VsbEhlaWdodCA9IDIwO1xuICAgIHZhciBuUm93cztcblxuICAgIGZ1bmN0aW9uIGdldFgoaSkge1xuICAgICAgICByZXR1cm4gaSAqIChjZWxsV2lkdGggKyBtYXJnaW5bMF0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0WShqKSB7XG4gICAgICAgIHJldHVybiBqICogKGNlbGxIZWlnaHQgKyBtYXJnaW5bMV0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmV3Tm9kZXMoKSB7XG4gICAgICAgIG5Sb3dzID0gZGF0YS5sZW5ndGg7XG4gICAgICAgIG5vZGVzID0gW107XG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbihyb3dzLCBpKSB7XG4gICAgICAgICAgICByb3dzLmZvckVhY2goZnVuY3Rpb24oY29sLCBqKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGdldFgoaiksXG4gICAgICAgICAgICAgICAgICAgIHk6IGdldFkoaSksXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGNvbCxcbiAgICAgICAgICAgICAgICAgICAgaTogaSxcbiAgICAgICAgICAgICAgICAgICAgajogaixcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGkgKiBuUm93cyArIGpcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlKCkge1xuICAgICAgICBuUm93cyA9IGRhdGEubGVuZ3RoO1xuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24ocm93cywgaSkge1xuICAgICAgICAgICAgcm93cy5mb3JFYWNoKGZ1bmN0aW9uKGNvbCwgaikge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gbm9kZXNbaSAqIG5Sb3dzICsgal07XG4gICAgICAgICAgICAgICAgaWYgKCFub2RlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBub2RlLmRhdGEgPSBjb2w7XG4gICAgICAgICAgICAgICAgbm9kZS54ID0gZ2V0WChqKTtcbiAgICAgICAgICAgICAgICBub2RlLnkgPSBnZXRZKGkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLm5vZGVzID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSh2YWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICB9XG5cbiAgICB0aGlzLmRhdGEgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbC5sZW5ndGggPT09IGRhdGEubGVuZ3RoICYmIHZhbFswXS5sZW5ndGggPT09IGRhdGFbMF0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHNhbWUgc2l6ZSBtYXRyaXggaXMgYmVpbmcgdXBkYXRlZCwgXG4gICAgICAgICAgICAgICAgLy8ganVzdCB1cGRhdGUgdGhlIHZhbHVlcyBieSByZWZlcmVuY2VcbiAgICAgICAgICAgICAgICAvLyB0aGUgcG9zaXRpb25zIHNob3VsZG4ndCBjaGFuZ2VcbiAgICAgICAgICAgICAgICBkYXRhID0gdmFsO1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gdmFsO1xuICAgICAgICAgICAgICAgIG5ld05vZGVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuUm93cyA9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgdGhpcy5tYXJnaW4gPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgbWFyZ2luID0gdmFsO1xuICAgICAgICAgICAgY2FsY3VsYXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFyZ2luO1xuICAgIH1cblxuICAgIHRoaXMuY2VsbFdpZHRoID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIGNlbGxXaWR0aCA9IHZhbDtcbiAgICAgICAgICAgIGNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNlbGxXaWR0aDtcbiAgICB9XG4gICAgdGhpcy5jZWxsSGVpZ2h0ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIGNlbGxIZWlnaHQgPSB2YWxcbiAgICAgICAgICAgIGNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNlbGxIZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG59XG4iLCIjYWRkIGVuamFsb3QncyBtYXRyaXggdGhpbmdcbnJlcXVpcmUgJy4vZDMtbWF0cml4LmpzJ1xuI21ha2UgdGhlIHN0b3JlXG5SZWFjdCA9IHJlcXVpcmUgJ3JlYWN0J1xue2NyZWF0ZVN0b3JlfSA9IHJlcXVpcmUgJ3JlZHV4J1xucm9vdCA9IHJlcXVpcmUgJy4vcmVkdWNlcnMvcm9vdCdcbnN0b3JlID0gY3JlYXRlU3RvcmUgcm9vdFxuXG4jcmlnIHVwIHRoZSBhcHBcbntyZW5kZXJ9ID0gcmVxdWlyZSAncmVhY3QtZG9tJ1xuQXBwID0gcmVxdWlyZSAnLi9jb21wb25lbnRzL2FwcCdcbntQcm92aWRlcn0gPSByZXF1aXJlICdyZWFjdC1yZWR1eCdcbnJlbmRlcihSZWFjdC5jcmVhdGVFbGVtZW50KFByb3ZpZGVyLCB7XCJzdG9yZVwiOiAoc3RvcmUpfSwgUmVhY3QuY3JlYXRlRWxlbWVudChBcHAsIG51bGwpKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKVxuIiwiSW1tdXRhYmxlID0gcmVxdWlyZSAnaW1tdXRhYmxlJ1xudHlwZXMgPSByZXF1aXJlICcuLi9hY3Rpb25zL2FjdGlvblR5cGVzJ1xuXyA9IHJlcXVpcmUgJ2xvZGFzaCdcblxuI3JlZHVjZXIgZnVuY3Rpb25zXG4jdGVtcG9yYXJ5IGNvc250YW50c1xuXG5pbml0aWFsU3RhdGUgPSBcblx0ZW50cmllczogW1sxLDBdLFswLDFdXVxuXG5Sb290UmVkdWNlID0gKHN0YXRlPWluaXRpYWxTdGF0ZSwgYWN0aW9uKS0+XG5cdHtlbnRyaWVzfSA9IHN0YXRlXG5cdHN3aXRjaCBhY3Rpb24udHlwZVxuXHRcdHdoZW4gdHlwZXMuU0VUX0VOVFJJRVNcblx0XHRcdGVudHJpZXMgPSBhY3Rpb24uZW50cmllc1xuXHR7ZW50cmllc31cblxubW9kdWxlLmV4cG9ydHMgPSBSb290UmVkdWNlIl19
