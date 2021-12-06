import React, { Component } from "react";
import Info from "./Info";
import './style.css';

class List extends Component {
  static defaultProps = {
    list: [],
    onRemove: () => console.warn("onRemove is not defined."),
    onUpdate: () => console.warn("onUpdate is not defined.")
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.list !== this.props.list;
  }

  render() {
    const { list, onRemove, onUpdate } = this.props;
    const infoList = list.map(info => (
      <Info
        key={info.key}
        data={info}
        onRemove={onRemove}
        onUpdate={onUpdate}
      />
    ));

    return <React.Fragment>{infoList}</React.Fragment>;
  }
}

export default List;
