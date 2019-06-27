import React, { Component } from 'react';
import { Card, Form, Button, Icon, Input, Cascader, InputNumber  } from "antd";

import './index.less';
import {reqCategories} from "../../../api";
import RichTextEditor from './rich-text-editor';

const { Item } = Form;

export default class SaveUpdate extends Component {
    state = {
        options: [],
    };

    async componentDidMount() {
        const result = await reqCategories('0');

        if (result) {
            return this.setState({
                options: result.map((item) => {
                    return {
                        value: item._id,
                        label: item.name,
                        // map 遍历数据给数据添加 isLeaf 参数，同时判断这个节点是否有子集
                        isLeaf: false,
                    }
                })
            })
        }
    }

    loadData = async selectedOptions => {
        // 获取数组最后一项
        const targetOption = selectedOptions[selectedOptions.length - 1];
        // 显示loading图标
        targetOption.loading = true;
        // 发送请求、请求二级分类数据
        const result = await reqCategories(targetOption.value);

        if (result) {
            // 数据请求成功，就将loading改为false
            targetOption.loading = false;

            targetOption.children = result.map((item) => {
               return {
                   label: item.name,
                   value: item._id,
               }
            });

            this.setState({
                options: [...this.state.options],
            });
        }
    };

    addProduct = (e) => {
        e.preventDefault();
    };

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };

        return <Card
            title = {
                <div className="product-title">
                    <Icon type='arrow-left' className='arrow-icon'/>
                    <span>添加商品</span>
                </div>
            }
        >
            <Form {...formItemLayout} onSubmit={this.addProduct}>
                <Item label='商品名称'>
                    <Input placeholder='请输入商品名称'/>
                </Item>
                <Item label='商品描述'>
                    <Input placeholder='请输入商品描述'/>
                </Item>
                <Item label='选择分类' wrapperCol={{span:5}} >
                    <Cascader
                        placeholder='请选择分类'
                        options={this.state.options}
                        loadData={this.loadData}
                        changeOnSelect
                    />
                </Item>
                <Item label='商品价格'>
                    <InputNumber
                        formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        className="input-number"
                    />
                </Item>
                <Item label='商品详情' wrapperCol={{span:20}}>
                    <RichTextEditor />
                </Item>
                <Item>
                    <Button type='primary' className='add-product-btn' htmlType='submit'>提交</Button>
                </Item>
            </Form>
        </Card>
    }
}