import React, { Component } from "react";
import './style.css';

const getCurrentTimetoString = () => {
  return new Date().toLocaleString();
};

const toCommaString = num => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

class Info extends Component {
  static defaultProps = {
    data: {
      id: 0,
      type: "분류",
      price: 0,
      usage: "-",
      date: "-"
    },
    onUpdate: () => console.warn("onUpdate is not defined.")
  };

  state = {
    editing: false,
    type: "",
    price: "",
    usage: "",
    date: ""
  };

  remove = () => {
    const { data, onRemove } = this.props;
    onRemove(data.id);
  };

  toggleEdit = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing
    });
  };

  changeInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      date: getCurrentTimetoString()
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { data, onUpdate } = this.props;

    if (!prevState.editing && this.state.editing) {
      this.setState({
        type: data.type,
        price: data.price,
        usage: data.usage,
        date: data.date
      });
    }

    if (prevState.editing && !this.state.editing) {
      onUpdate(data.id, {
        type: this.state.type,
        price: this.state.price,
        usage: this.state.usage,
        date: this.state.date
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      !this.state.editing &&
      !nextState.editing &&
      nextProps.data === this.props.data
    ) {
      return false;
    }

    return true;
  }

  render() {

    const { editing } = this.state;

    if (editing) {
      return (
        <div className="style">
          <select
            value={this.state.type}
            name="type"
            onChange={this.changeInput}
          >
            <option>지출</option>
            <option>수입</option>
          </select>
          <input
            placeholder="금액"
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.changeInput}
          />
          <input
            placeholder="사용목적"
            name="usage"
            value={this.state.usage}
            onChange={this.changeInput}
          />
          <button onClick={this.toggleEdit}>적용</button>
        </div>
      );
    }

    const { type, price, usage, date } = this.props.data;

    return (
      <div className="style">
        <div className="text">{type}</div>
        <div className="text">{toCommaString(price)}원</div>
        <div className="text">{usage}</div>
        <div className="text">{date}</div>
        <button className="update" onClick={this.toggleEdit}>수정</button>
        <button onClick={this.remove}>삭제</button>
      </div>
    );
  }
}

export default Info;
