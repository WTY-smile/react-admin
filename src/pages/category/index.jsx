import React, { Component } from 'react';

import { Card, Button, Icon, Table } from 'antd';
import MyBotton from '../../components/my-button';
import './index.less';

export default class Category extends Component {

    render() {
        const columns = [
            {
                title: '品类名称',
                dataIndex: 'categoryName',
            },
            {
                title: '操作',
                className: 'category-operation',
                dataIndex: 'operation',
                render: text => {
                    return <div>
                        <MyBotton>修改名称</MyBotton>
                        <MyBotton>查看其子品类</MyBotton>
                    </div>
                },
            },
        ];

        const data = [
            {
                key: '1',
                categoryName: '手机',
                // operation: '修改名称 查看其子品类',
            },
            {
                key: '2',
                categoryName: '电脑',
                // operation: '修改名称 查看其子品类',
            },
            {
                key: '3',
                categoryName: '硬盘',
                // operation: '修改名称 查看其子品类',
            },
            {
                key: '3',
                categoryName: '耳机',
                // operation: '修改名称 查看其子品类',
            },
        ];

        return <div>
            <Card title="一级分类管理" extra={<Button type="primary"><Icon type="plus" />添加品类</Button>}>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={{
                        showSizeChanger: true,
                        pageSizeOptions: ['3', '6', '9', '12'],
                        defaultPageSize: 3,
                        showQuickJumper: true
                    }}
                />
            </Card>
        </div>
    }
}