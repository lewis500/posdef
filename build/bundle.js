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
var ActionCreators, App, Matrix, React, assign, bindActionCreators, connect, mapDispatchToProps, mapStateToProps;

React = require('react');

assign = require('lodash').assign;

connect = require('react-redux').connect;

bindActionCreators = require('redux').bindActionCreators;

ActionCreators = require('../actions/actionCreators');

Matrix = require('./matrix');

App = React.createClass({displayName: "App",
  render: function() {
    return React.createElement(Matrix, {
      "setEntries": this.props.actions.setEntries
    });
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


},{"../actions/actionCreators":1,"./matrix":4,"lodash":undefined,"react":undefined,"react-redux":undefined,"redux":undefined}],4:[function(require,module,exports){
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


},{"d3":undefined,"react":undefined}],5:[function(require,module,exports){
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

},{"d3":undefined}],6:[function(require,module,exports){
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


},{"./components/app":3,"./d3-matrix.js":5,"./reducers/root":7,"react":undefined,"react-dom":undefined,"react-redux":undefined,"redux":undefined}],7:[function(require,module,exports){
var Immutable, RootReduce, _, initialState, types;

Immutable = require('immutable');

types = require('../actions/actionTypes');

_ = require('lodash');

initialState = {
  entries: [[1, 0], [0, 1]]
};

RootReduce = function(state, action) {
  if (state == null) {
    state = initialState;
  }
  switch (action.type) {
    case types.SET_ENTRIES:
      state.entries = action.entries;
  }
  return state;
};

module.exports = RootReduce;


},{"../actions/actionTypes":2,"immutable":undefined,"lodash":undefined}]},{},[6])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbGV3aXMvUmVzZWFyY2gvcG9zZGVmL2FwcC9hY3Rpb25zL2FjdGlvbkNyZWF0b3JzLmNvZmZlZSIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9wb3NkZWYvYXBwL2FjdGlvbnMvYWN0aW9uVHlwZXMuY29mZmVlIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3Bvc2RlZi9hcHAvY29tcG9uZW50cy9hcHAuY2pzeCIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9wb3NkZWYvYXBwL2NvbXBvbmVudHMvbWF0cml4LmNqc3giLCJhcHAvZDMtbWF0cml4LmpzIiwiL1VzZXJzL2xld2lzL1Jlc2VhcmNoL3Bvc2RlZi9hcHAvaW5kZXguY2pzeCIsIi9Vc2Vycy9sZXdpcy9SZXNlYXJjaC9wb3NkZWYvYXBwL3JlZHVjZXJzL3Jvb3QuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsSUFBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLGVBQVI7O0FBRVIsTUFBTSxDQUFDLE9BQVAsR0FDQztFQUFBLFVBQUEsRUFBWSxTQUFDLE9BQUQ7V0FDWDtNQUFDLElBQUEsRUFBTSxLQUFLLENBQUMsV0FBYjtNQUEwQixTQUFBLE9BQTFCOztFQURXLENBQVo7Ozs7O0FDSEQsTUFBTSxDQUFDLE9BQVAsR0FDQztFQUFBLFdBQUEsRUFBYSxhQUFiOzs7OztBQ0RELElBQUE7O0FBQUEsS0FBQSxHQUFRLE9BQUEsQ0FBUSxPQUFSOztBQUNQLFNBQVUsT0FBQSxDQUFRLFFBQVIsRUFBVjs7QUFDQSxVQUFXLE9BQUEsQ0FBUSxhQUFSLEVBQVg7O0FBQ0EscUJBQXNCLE9BQUEsQ0FBUSxPQUFSLEVBQXRCOztBQUNELGNBQUEsR0FBaUIsT0FBQSxDQUFRLDJCQUFSOztBQUNqQixNQUFBLEdBQVMsT0FBQSxDQUFRLFVBQVI7O0FBRVQsR0FBQSxHQUFNLEtBQUssQ0FBQyxXQUFOLENBQ0w7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1UkEsSUFBQTs7QUFBQSxPQUFBLENBQVEsZ0JBQVI7O0FBR0EsS0FBQSxHQUFRLE9BQUEsQ0FBUSxPQUFSOztBQUNQLGNBQWUsT0FBQSxDQUFRLE9BQVIsRUFBZjs7QUFDRCxJQUFBLEdBQU8sT0FBQSxDQUFRLGlCQUFSOztBQUNQLEtBQUEsR0FBUSxXQUFBLENBQVksSUFBWjs7QUFHUCxTQUFVLE9BQUEsQ0FBUSxXQUFSLEVBQVY7O0FBQ0QsR0FBQSxHQUFNLE9BQUEsQ0FBUSxrQkFBUjs7QUFDTCxXQUFZLE9BQUEsQ0FBUSxhQUFSLEVBQVo7O0FBQ0QsTUFBQSxDQUFPLEtBQUssQ0FBQyxhQUFOLENBQW9CLFFBQXBCLEVBQThCO0VBQUMsT0FBQSxFQUFVLEtBQVg7Q0FBOUIsRUFBa0QsS0FBSyxDQUFDLGFBQU4sQ0FBb0IsR0FBcEIsRUFBeUIsSUFBekIsQ0FBbEQsQ0FBUCxFQUEwRixRQUFRLENBQUMsY0FBVCxDQUF3QixLQUF4QixDQUExRjs7OztBQ2JBLElBQUE7O0FBQUEsU0FBQSxHQUFZLE9BQUEsQ0FBUSxXQUFSOztBQUNaLEtBQUEsR0FBUSxPQUFBLENBQVEsd0JBQVI7O0FBQ1IsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSOztBQUtKLFlBQUEsR0FDQztFQUFBLE9BQUEsRUFBUyxDQUFDLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBRCxFQUFPLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBUCxDQUFUOzs7QUFFRCxVQUFBLEdBQWEsU0FBQyxLQUFELEVBQXFCLE1BQXJCOztJQUFDLFFBQU07O0FBQ25CLFVBQU8sTUFBTSxDQUFDLElBQWQ7QUFBQSxTQUNNLEtBQUssQ0FBQyxXQURaO01BRUUsS0FBSyxDQUFDLE9BQU4sR0FBZ0IsTUFBTSxDQUFDO0FBRnpCO1NBR0E7QUFKWTs7QUFNYixNQUFNLENBQUMsT0FBUCxHQUFpQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ0eXBlcyA9IHJlcXVpcmUgJy4vYWN0aW9uVHlwZXMnXG5cbm1vZHVsZS5leHBvcnRzID0gXG5cdHNldEVudHJpZXM6IChlbnRyaWVzKS0+XG5cdFx0e3R5cGU6IHR5cGVzLlNFVF9FTlRSSUVTLCBlbnRyaWVzfVxuIiwibW9kdWxlLmV4cG9ydHMgPSBcblx0U0VUX0VOVFJJRVM6ICdTRVRfRU5UUklFUydcbiIsIlJlYWN0ID0gcmVxdWlyZSAncmVhY3QnXG57YXNzaWdufSA9IHJlcXVpcmUgJ2xvZGFzaCdcbntjb25uZWN0fSA9IHJlcXVpcmUgJ3JlYWN0LXJlZHV4J1xue2JpbmRBY3Rpb25DcmVhdG9yc30gPSByZXF1aXJlICdyZWR1eCdcbkFjdGlvbkNyZWF0b3JzID0gcmVxdWlyZSAnLi4vYWN0aW9ucy9hY3Rpb25DcmVhdG9ycydcbk1hdHJpeCA9IHJlcXVpcmUgJy4vbWF0cml4J1xuXG5BcHAgPSBSZWFjdC5jcmVhdGVDbGFzc1xuXHRyZW5kZXI6IC0+XG5cdFx0UmVhY3QuY3JlYXRlRWxlbWVudChNYXRyaXgsIHtcInNldEVudHJpZXNcIjogKHRoaXMucHJvcHMuYWN0aW9ucy5zZXRFbnRyaWVzKX0pXG4gICAgIyAoPGRpdj48L2Rpdj4pXG5cbm1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZSktPlxuXHRhc3NpZ24ge30sIHN0YXRlXG5cbm1hcERpc3BhdGNoVG9Qcm9wcyA9IChkaXNwYXRjaCktPlxuXHRyZXMgPSBcblx0XHRhY3Rpb25zOiBiaW5kQWN0aW9uQ3JlYXRvcnMgQWN0aW9uQ3JlYXRvcnMsZGlzcGF0Y2hcblxubW9kdWxlLmV4cG9ydHMgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcyxtYXBEaXNwYXRjaFRvUHJvcHMpKEFwcCkiLCJSZWFjdCA9IHJlcXVpcmUgJ3JlYWN0J1xuZDMgPSByZXF1aXJlICdkMydcblxubG9jYWxfZW50cmllcyA9IFtcblx0WzEsMF0sXG5cdFswLDFdXG5dXG5cbm1hdHJpeCA9IG5ldyBkMy5zdmcubWF0cml4KClcblx0XHQuZGF0YSBsb2NhbF9lbnRyaWVzXG5cdFx0Lm1hcHBpbmcoW1xuXHRcdFx0XHRbXCJhXCIsIFwiYlwiXSxcblx0XHRcdFx0W1wiYlwiLCBcImNcIl1cblx0XHRdKVxuXHRcdC5jZWxsV2lkdGgoNDApXG5cdFx0LmNlbGxIZWlnaHQoNDApXG5cdFx0Lm1hcmdpbihbMTAsIDEwXSlcblxuTWF0cml4ID0gUmVhY3QuY3JlYXRlQ2xhc3Ncblx0Y29tcG9uZW50RGlkTW91bnQ6LT5cblx0XHRtYXRyaXgudXBkYXRlIGQzLnNlbGVjdCB0aGlzLnJlZnMubWFpbkdyb3VwXG5cdFx0bWF0cml4Lm9uICdjaGFuZ2UnLCA9PlxuXHRcdFx0dGhpcy5wcm9wcy5zZXRFbnRyaWVzIGxvY2FsX2VudHJpZXNcblxuXHRyZW5kZXI6IC0+XG5cdFx0e2VudHJpZXN9ID0gdGhpcy5wcm9wc1xuXHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJzdmdcIiwge1wid2lkdGhcIjogJzEwMCUnLCBcImhlaWdodFwiOiAnMjAwcHgnfSxcblx0XHRcdFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJnXCIsIHtcInRyYW5zZm9ybVwiOiAndHJhbnNsYXRlKDIwLDMwKScsIFwicmVmXCI6ICdtYWluR3JvdXAnfSlcblx0XHQpXG5cbm1vZHVsZS5leHBvcnRzID0gTWF0cml4XG4iLCJ2YXIgZDMgPSByZXF1aXJlKCdkMycpXG5kMy5sYXlvdXQubWF0cml4ID0gbWF0cml4TGF5b3V0O1xuZDMuc3ZnLm1hdHJpeCA9IG1hdHJpeENvbXBvbmVudDtcblxuZnVuY3Rpb24gbWF0cml4Q29tcG9uZW50KCkge1xuICAgIHZhciBnO1xuICAgIHZhciBkYXRhID0gW1xuICAgICAgICBbXVxuICAgIF07XG4gICAgdmFyIG1hcHBpbmcgPSBbXG4gICAgICAgIFtdXG4gICAgXTtcbiAgICB2YXIgbm9kZXMgPSBbXTtcbiAgICB2YXIgbGF5b3V0ID0gZDMubGF5b3V0Lm1hdHJpeCgpO1xuICAgIHZhciBtYXJnaW4gPSBsYXlvdXQubWFyZ2luKCk7XG4gICAgdmFyIGNlbGxXaWR0aCA9IGxheW91dC5jZWxsV2lkdGgoKTtcbiAgICB2YXIgY2VsbEhlaWdodCA9IGxheW91dC5jZWxsSGVpZ2h0KCk7XG4gICAgLypcbiAgICBUT0RPXG4gICAgICBtYWtlIHNjcnViYmluZyBjb25maWd1cmFibGUsIHBlci1jZWxsXG4gICAgKi9cbiAgICB2YXIgZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaChcImNoYW5nZVwiKVxuXG4gICAgdGhpcy51cGRhdGUgPSBmdW5jdGlvbihncm91cCkge1xuICAgICAgICBpZiAoZ3JvdXApIGcgPSBncm91cDtcbiAgICAgICAgbm9kZXMgPSBsYXlvdXQubm9kZXMoZGF0YSk7XG5cbiAgICAgICAgdmFyIGxpbmUgPSBkMy5zdmcubGluZSgpXG4gICAgICAgICAgICAueChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRbMF1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAueShmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRbMV1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgdmFyIGJyYWNrZXRzID0gZy5zZWxlY3RBbGwoXCJwYXRoLmJyYWNrZXRcIilcbiAgICAgICAgICAgIC5kYXRhKFsxLCAtMV0pXG4gICAgICAgIGJyYWNrZXRzLmVudGVyKCkuYXBwZW5kKFwicGF0aFwiKS5jbGFzc2VkKFwiYnJhY2tldFwiLCB0cnVlKVxuICAgICAgICAgICAgLmF0dHIoXCJkXCIsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgblJvd3MgPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgeDAgPSBkICogY2VsbFdpZHRoIC8gNDtcbiAgICAgICAgICAgICAgICB2YXIgeDEgPSAtbWFyZ2luWzBdIC8gMjtcbiAgICAgICAgICAgICAgICB2YXIgeTAgPSAtbWFyZ2luWzFdIC8gMjtcbiAgICAgICAgICAgICAgICB2YXIgeTEgPSAoY2VsbEhlaWdodCArIG1hcmdpblsxXSkgKiBuUm93cyAtIG1hcmdpblsxXSAvIDJcbiAgICAgICAgICAgICAgICBpZiAoZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGluZShbXG4gICAgICAgICAgICAgICAgICAgICAgICBbeDAsIHkwXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFt4MSwgeTBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW3gxLCB5MV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbeDAsIHkxXVxuICAgICAgICAgICAgICAgICAgICBdKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkeCA9IChjZWxsV2lkdGggKyBtYXJnaW5bMF0pICogZGF0YVswXS5sZW5ndGggLSBtYXJnaW5bMF0gLyAyXG4gICAgICAgICAgICAgICAgICAgIHgwIC09IG1hcmdpblswXSAvIDJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpbmUoW1xuICAgICAgICAgICAgICAgICAgICAgICAgW3gwICsgZHgsIHkwXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtkeCwgeTBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgW2R4LCB5MV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbeDAgKyBkeCwgeTFdXG4gICAgICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuYXR0cih7XG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMxMTFcIixcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIlxuICAgICAgICAgICAgfSlcblxuICAgICAgICB2YXIgY2VsbHMgPSBnLnNlbGVjdEFsbChcImcubnVtYmVyXCIpLmRhdGEobm9kZXMpXG4gICAgICAgIHZhciBlbnRlciA9IGNlbGxzLmVudGVyKCkuYXBwZW5kKFwiZ1wiKS5jbGFzc2VkKFwibnVtYmVyXCIsIHRydWUpXG5cbiAgICAgICAgZW50ZXIuYXBwZW5kKFwicmVjdFwiKS5jbGFzc2VkKFwiYmdcIiwgdHJ1ZSlcbiAgICAgICAgY2VsbHMuc2VsZWN0KFwicmVjdC5iZ1wiKVxuICAgICAgICAgICAgLmF0dHIoe1xuICAgICAgICAgICAgICAgIHdpZHRoOiBjZWxsV2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBjZWxsSGVpZ2h0LFxuICAgICAgICAgICAgICAgIHg6IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQueFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgeTogZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC55XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmaWxsOiBcIiNmZmZcIlxuICAgICAgICAgICAgfSlcbiAgICAgICAgZW50ZXIuYXBwZW5kKFwidGV4dFwiKVxuICAgICAgICBjZWxscy5zZWxlY3QoXCJ0ZXh0XCIpLmF0dHIoe1xuICAgICAgICAgICAgeDogZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnggKyBjZWxsV2lkdGggLyAyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeTogZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnkgKyBjZWxsSGVpZ2h0IC8gMlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiYWxpZ25tZW50LWJhc2VsaW5lXCI6IFwibWlkZGxlXCIsXG4gICAgICAgICAgICBcInRleHQtYW5jaG9yXCI6IFwibWlkZGxlXCIsXG4gICAgICAgICAgICBcImxpbmUtaGVpZ2h0XCI6IGNlbGxIZWlnaHQsXG4gICAgICAgICAgICBcImZpbGxcIjogXCIjMDkxMjQyXCJcbiAgICAgICAgfSkudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5kYXRhXG4gICAgICAgIH0pXG5cbiAgICAgICAgdmFyIHN0ZXAgPSAwLjE7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIGRyYWcgPSBkMy5iZWhhdmlvci5kcmFnKClcbiAgICAgICAgICAgIC5vbihcImRyYWdcIiwgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHZhciBvbGREYXRhID0gZC5kYXRhO1xuICAgICAgICAgICAgICAgIHZhciB2YWwgPSBkLmRhdGEgKyBkMy5ldmVudC5keCAqIHN0ZXBcbiAgICAgICAgICAgICAgICB2YWwgPSArKE1hdGgucm91bmQodmFsICogMTApIC8gMTApLnRvRml4ZWQoMSlcbiAgICAgICAgICAgICAgICBzZXQodmFsLCBkLmksIGQuaik7XG4gICAgICAgICAgICAgICAgLy9kYXRhW2QuaV1bZC5qXSA9IHZhbDtcbiAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZSgpXG4gICAgICAgICAgICAgICAgZGlzcGF0Y2guY2hhbmdlKGQsIG9sZERhdGEpXG4gICAgICAgICAgICB9KVxuICAgICAgICBjZWxscy5jYWxsKGRyYWcpXG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0KHZhbCwgaSwgaikge1xuICAgICAgICB2YXIgbSA9IG1hcHBpbmdbaV1bal07XG4gICAgICAgIGlmIChtKSB7XG4gICAgICAgICAgICBtYXBwaW5nLmZvckVhY2goZnVuY3Rpb24ocm93LCBtaSkge1xuICAgICAgICAgICAgICAgIHJvdy5mb3JFYWNoKGZ1bmN0aW9uKGNvbCwgbWopIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbCA9PT0gbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVttaV1bbWpdID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtpXVtqXSA9IHZhbDtcbiAgICB9XG4gICAgdGhpcy5tYXBwaW5nID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIC8vIFRPRE8gbWFrZSBzdXJlIGRpbXMgbWF0Y2hcbiAgICAgICAgICAgIG1hcHBpbmcgPSB2YWw7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwcGluZztcbiAgICB9XG5cbiAgICB0aGlzLmRhdGEgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgZGF0YSA9IHZhbDtcbiAgICAgICAgICAgIG5vZGVzID0gbGF5b3V0Lm5vZGVzKGRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgdGhpcy5tYXJnaW4gPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgbWFyZ2luID0gdmFsO1xuICAgICAgICAgICAgbGF5b3V0Lm1hcmdpbihtYXJnaW4pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcmdpbjtcbiAgICB9XG5cbiAgICB0aGlzLmNlbGxXaWR0aCA9IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICBjZWxsV2lkdGggPSB2YWw7XG4gICAgICAgICAgICBsYXlvdXQuY2VsbFdpZHRoKGNlbGxXaWR0aCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2VsbFdpZHRoO1xuICAgIH1cbiAgICB0aGlzLmNlbGxIZWlnaHQgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgY2VsbEhlaWdodCA9IHZhbDtcbiAgICAgICAgICAgIGxheW91dC5jZWxsSGVpZ2h0KGNlbGxIZWlnaHQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNlbGxIZWlnaHQ7XG4gICAgfVxuXG4gICAgZDMucmViaW5kKHRoaXMsIGRpc3BhdGNoLCBcIm9uXCIpXG4gICAgcmV0dXJuIHRoaXM7XG5cbn1cblxuZnVuY3Rpb24gbWF0cml4TGF5b3V0KCkge1xuICAgIC8qXG4gICAgICBXZSBhY2NlcHQgb3VyIG1hdHJpeCBkYXRhIGFzIGEgbGlzdCBvZiByb3dzOlxuICAgICAgWyBbYSwgYl0sXG4gICAgICAgIFtjLCBkXSBdXG4gICAgKi9cbiAgICB2YXIgZGF0YSA9IFtcbiAgICAgICAgW11cbiAgICBdO1xuICAgIHZhciBub2RlcztcbiAgICB2YXIgbWFyZ2luID0gWzAsIDBdO1xuICAgIHZhciBjZWxsV2lkdGggPSAyMDtcbiAgICB2YXIgY2VsbEhlaWdodCA9IDIwO1xuICAgIHZhciBuUm93cztcblxuICAgIGZ1bmN0aW9uIGdldFgoaSkge1xuICAgICAgICByZXR1cm4gaSAqIChjZWxsV2lkdGggKyBtYXJnaW5bMF0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0WShqKSB7XG4gICAgICAgIHJldHVybiBqICogKGNlbGxIZWlnaHQgKyBtYXJnaW5bMV0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmV3Tm9kZXMoKSB7XG4gICAgICAgIG5Sb3dzID0gZGF0YS5sZW5ndGg7XG4gICAgICAgIG5vZGVzID0gW107XG4gICAgICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbihyb3dzLCBpKSB7XG4gICAgICAgICAgICByb3dzLmZvckVhY2goZnVuY3Rpb24oY29sLCBqKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIHg6IGdldFgoaiksXG4gICAgICAgICAgICAgICAgICAgIHk6IGdldFkoaSksXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGNvbCxcbiAgICAgICAgICAgICAgICAgICAgaTogaSxcbiAgICAgICAgICAgICAgICAgICAgajogaixcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGkgKiBuUm93cyArIGpcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlKCkge1xuICAgICAgICBuUm93cyA9IGRhdGEubGVuZ3RoO1xuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24ocm93cywgaSkge1xuICAgICAgICAgICAgcm93cy5mb3JFYWNoKGZ1bmN0aW9uKGNvbCwgaikge1xuICAgICAgICAgICAgICAgIHZhciBub2RlID0gbm9kZXNbaSAqIG5Sb3dzICsgal07XG4gICAgICAgICAgICAgICAgaWYgKCFub2RlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBub2RlLmRhdGEgPSBjb2w7XG4gICAgICAgICAgICAgICAgbm9kZS54ID0gZ2V0WChqKTtcbiAgICAgICAgICAgICAgICBub2RlLnkgPSBnZXRZKGkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICB0aGlzLm5vZGVzID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSh2YWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICB9XG5cbiAgICB0aGlzLmRhdGEgPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbC5sZW5ndGggPT09IGRhdGEubGVuZ3RoICYmIHZhbFswXS5sZW5ndGggPT09IGRhdGFbMF0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgdGhlIHNhbWUgc2l6ZSBtYXRyaXggaXMgYmVpbmcgdXBkYXRlZCwgXG4gICAgICAgICAgICAgICAgLy8ganVzdCB1cGRhdGUgdGhlIHZhbHVlcyBieSByZWZlcmVuY2VcbiAgICAgICAgICAgICAgICAvLyB0aGUgcG9zaXRpb25zIHNob3VsZG4ndCBjaGFuZ2VcbiAgICAgICAgICAgICAgICBkYXRhID0gdmFsO1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gdmFsO1xuICAgICAgICAgICAgICAgIG5ld05vZGVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuUm93cyA9IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgdGhpcy5tYXJnaW4gPSBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgbWFyZ2luID0gdmFsO1xuICAgICAgICAgICAgY2FsY3VsYXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFyZ2luO1xuICAgIH1cblxuICAgIHRoaXMuY2VsbFdpZHRoID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIGNlbGxXaWR0aCA9IHZhbDtcbiAgICAgICAgICAgIGNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNlbGxXaWR0aDtcbiAgICB9XG4gICAgdGhpcy5jZWxsSGVpZ2h0ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgIGNlbGxIZWlnaHQgPSB2YWxcbiAgICAgICAgICAgIGNhbGN1bGF0ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNlbGxIZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG59XG4iLCIjYWRkIGVuamFsb3QncyBtYXRyaXggdGhpbmdcbnJlcXVpcmUgJy4vZDMtbWF0cml4LmpzJ1xuXG4jbWFrZSB0aGUgc3RvcmVcblJlYWN0ID0gcmVxdWlyZSAncmVhY3QnXG57Y3JlYXRlU3RvcmV9ID0gcmVxdWlyZSAncmVkdXgnXG5yb290ID0gcmVxdWlyZSAnLi9yZWR1Y2Vycy9yb290J1xuc3RvcmUgPSBjcmVhdGVTdG9yZSByb290XG5cbiNyaWcgdXAgdGhlIGFwcFxue3JlbmRlcn0gPSByZXF1aXJlICdyZWFjdC1kb20nXG5BcHAgPSByZXF1aXJlICcuL2NvbXBvbmVudHMvYXBwJ1xue1Byb3ZpZGVyfSA9IHJlcXVpcmUgJ3JlYWN0LXJlZHV4J1xucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUHJvdmlkZXIsIHtcInN0b3JlXCI6IChzdG9yZSl9LCBSZWFjdC5jcmVhdGVFbGVtZW50KEFwcCwgbnVsbCkpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpXG4iLCJJbW11dGFibGUgPSByZXF1aXJlICdpbW11dGFibGUnXG50eXBlcyA9IHJlcXVpcmUgJy4uL2FjdGlvbnMvYWN0aW9uVHlwZXMnXG5fID0gcmVxdWlyZSAnbG9kYXNoJ1xuXG4jcmVkdWNlciBmdW5jdGlvbnNcbiN0ZW1wb3JhcnkgY29zbnRhbnRzXG5cbmluaXRpYWxTdGF0ZSA9IFxuXHRlbnRyaWVzOiBbWzEsMF0sWzAsMV1dXG5cblJvb3RSZWR1Y2UgPSAoc3RhdGU9aW5pdGlhbFN0YXRlLCBhY3Rpb24pLT5cblx0c3dpdGNoIGFjdGlvbi50eXBlXG5cdFx0d2hlbiB0eXBlcy5TRVRfRU5UUklFU1xuXHRcdFx0c3RhdGUuZW50cmllcyA9IGFjdGlvbi5lbnRyaWVzXG5cdHN0YXRlXG5cbm1vZHVsZS5leHBvcnRzID0gUm9vdFJlZHVjZSJdfQ==
