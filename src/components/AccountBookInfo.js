import React, { Component } from "react";

// 현재시간을 특정 format의 문자열로 반환
const getCurrentTimetoString = () => {
  return new Date().toLocaleString();
};

// 천 단위 구분기호를 포함한 문자열을 반환(정규식 이용)
const toCommaString = num => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

class AccountBookInfo extends Component {
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

  // 수정을 할 때, 기존의 내용이 변하므로 state를 정의
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

  // 수정/적용 버튼의 토글 기능
  toggleEdit = () => {
    const { editing } = this.state;
    this.setState({
      editing: !editing
    });
  };

  // select와 input 태그의 값이 변할 때 이벤트 처리
  changeInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      date: getCurrentTimetoString()
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { data, onUpdate } = this.props;

    // 수정 버튼을 클릭한 경우(input 태그가 표시되게 해준다)
    if (!prevState.editing && this.state.editing) {
      this.setState({
        type: data.type,
        price: data.price,
        usage: data.usage,
        date: data.date
      });
    }

    // 적용 버튼을 클릭한 경우(App.js에 있는 update 함수를 호출)
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
    // 현재 수정 중인 상태가 아니고 다음 state 역시 수정 중이지 않고 다음 props.data와 현재 props.data가 같다면
    // 리렌더링 방지
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
    const style = {
      border: "1px solid black",
      padding: "5px",
      margin: "5px"
    };

    const { editing } = this.state;

    // 수정
    if (editing) {
      return (
        <div style={style}>
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
          <button onClick={this.remove}>삭제</button>
        </div>
      );
    }

    // 일반
    const { type, price, usage, date } = this.props.data;

    return (
      <div style={style}>
        <div>{type}</div>
        <div>{toCommaString(price)}원</div>
        <div>{usage}</div>
        <div>{date}</div>
        <button onClick={this.toggleEdit}>수정</button>
        <button onClick={this.remove}>삭제</button>
      </div>
    );
  }
}

export default AccountBookInfo;
