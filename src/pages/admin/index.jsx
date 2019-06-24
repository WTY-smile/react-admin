import React, { Component } from 'react';
import { Layout } from 'antd';
import  LeftNav from '../../components/left-nav';
import  HeaderMain from '../../components/header-main';
import { getItem } from '../../utils/storage-tools';
import { reqValidateUserInfo } from '../../api';

const { Header, Content, Footer, Sider } = Layout;

export default class Admin extends Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    // 在渲染之前校验，校验一次
    async componentWillMount() {
        // 判断登录是否成功
        // 因为获取的是字符串，所以需要调用JSON.parse()方法转换为对象
        const user = getItem();
        /*if (!user || !user._id) {
            // 判断是否登录，登录就跳转，没有登录直接用地址跳转你就重定向登录页面
            this.props.history.replace('/login')
        } else {
            // 数据存在，就发送请求验证用户信息是否合法
            // 数据有_id、username、create_time、role（权限列表）
            // 发送_id验证比较安全，因为_id是唯一的
            // {"_id":"5d0c3e07fbe248232c6ca0d3","username":"admin","create_time":1561083399037,"role":{"menus":[]}}
            reqValidateUserInfo(user._id);
            if(!result) {
                this.props.history.replace('/login')
            }
        }*/


        // 用户是刷新进来的才会进来这个判断，获取值，如果存在就发请求
        if (user && user._id) {
            // 发送请求验证，用户信息是否合法
            // 如果用户是登录进来的，就不需要再次验证，如果用户是使用之前的值，刷新访问进来的，就需要
            const result = await reqValidateUserInfo(user._id);
            // 判断如果result是有值的，就返回
            if (result) return;
        }
        // 如果值不存在，或者验证失败就不跳转
        this.props.history.replace('/login');
    }

    render() {
        const { collapsed } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <LeftNav collapsed={collapsed}/>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0, minHeight: 100}}>
                        <HeaderMain />
                    </Header>
                    <Content style={{ margin: ' 25px 0 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>欢迎使用硅谷后台管理系统</div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        );
    }
}