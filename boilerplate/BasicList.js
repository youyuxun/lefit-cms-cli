import React, { PureComponent } from 'react';
import { Table, Card, Row, Col, Radio, Input, Progress, Button, Icon, Dropdown, Menu, Avatar } from 'antd';
import Filter from '../com'


const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Search = Input.Search;


class BasicList extends PureComponent {
  static defaultProps = {
    list: {
      list: fakeList(10),
      loading: false,
    }
  }
  render() {
    const { list: { list, loading } } = this.props;


    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    return (
      <div>
        <Card
          bordered={false}
          title="Basic List"
          style={{ marginTop: 16 }}
          extra={extraContent}
        >
          <Filter />
          <Table
            dataSource={list}
            pagination={paginationProps}
          />
        </Card>
      </div>
    );
  }
}

export default BasicList;
