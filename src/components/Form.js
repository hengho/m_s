import React, { Component } from "react";
import './style.css';

const getCurrentTimetoString = () => {
  return new Date().toLocaleString();
};

class Form extends Component {
  static defaultProps = {
    onAdd: () => {
      console.log("onAdd is not defined.");
    }
  };

  state = {
    type: "지출",
    price: "",
    usage: "",
    date: ""
  };

  changeInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
      date: getCurrentTimetoString()
    });
  };

  submit = event => {
    event.preventDefault();
    this.props.onAdd(this.state);
    this.setState({
      type: "지출",
      price: "",
      usage: "",
      date: ""
    });
  };

  render() {
    return (
      <form onSubmit={this.submit}>
        <select name="type" onChange={this.changeInput}>
          <option defaultValue>지출</option>
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
        <button type="submit">추가</button>
      </form>
    );
  }
}

export default Form;
