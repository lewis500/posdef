#make the store
{createStore} = require 'redux'
root = require '../reducers/root'
store = createStore root

#rig up the app
{render} = require 'react-dom'
App = require './components/app'
{Provider} = require 'react-redux'
render(<Provider store={store}><App/></Provider>, document.getElementById('app'))
