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
    return area.surface({
      shaded: true,
      lineX: true,
      lineY: true,
      color: "#51e4ff",
      width: 0.5,
      opacity: 1
    });
  },
  render: function() {
    entries = this.props.entries;
    return React.createElement("div", {
      "ref": 'plot',
      "id": 'plot'
    });
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvcG9zZGVmL2FwcC9hY3Rpb25zL2FjdGlvbkNyZWF0b3JzLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9wb3NkZWYvYXBwL2FjdGlvbnMvYWN0aW9uVHlwZXMuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3Bvc2RlZi9hcHAvY29tcG9uZW50cy9hcHAuY2pzeCIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9wb3NkZWYvYXBwL2NvbXBvbmVudHMvZXF1YXRpb24uY2pzeCIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9wb3NkZWYvYXBwL2NvbXBvbmVudHMvbWF0cml4LmNqc3giLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvcG9zZGVmL2FwcC9jb21wb25lbnRzL3Bsb3QuY2pzeCIsImFwcC9kMy1tYXRyaXguanMiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvcG9zZGVmL2FwcC9pbmRleC5janN4IiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3Bvc2RlZi9hcHAvcmVkdWNlcnMvcm9vdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBOztBQUFBLEtBQUEsR0FBUSxPQUFBLENBQVEsZUFBUjs7QUFFUixNQUFNLENBQUMsT0FBUCxHQUNDO0VBQUEsVUFBQSxFQUFZLFNBQUMsT0FBRDtXQUNYO01BQUMsSUFBQSxFQUFNLEtBQUssQ0FBQyxXQUFiO01BQTBCLFNBQUEsT0FBMUI7O0VBRFcsQ0FBWjs7Ozs7QUNIRCxNQUFNLENBQUMsT0FBUCxHQUNDO0VBQUEsV0FBQSxFQUFhLGFBQWI7Ozs7O0FDQUQsSUFBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVI7O0FBQ1IsTUFBQSxHQUFTLE9BQUEsQ0FBUSxVQUFSOztBQUNULElBQUEsR0FBTyxPQUFBLENBQVEsUUFBUjs7QUFDUCxRQUFBLEdBQVcsT0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVJBLElBQUE7O0FBQUEsT0FBQSxDQUFRLGdCQUFSOztBQUVBLEtBQUEsR0FBUSxPQUFBLENBQVEsT0FBUjs7QUFDUCxjQUFlLE9BQUEsQ0FBUSxPQUFSLEVBQWY7O0FBQ0QsSUFBQSxHQUFPLE9BQUEsQ0FBUSxpQkFBUjs7QUFDUCxLQUFBLEdBQVEsV0FBQSxDQUFZLElBQVo7O0FBR1AsU0FBVSxPQUFBLENBQVEsV0FBUixFQUFWOztBQUNELEdBQUEsR0FBTSxPQUFBLENBQVEsa0JBQVI7O0FBQ0wsV0FBWSxPQUFBLENBQVEsYUFBUixFQUFaOztBQUNELE1BQUEsQ0FBTyxLQUFLLENBQUMsYUFBTixDQUFvQixRQUFwQixFQUE4QjtFQUFDLE9BQUEsRUFBVSxLQUFYO0NBQTlCLEVBQWtELEtBQUssQ0FBQyxhQUFOLENBQW9CLEdBQXBCLEVBQXlCLElBQXpCLENBQWxELENBQVAsRUFBMEYsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBMUY7Ozs7QUNaQSxJQUFBOztBQUFBLFNBQUEsR0FBWSxPQUFBLENBQVEsV0FBUjs7QUFDWixLQUFBLEdBQVEsT0FBQSxDQUFRLHdCQUFSOztBQUNSLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFLSixZQUFBLEdBQ0M7RUFBQSxPQUFBLEVBQVMsQ0FBQyxDQUFDLENBQUQsRUFBRyxDQUFILENBQUQsRUFBTyxDQUFDLENBQUQsRUFBRyxDQUFILENBQVAsQ0FBVDs7O0FBRUQsVUFBQSxHQUFhLFNBQUMsS0FBRCxFQUFxQixNQUFyQjtBQUNaLE1BQUE7O0lBRGEsUUFBTTs7RUFDbEIsVUFBVyxNQUFYO0FBQ0QsVUFBTyxNQUFNLENBQUMsSUFBZDtBQUFBLFNBQ00sS0FBSyxDQUFDLFdBRFo7TUFFRSxPQUFBLEdBQVUsTUFBTSxDQUFDO0FBRm5CO1NBR0E7SUFBQyxTQUFBLE9BQUQ7O0FBTFk7O0FBT2IsTUFBTSxDQUFDLE9BQVAsR0FBaUIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidHlwZXMgPSByZXF1aXJlICcuL2FjdGlvblR5cGVzJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IFxuXHRzZXRFbnRyaWVzOiAoZW50cmllcyktPlxuXHRcdHt0eXBlOiB0eXBlcy5TRVRfRU5UUklFUywgZW50cmllc31cbiIsIm1vZHVsZS5leHBvcnRzID0gXG5cdFNFVF9FTlRSSUVTOiAnU0VUX0VOVFJJRVMnXG4iLCIjTUFLRSBUSEUgTUFJTiBDT01QT05FTlRcblJlYWN0ID0gcmVxdWlyZSAncmVhY3QnXG5NYXRyaXggPSByZXF1aXJlICcuL21hdHJpeCdcblBsb3QgPSByZXF1aXJlICcuL3Bsb3QnXG5FcXVhdGlvbiA9IHJlcXVpcmUgJy4vZXF1YXRpb24nXG5BcHAgPSBSZWFjdC5jcmVhdGVDbGFzc1xuXHRyZW5kZXI6IC0+XG5cdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCBudWxsLFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChNYXRyaXgsIHtcInNldEVudHJpZXNcIjogKHRoaXMucHJvcHMuYWN0aW9ucy5zZXRFbnRyaWVzKX0pLFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChQbG90LCB7XCJlbnRyaWVzXCI6ICh0aGlzLnByb3BzLmVudHJpZXMpfSkgXG5cdFx0KVxuXG4jV0lSRSBUSElOR1MgVVAgRk9SRSBSRURVWFxue2Fzc2lnbn0gPSByZXF1aXJlICdsb2Rhc2gnXG5cdFx0XHQjIDxFcXVhdGlvbiBlbnRyaWVzPXt0aGlzLnByb3BzLmVudHJpZXN9Lz5cbntjb25uZWN0fSA9IHJlcXVpcmUgJ3JlYWN0LXJlZHV4J1xue2JpbmRBY3Rpb25DcmVhdG9yc30gPSByZXF1aXJlICdyZWR1eCdcbkFjdGlvbkNyZWF0b3JzID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9hY3Rpb25DcmVhdG9ycydcblxubWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlKS0+XG5cdGFzc2lnbiB7fSwgc3RhdGVcblxubWFwRGlzcGF0Y2hUb1Byb3BzID0gKGRpc3BhdGNoKS0+XG5cdHJlcyA9IFxuXHRcdGFjdGlvbnM6IGJpbmRBY3Rpb25DcmVhdG9ycyBBY3Rpb25DcmVhdG9ycyxkaXNwYXRjaFxuXG4jRVhQT1JUIElUXG5tb2R1bGUuZXhwb3J0cyA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLG1hcERpc3BhdGNoVG9Qcm9wcykoQXBwKSIsIlJlYWN0ID0gcmVxdWlyZSAncmVhY3QnXG5cbkVxdWF0aW9uID0gUmVhY3QuY3JlYXRlQ2xhc3Ncblx0cmVuZGVyOiAtPlxuXHRcdEEgPSB0aGlzLnByb3BzLmVudHJpZXNcblx0XHRhc2RmID0gXCJcXGdhbW1hICogI3tBWzBdWzBdfVwiXG5cdFx0IyBjb25zb2xlLmxvZyBhc2RmXG5cblx0XHQjIDxkaXYgcmVmPSdlcSc+PC9kaXY+XG5cbm1vZHVsZS5leHBvcnRzID0gRXF1YXRpb25cbiIsIlJlYWN0ID0gcmVxdWlyZSAncmVhY3QnXG5kMyA9IHJlcXVpcmUgJ2QzJ1xuXG5sb2NhbF9lbnRyaWVzID0gW1xuXHRbMSwwXSxcblx0WzAsMV1cbl1cblxubWF0cml4ID0gbmV3IGQzLnN2Zy5tYXRyaXgoKVxuXHRcdC5kYXRhIGxvY2FsX2VudHJpZXNcblx0XHQubWFwcGluZyhbXG5cdFx0XHRcdFtcImFcIiwgXCJiXCJdLFxuXHRcdFx0XHRbXCJiXCIsIFwiY1wiXVxuXHRcdF0pXG5cdFx0LmNlbGxXaWR0aCg0MClcblx0XHQuY2VsbEhlaWdodCg0MClcblx0XHQubWFyZ2luKFsxMCwgMTBdKVxuXG5NYXRyaXggPSBSZWFjdC5jcmVhdGVDbGFzc1xuXHRjb21wb25lbnREaWRNb3VudDotPlxuXHRcdG1hdHJpeC51cGRhdGUgZDMuc2VsZWN0IHRoaXMucmVmcy5tYWluR3JvdXBcblx0XHRtYXRyaXgub24gJ2NoYW5nZScsID0+XG5cdFx0XHR0aGlzLnByb3BzLnNldEVudHJpZXMgbG9jYWxfZW50cmllc1xuXG5cdHJlbmRlcjogLT5cblx0XHR7ZW50cmllc30gPSB0aGlzLnByb3BzXG5cdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcInN2Z1wiLCB7XCJ3aWR0aFwiOiAnMTAwJScsIFwiaGVpZ2h0XCI6ICcyMDBweCd9LFxuXHRcdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImdcIiwge1widHJhbnNmb3JtXCI6ICd0cmFuc2xhdGUoMjAsMzApJywgXCJyZWZcIjogJ21haW5Hcm91cCd9KVxuXHRcdClcblxubW9kdWxlLmV4cG9ydHMgPSBNYXRyaXhcbiIsIlJlYWN0ID0gcmVxdWlyZSAncmVhY3QnXG5kMyA9IHJlcXVpcmUgJ2QzJ1xuXG5lbnRyaWVzID0gW11cblxuUGxvdCA9IFJlYWN0LmNyZWF0ZUNsYXNzXG5cdGNvbXBvbmVudERpZE1vdW50Oi0+XG5cdFx0bWF0aGJveCA9IG1hdGhCb3hcblx0XHRcdGVsZW1lbnQ6IHRoaXMucmVmcy5wbG90XG5cdFx0XHRwbHVnaW5zOiBbJ2NvcmUnLCAnY3Vyc29yJywgJ2NvbnRyb2xzJ11cblx0XHRcdGNvbnRyb2xzOlxuXHRcdFx0XHRrbGFzczogVEhSRUUuT3JiaXRDb250cm9sc1xuXG5cdFx0IyAvLyBTZXQgcmVuZGVyZXIgYmFja2dyb3VuZFxuXHRcdHRocmVlID0gbWF0aGJveC50aHJlZVxuXHRcdHRocmVlLnJlbmRlcmVyLnNldENsZWFyQ29sb3IobmV3IFRIUkVFLkNvbG9yKDB4ZmZmZmZmKSwgMS4wKVxuXG5cdFx0IyAvLyBTZXQgbWF0aGJveCB1bml0cyBhbmQgcGxhY2UgY2FtZXJhXG5cdFx0bWF0aGJveC5zZXQoeyBzY2FsZTogNzIwLCBmb2N1czogMyB9KVxuXHRcdGNhbWVyYSA9IG1hdGhib3guY2FtZXJhKHsgcHJveHk6IHRydWUsIHBvc2l0aW9uOiBbMCwgLTEuMCwxLjFdIH0pXG5cblx0XHQjIC8vIENyZWF0ZSBjYXJ0ZXNpYW4gdmlld1xuXHRcdHZpZXcgPSBtYXRoYm94XG5cdFx0XHQuY2FydGVzaWFuKHtcblx0XHRcdFx0cmFuZ2U6IFtbLTEwLCAxMF0sIFstMTAsIDEwXSwgWy0xMCwgMTVdXSxcblx0XHRcdFx0c2NhbGU6IFsxLDEsMV0sXG5cdFx0XHR9KVxuXG5cdFx0IyAvLyAyRCBheGVzIC8gZ3JpZFxuXHRcdHZpZXcuYXhpcyh7IGF4aXM6IDEsIHdpZHRoOiAyIH0pXG5cdFx0dmlldy5heGlzKHsgYXhpczogMiwgd2lkdGg6IDIgfSlcblx0XHR2aWV3LmF4aXMoeyBheGlzOiAzLCB3aWR0aDogMiB9KVxuXHRcdHZpZXcuZ3JpZCh7IHdpZHRoOiAxLCBkaXZpZGVYOiAyMCwgZGl2aWRlWTogMjAsIG9wYWNpdHk6MSB9KVxuXG5cdFx0ciA9IDNcblxuXHRcdGFyZWEgPSB2aWV3LmFyZWFcblx0XHRcdGlkOiBcIm1haW5cIlxuXHRcdFx0d2lkdGg6IDIwXG5cdFx0XHRoZWlnaHQ6IDIwXG5cdFx0XHRheGVzOiBbMCwgMl1cblx0XHRcdHJhbmdlWDogWy1yLCByXVxuXHRcdFx0cmFuZ2VZOiBbLXIsIHJdXG5cdFx0XHRleHByOiAoZW1pdCwgeCwgeSwgaSwgaiwgdGltZSwgZGVsdGEpIC0+XG5cdFx0XHRcdGlmIGVudHJpZXMubGVuZ3RoID09IDAgdGhlbiByZXR1cm5cblx0XHRcdFx0YSA9IGVudHJpZXNbMF1bMF1cblx0XHRcdFx0YiA9IGVudHJpZXNbMF1bMV1cblx0XHRcdFx0YyA9IGVudHJpZXNbMV1bMV1cblx0XHRcdFx0eiA9IChhICogeCp4ICsgMipiKngqeSArIGMgKiB5KnkpICogMC4yXG5cdFx0XHRcdGVtaXQgeCx5LHpcblx0XHRcdGNoYW5uZWxzOjNcblxuXHRcdGFyZWEuc3VyZmFjZVxuXHRcdFx0c2hhZGVkOiB0cnVlXG5cdFx0XHRsaW5lWDogdHJ1ZVxuXHRcdFx0bGluZVk6IHRydWVcblx0XHRcdGNvbG9yOiBcIiM1MWU0ZmZcIlxuXHRcdFx0d2lkdGg6IDAuNVxuXHRcdFx0b3BhY2l0eTogMVxuXG5cdHJlbmRlcjogLT5cblx0XHRlbnRyaWVzID0gdGhpcy5wcm9wcy5lbnRyaWVzXG5cdFx0UmVhY3QuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XCJyZWZcIjogJ3Bsb3QnLCBcImlkXCI6ICdwbG90J30pXG5cbm1vZHVsZS5leHBvcnRzID0gUGxvdFxuIiwidmFyIGQzID0gcmVxdWlyZSgnZDMnKVxuZDMubGF5b3V0Lm1hdHJpeCA9IG1hdHJpeExheW91dDtcbmQzLnN2Zy5tYXRyaXggPSBtYXRyaXhDb21wb25lbnQ7XG5cbmZ1bmN0aW9uIG1hdHJpeENvbXBvbmVudCgpIHtcbiAgICB2YXIgZztcbiAgICB2YXIgZGF0YSA9IFtcbiAgICAgICAgW11cbiAgICBdO1xuICAgIHZhciBtYXBwaW5nID0gW1xuICAgICAgICBbXVxuICAgIF07XG4gICAgdmFyIG5vZGVzID0gW107XG4gICAgdmFyIGxheW91dCA9IGQzLmxheW91dC5tYXRyaXgoKTtcbiAgICB2YXIgbWFyZ2luID0gbGF5b3V0Lm1hcmdpbigpO1xuICAgIHZhciBjZWxsV2lkdGggPSBsYXlvdXQuY2VsbFdpZHRoKCk7XG4gICAgdmFyIGNlbGxIZWlnaHQgPSBsYXlvdXQuY2VsbEhlaWdodCgpO1xuICAgIC8qXG4gICAgVE9ET1xuICAgICAgbWFrZSBzY3J1YmJpbmcgY29uZmlndXJhYmxlLCBwZXItY2VsbFxuICAgICovXG4gICAgdmFyIGRpc3BhdGNoID0gZDMuZGlzcGF0Y2goXCJjaGFuZ2VcIilcblxuICAgIHRoaXMudXBkYXRlID0gZnVuY3Rpb24oZ3JvdXApIHtcbiAgICAgICAgaWYgKGdyb3VwKSBnID0gZ3JvdXA7XG4gICAgICAgIG5vZGVzID0gbGF5b3V0Lm5vZGVzKGRhdGEpO1xuXG4gICAgICAgIHZhciBsaW5lID0gZDMuc3ZnLmxpbmUoKVxuICAgICAgICAgICAgLngoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkWzBdXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnkoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkWzFdXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIHZhciBicmFja2V0cyA9IGcuc2VsZWN0QWxsKFwicGF0aC5icmFja2V0XCIpXG4gICAgICAgICAgICAuZGF0YShbMSwgLTFdKVxuICAgICAgICBicmFja2V0cy5lbnRlcigpLmFwcGVuZChcInBhdGhcIikuY2xhc3NlZChcImJyYWNrZXRcIiwgdHJ1ZSlcbiAgICAgICAgICAgIC5hdHRyKFwiZFwiLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5Sb3dzID0gZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIHgwID0gZCAqIGNlbGxXaWR0aCAvIDQ7XG4gICAgICAgICAgICAgICAgdmFyIHgxID0gLW1hcmdpblswXSAvIDI7XG4gICAgICAgICAgICAgICAgdmFyIHkwID0gLW1hcmdpblsxXSAvIDI7XG4gICAgICAgICAgICAgICAgdmFyIHkxID0gKGNlbGxIZWlnaHQgKyBtYXJnaW5bMV0pICogblJvd3MgLSBtYXJnaW5bMV0gLyAyXG4gICAgICAgICAgICAgICAgaWYgKGQgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpbmUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgW3gwLCB5MF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbeDEsIHkwXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt4MSwgeTFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3gwLCB5MV1cbiAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZHggPSAoY2VsbFdpZHRoICsgbWFyZ2luWzBdKSAqIGRhdGFbMF0ubGVuZ3RoIC0gbWFyZ2luWzBdIC8gMlxuICAgICAgICAgICAgICAgICAgICB4MCAtPSBtYXJnaW5bMF0gLyAyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBsaW5lKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFt4MCArIGR4LCB5MF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbZHgsIHkwXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkeCwgeTFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3gwICsgZHgsIHkxXVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmF0dHIoe1xuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMTExXCIsXG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCJcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgdmFyIGNlbGxzID0gZy5zZWxlY3RBbGwoXCJnLm51bWJlclwiKS5kYXRhKG5vZGVzKVxuICAgICAgICB2YXIgZW50ZXIgPSBjZWxscy5lbnRlcigpLmFwcGVuZChcImdcIikuY2xhc3NlZChcIm51bWJlclwiLCB0cnVlKVxuXG4gICAgICAgIGVudGVyLmFwcGVuZChcInJlY3RcIikuY2xhc3NlZChcImJnXCIsIHRydWUpXG4gICAgICAgIGNlbGxzLnNlbGVjdChcInJlY3QuYmdcIilcbiAgICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogY2VsbFdpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogY2VsbEhlaWdodCxcbiAgICAgICAgICAgICAgICB4OiBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLnhcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHk6IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQueVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmlsbDogXCIjZmZmXCJcbiAgICAgICAgICAgIH0pXG4gICAgICAgIGVudGVyLmFwcGVuZChcInRleHRcIilcbiAgICAgICAgY2VsbHMuc2VsZWN0KFwidGV4dFwiKS5hdHRyKHtcbiAgICAgICAgICAgIHg6IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC54ICsgY2VsbFdpZHRoIC8gMlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHk6IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC55ICsgY2VsbEhlaWdodCAvIDJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImFsaWdubWVudC1iYXNlbGluZVwiOiBcIm1pZGRsZVwiLFxuICAgICAgICAgICAgXCJ0ZXh0LWFuY2hvclwiOiBcIm1pZGRsZVwiLFxuICAgICAgICAgICAgXCJsaW5lLWhlaWdodFwiOiBjZWxsSGVpZ2h0LFxuICAgICAgICAgICAgXCJmaWxsXCI6IFwiIzA5MTI0MlwiXG4gICAgICAgIH0pLnRleHQoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQuZGF0YVxuICAgICAgICB9KVxuXG4gICAgICAgIHZhciBzdGVwID0gMC4xO1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHZhciBkcmFnID0gZDMuYmVoYXZpb3IuZHJhZygpXG4gICAgICAgICAgICAub24oXCJkcmFnXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkRGF0YSA9IGQuZGF0YTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gZC5kYXRhICsgZDMuZXZlbnQuZHggKiBzdGVwXG4gICAgICAgICAgICAgICAgdmFsID0gKyhNYXRoLnJvdW5kKHZhbCAqIDEwKSAvIDEwKS50b0ZpeGVkKDEpXG4gICAgICAgICAgICAgICAgc2V0KHZhbCwgZC5pLCBkLmopO1xuICAgICAgICAgICAgICAgIC8vZGF0YVtkLmldW2Qual0gPSB2YWw7XG4gICAgICAgICAgICAgICAgdGhhdC51cGRhdGUoKVxuICAgICAgICAgICAgICAgIGRpc3BhdGNoLmNoYW5nZShkLCBvbGREYXRhKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgY2VsbHMuY2FsbChkcmFnKVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldCh2YWwsIGksIGopIHtcbiAgICAgICAgdmFyIG0gPSBtYXBwaW5nW2ldW2pdO1xuICAgICAgICBpZiAobSkge1xuICAgICAgICAgICAgbWFwcGluZy5mb3JFYWNoKGZ1bmN0aW9uKHJvdywgbWkpIHtcbiAgICAgICAgICAgICAgICByb3cuZm9yRWFjaChmdW5jdGlvbihjb2wsIG1qKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2wgPT09IG0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbbWldW21qXSA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGRhdGFbaV1bal0gPSB2YWw7XG4gICAgfVxuICAgIHRoaXMubWFwcGluZyA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAvLyBUT0RPIG1ha2Ugc3VyZSBkaW1zIG1hdGNoXG4gICAgICAgICAgICBtYXBwaW5nID0gdmFsO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcHBpbmc7XG4gICAgfVxuXG4gICAgdGhpcy5kYXRhID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIGRhdGEgPSB2YWw7XG4gICAgICAgICAgICBub2RlcyA9IGxheW91dC5ub2RlcyhkYXRhKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHRoaXMubWFyZ2luID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIG1hcmdpbiA9IHZhbDtcbiAgICAgICAgICAgIGxheW91dC5tYXJnaW4obWFyZ2luKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXJnaW47XG4gICAgfVxuXG4gICAgdGhpcy5jZWxsV2lkdGggPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgY2VsbFdpZHRoID0gdmFsO1xuICAgICAgICAgICAgbGF5b3V0LmNlbGxXaWR0aChjZWxsV2lkdGgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNlbGxXaWR0aDtcbiAgICB9XG4gICAgdGhpcy5jZWxsSGVpZ2h0ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIGNlbGxIZWlnaHQgPSB2YWw7XG4gICAgICAgICAgICBsYXlvdXQuY2VsbEhlaWdodChjZWxsSGVpZ2h0KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjZWxsSGVpZ2h0O1xuICAgIH1cblxuICAgIGQzLnJlYmluZCh0aGlzLCBkaXNwYXRjaCwgXCJvblwiKVxuICAgIHJldHVybiB0aGlzO1xuXG59XG5cbmZ1bmN0aW9uIG1hdHJpeExheW91dCgpIHtcbiAgICAvKlxuICAgICAgV2UgYWNjZXB0IG91ciBtYXRyaXggZGF0YSBhcyBhIGxpc3Qgb2Ygcm93czpcbiAgICAgIFsgW2EsIGJdLFxuICAgICAgICBbYywgZF0gXVxuICAgICovXG4gICAgdmFyIGRhdGEgPSBbXG4gICAgICAgIFtdXG4gICAgXTtcbiAgICB2YXIgbm9kZXM7XG4gICAgdmFyIG1hcmdpbiA9IFswLCAwXTtcbiAgICB2YXIgY2VsbFdpZHRoID0gMjA7XG4gICAgdmFyIGNlbGxIZWlnaHQgPSAyMDtcbiAgICB2YXIgblJvd3M7XG5cbiAgICBmdW5jdGlvbiBnZXRYKGkpIHtcbiAgICAgICAgcmV0dXJuIGkgKiAoY2VsbFdpZHRoICsgbWFyZ2luWzBdKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFkoaikge1xuICAgICAgICByZXR1cm4gaiAqIChjZWxsSGVpZ2h0ICsgbWFyZ2luWzFdKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5ld05vZGVzKCkge1xuICAgICAgICBuUm93cyA9IGRhdGEubGVuZ3RoO1xuICAgICAgICBub2RlcyA9IFtdO1xuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24ocm93cywgaSkge1xuICAgICAgICAgICAgcm93cy5mb3JFYWNoKGZ1bmN0aW9uKGNvbCwgaikge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0ge1xuICAgICAgICAgICAgICAgICAgICB4OiBnZXRYKGopLFxuICAgICAgICAgICAgICAgICAgICB5OiBnZXRZKGkpLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBjb2wsXG4gICAgICAgICAgICAgICAgICAgIGk6IGksXG4gICAgICAgICAgICAgICAgICAgIGo6IGosXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpICogblJvd3MgKyBqXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZSgpIHtcbiAgICAgICAgblJvd3MgPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKHJvd3MsIGkpIHtcbiAgICAgICAgICAgIHJvd3MuZm9yRWFjaChmdW5jdGlvbihjb2wsIGopIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IG5vZGVzW2kgKiBuUm93cyArIGpdO1xuICAgICAgICAgICAgICAgIGlmICghbm9kZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgbm9kZS5kYXRhID0gY29sO1xuICAgICAgICAgICAgICAgIG5vZGUueCA9IGdldFgoaik7XG4gICAgICAgICAgICAgICAgbm9kZS55ID0gZ2V0WShpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdGhpcy5ub2RlcyA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEodmFsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgfVxuXG4gICAgdGhpcy5kYXRhID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwubGVuZ3RoID09PSBkYXRhLmxlbmd0aCAmJiB2YWxbMF0ubGVuZ3RoID09PSBkYXRhWzBdLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBzYW1lIHNpemUgbWF0cml4IGlzIGJlaW5nIHVwZGF0ZWQsIFxuICAgICAgICAgICAgICAgIC8vIGp1c3QgdXBkYXRlIHRoZSB2YWx1ZXMgYnkgcmVmZXJlbmNlXG4gICAgICAgICAgICAgICAgLy8gdGhlIHBvc2l0aW9ucyBzaG91bGRuJ3QgY2hhbmdlXG4gICAgICAgICAgICAgICAgZGF0YSA9IHZhbDtcbiAgICAgICAgICAgICAgICBjYWxjdWxhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHZhbDtcbiAgICAgICAgICAgICAgICBuZXdOb2RlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgblJvd3MgPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHRoaXMubWFyZ2luID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIG1hcmdpbiA9IHZhbDtcbiAgICAgICAgICAgIGNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcmdpbjtcbiAgICB9XG5cbiAgICB0aGlzLmNlbGxXaWR0aCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICBjZWxsV2lkdGggPSB2YWw7XG4gICAgICAgICAgICBjYWxjdWxhdGUoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjZWxsV2lkdGg7XG4gICAgfVxuICAgIHRoaXMuY2VsbEhlaWdodCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICBjZWxsSGVpZ2h0ID0gdmFsXG4gICAgICAgICAgICBjYWxjdWxhdGUoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjZWxsSGVpZ2h0O1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xufVxuIiwiI2FkZCBlbmphbG90J3MgbWF0cml4IHRoaW5nXG5yZXF1aXJlICcuL2QzLW1hdHJpeC5qcydcbiNtYWtlIHRoZSBzdG9yZVxuUmVhY3QgPSByZXF1aXJlICdyZWFjdCdcbntjcmVhdGVTdG9yZX0gPSByZXF1aXJlICdyZWR1eCdcbnJvb3QgPSByZXF1aXJlICcuL3JlZHVjZXJzL3Jvb3QnXG5zdG9yZSA9IGNyZWF0ZVN0b3JlIHJvb3RcblxuI3JpZyB1cCB0aGUgYXBwXG57cmVuZGVyfSA9IHJlcXVpcmUgJ3JlYWN0LWRvbSdcbkFwcCA9IHJlcXVpcmUgJy4vY29tcG9uZW50cy9hcHAnXG57UHJvdmlkZXJ9ID0gcmVxdWlyZSAncmVhY3QtcmVkdXgnXG5yZW5kZXIoUmVhY3QuY3JlYXRlRWxlbWVudChQcm92aWRlciwge1wic3RvcmVcIjogKHN0b3JlKX0sIFJlYWN0LmNyZWF0ZUVsZW1lbnQoQXBwLCBudWxsKSksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSlcbiIsIkltbXV0YWJsZSA9IHJlcXVpcmUgJ2ltbXV0YWJsZSdcbnR5cGVzID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9hY3Rpb25UeXBlcydcbl8gPSByZXF1aXJlICdsb2Rhc2gnXG5cbiNyZWR1Y2VyIGZ1bmN0aW9uc1xuI3RlbXBvcmFyeSBjb3NudGFudHNcblxuaW5pdGlhbFN0YXRlID0gXG5cdGVudHJpZXM6IFtbMSwwXSxbMCwxXV1cblxuUm9vdFJlZHVjZSA9IChzdGF0ZT1pbml0aWFsU3RhdGUsIGFjdGlvbiktPlxuXHR7ZW50cmllc30gPSBzdGF0ZVxuXHRzd2l0Y2ggYWN0aW9uLnR5cGVcblx0XHR3aGVuIHR5cGVzLlNFVF9FTlRSSUVTXG5cdFx0XHRlbnRyaWVzID0gYWN0aW9uLmVudHJpZXNcblx0e2VudHJpZXN9XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdFJlZHVjZSJdfQ==
