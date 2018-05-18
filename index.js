import React from 'react'
let state = {},
  handles = [],
  merge = o => { state = Object.assign(state, o) },
  dispatch = o => { merge(o), handles.forEach(d => d()) },
  getState = o => state,
  easyX = (o) => class Component extends React.Component {
    constructor(...props) {
      super(...props)
      handles.push(this.dispatch = () => { this.setState(state) })
    }
    componentWillUnmount() {
      handles.splice(handles.indexOf(this.dispatch), 1)
    }
    render() {
      return React.createElement(o, Object.assign({}, state, this.props))
    }
  }
export { dispatch, easyx, merge, getState }
