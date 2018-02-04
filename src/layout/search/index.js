import React from "react";
import style from "./index.scss";
import { Link } from "react-router-dom";
import { Select } from "antd";
import { menuList } from "/parcel/src/data/map.js";
import createHistory from "history/createHashHistory";
const history = createHistory();
const Option = Select.Option;

class Search extends React.Component {
  constructor(props) {
    super(props);
    let searchOptions = [];
    Object.entries(menuList).forEach(item => {
      let type = item[0];
      let value = Object.values(item[1]);
      value.forEach(i => (i.type = type));
      searchOptions = [...searchOptions, ...value];
    });
    this.state = { searchOptions };
  }
  handleSelect(value, option) {
    history.push(`/detail/${option.props.type}/${option.props.idName}`);
  }
  render() {
    const options = this.state.searchOptions.map(item => (
      <Option
        key={item.id}
        type={item.type}
        value={item.title}
        idName={item.id}
      >
        {item.title}
      </Option>
    ));
    return (
      <div className={style.container} data-flex="cross:center">
        <i className="iconfont icon-search" />
        <Select
          className={style.search}
          optionFilterProp="title"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
          placeholder="Search..."
          dropdownStyle={{ fontSize: 10 }}
          notFoundContent="Not Found"
          dropdownMatchSelectWidth={false}
          showSearch={true}
          mode="combobox"
          showArrow={false}
          onSelect={this.handleSelect}
        >
          {options}
        </Select>
      </div>
    );
  }
}

export default Search;
