import React, { Component } from 'react';
import { string } from 'prop-types';
import { makeMockData } from '../utils';

class AutoCRUDTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  fetchData() {
    return new Promise((resolve, reject) => {
      resolve(makeMockData());
    });
  }

  componentWillMount() {
    this.fetchData().then(data => this.setState({data}));
  }

  render() {
    console.log(this.state);
    return (
      <div>Hello</div>
    );
  }
}

AutoCRUDTable.propTypes = {
  url: string.isRequired
}
export default AutoCRUDTable;