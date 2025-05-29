import React from "react";

class Container extends React.Component {
  state = {}
  render() {
    console.log(this.props)
    return (
      <div className="Container">
        {this.props.title}22
      </div>
    );
  }
}

export default Container;
