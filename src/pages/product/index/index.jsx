import React, { Component } from 'react';
import { Card, Table, Button, Icon, Input, Select  } from "antd";
// import PropTypes from 'prop-types';

import { reqProducts } from '../../../api';
import './index.less';
import MyButton from '../../../components/my-button'

const { Option } = Select;

export default class Index extends Component {
    state = {
        products: []
    };

    async componentDidMount() {
        // 获取数据，pageNum为页数，pageSize为每一页显示的商品数量
        const result = await reqProducts(1, 6);
         // 判断是否获取到了数据，获取到就展示
        if (result) {
            this.setState({
                products: result.list
            })
        }
    }

    showAddProduct = () => {
        this.props.history.push('/product/saveupdate');
    };

    render() {
        const columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
            },
            {
                title: '状态',
                dataIndex: 'status',
                // 通过render方法将status渲染进去
                render: (status) => {
                    // 判断status状态，为1就为上架，否则就为下架
                    return status === 1
                        ? <div><Button type='primary'>上架</Button>&nbsp;&nbsp;&nbsp;&nbsp;已下架</div>
                        : <div><Button type='primary'>下架</Button>&nbsp;&nbsp;&nbsp;&nbsp;在售</div>
                }
            },
            {
                title: '操作',
                render: (product) => {
                    return <div>
                        <MyButton>详情</MyButton>
                        <MyButton>修改</MyButton>
                    </div>
                }
            },
        ];

        const { products } = this.state;

        return <Card
            title = {
                <div>
                    <Select defaultValue={0}>
                        <Option key={0} value={0}>根据商品名称</Option>
                        <Option key={1} value={1}>根据商品描述</Option>
                    </Select>
                    <Input type='text' placeholder='关键字' className='search-input'/>
                    <Button type='primary'>搜索</Button>
                </div>
            }
            extra={<Button type='primary' onClick={this.showAddProduct}><Icon type="plus" />添加产品</Button>}
        >
            <Table
                columns={columns}
                dataSource={products}
                bordered
                pagination={{
                    // 是否可以快速跳转至某页
                    showQuickJumper: true,
                    // 是否可以改变 pageSize(每页条数)
                    showSizeChanger: true,
                    // 指定每页可以显示多少条
                    pageSizeOptions: ['3', '6', '9', '12'],
                    // 默认的每页条数
                    defaultPageSize: 3
                }}
            />
        </Card>
    }
}