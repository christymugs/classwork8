import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap'; // Import Dropdown instead of MenuItem
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      type: "all",
    };
  }

  onSearch = (event) => {
    this.setState({ search: event.target.value.trim().toLowerCase() });
  }

  onFilter = (eventKey) => {
    this.setState({ type: eventKey });
  }

  filterItem = (item) => {
    const { search, type } = this.state;

    return (
      item.name.toLowerCase().includes(search) &&
      (type === "all" || item.type.toLowerCase() === type)
    );
  }

  render() {
    return (
      <div className="filter-list">
        <h1>Produce Search</h1>

        <Dropdown onSelect={this.onFilter}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {this.state.type === "all" ? "All" : this.state.type}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="all">All</Dropdown.Item>
            <Dropdown.Item eventKey="fruit">Fruit</Dropdown.Item>
            <Dropdown.Item eventKey="vegetable">Vegetables</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <input type="text" placeholder="Search" onChange={this.onSearch} />
        <List items={this.props.items.filter(this.filterItem)} />
      </div>
    );
  }
}

export default FilteredList;