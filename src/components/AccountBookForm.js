import React, { Component } from "react";

// 현재시간을 특정 format의 문자열로 반환
const getCurrentTimetoString = () => {
  return new Date().toLocaleString();
};

class AccountBookForm extends Component {
  // error 방지를 위한 기본 값 설정
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

  // input 태그의 내용에 변화가 발생했을 때 이벤트 처리
  changeInput = event => {
    this.setState({
      [event.target.name]: event.target.value,
      date: getCurrentTimetoString()
    });
  };

  // form 태그의 submit 이벤트 처리
  submit = event => {
    // form의 submit의 효과로 발생하는 페이지 리로딩 방지
    // 페이지 리로딩이 발생하면 state값이 초기화됨
    event.preventDefault();
    // 부모 component로부터 받은 add를 실행
    this.props.onAdd(this.state);
    // 컴포넌트의 state를 기본값으로 초기화
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

export default AccountBookForm;
