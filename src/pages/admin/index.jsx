import React, { Component } from 'react';
import { Layout } from 'antd';
import  LeftNav from '../../components/left-nav';
import  HeaderMain from '../../components/header-main';
import { getItem } from '../../utils/storage-tools';

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
    componentWillMount() {
        // 判断登录是否成功
        // 因为获取的是字符串，所以需要调用JSON.parse()方法转换为对象
        const user = getItem();
        if (!user || !user._id) {
            // 判断是否登录，登录就跳转，没有登录直接用地址跳转你就重定向登录页面
            this.props.history.replace('/login')
        }

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