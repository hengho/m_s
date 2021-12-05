import React, { Component } from "react";
import "./App.css";

import AccountBookForm from "./components/AccountBookForm";
import AccountBookInfoList from "./components/AccountBookInfoList";

class App extends Component {
  // field
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
          id === info.id // 현재 수정하는 id를 찾음
            ? { ...info, ...data } // 새로운 내용(data)으로 덮어씀
            : info // 기존값 유지
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
        <AccountBookForm onAdd={this.add} />
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
        <AccountBookInfoList
          list={filteredList}
          onRemove={this.remove}
          onUpdate={this.update}
        />
      </React.Fragment>
    );
  }
}

export default App;
