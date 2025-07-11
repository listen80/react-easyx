import './App.css';
import React from 'react';
import { easyX, dispatch } from '../easyx';

class Container extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    // this.props.text = 'Container'
  }
  state = {}
  onClick = () => {
    this.props.onClick(this.props.title)
  }
  render() {
    return (
      <div className="Container" onClick={this.onClick}>
        {this.props.title}
      </div>
    );
  }
}
class WrapContainer extends React.Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    // dispatch({ a: 3 })
    // this.props.text = 'Container'
  }
  state = {}
  onClick = () => {
    dispatch({ title: 'easyX' })
  }
  render() {
    console.log(this.props)
    return (
      <div className="Container" onClick={this.onClick}>
        点我
      </div>
    );
  }
}

const EContainer = easyX(WrapContainer);

function App() {
  return (
    <div className="App">
      <EContainer x={1}></EContainer>
      <Container></Container>
    </div>
  );
}

export default App;
