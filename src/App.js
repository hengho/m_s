import React, { Component } from "react";
import "./App.css";

import Form from "./components/Form";
import List from "./components/List";

class App extends Component {
  currentId = -1;
  state = {
    list: [],
    keyword: "",
    currentMoney: 0
  };

  

  change = event => {
    this.setState({
      keyword: event.target.value
    });
  };

  add = data => {
    const { list } = this.state;
    this.setState({
      list: list.concat({ id: ++this.currentId, ...data })
    });
  };

  remove = id => {
    const { list } = this.state;
    this.setState({
      list: list.filter(info => info.id !== id)
    });
  };

  update = (id, data) => {
    const { list } = this.state;
    this.setState({
      list: list.map(
        info =>
          id === info.id
            ? { ...info, ...data }
            : info
      )
    });
  };

  render() {
    const { list, keyword, currentMoney } = this.state;
    const filteredList = list.filter(
      info => info.usage.indexOf(keyword) !== -1
    );

    return (
      <React.Fragment>
        <Form onAdd={this.add} />
        <p>
          <input
            className="search"
            placeholder="검색"
            onChange={this.change}
            value={keyword}
          />
          <div>
            총 지출: {currentMoney}
          </div>
        </p>
        <hr />
        <List
          list={filteredList}
          onRemove={this.remove}
          onUpdate={this.update}
        />
      </React.Fragment>
    );
  }
}

export default App;
