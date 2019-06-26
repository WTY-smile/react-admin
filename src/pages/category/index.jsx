import React, { Component } from 'react';

import { Card, Button, Icon, Table } from 'antd';

import { reqCategories } from "../../api";
import MyBotton from '../../components/my-button';
import './index.less';

export default class Category extends Component {
    state = {
        categories: [], // 一级分类列表
    };

    async componentDidMount() {
        const result = await reqCategories('0');

        if (result) {
            this.setState({categories: result});
        }
    }

    render() {
        const columns = [
            {
                title: '品类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                dataIndex: 'operation',
                className: 'category-operation',
                render: text => {
                    // console.log(text);
                    return <div>
                        <MyBotton>修改名称</MyBotton>
                        <MyBotton>查看其子品类</MyBotton>
                    </div>
                },
            },
        ];

        /*this.state.categories = [
            {
                key: '1',
                name: '手机',
                // operation: '修改名称 查看其子品类',
            },
            {
                key: '2',
                name: '电脑',
                // operation: '修改名称 查看其子品类',
            },
            {
                key: '3',
                name: '硬盘',
                // operation: '修改名称 查看其子品类',
            },
            {
                key: '3',
                name: '耳机',
                // operation: '修改名称 查看其子品类',
            },
        ];*/

        return <Card title="一级分类列表" extra={<Button type="primary"><Icon type="plus" />添加品类</Button>}>
                <Table
                    columns={columns}
                    dataSource={this.state.categories}
                    bordered
                    pagination={{
                        showSizeChanger: true,
                        pageSizeOptions: ['3', '6', '9', '12'],
                        defaultPageSize: 3,
                        showQuickJumper: true
                    }}
                />
            </Card>;
    }
}