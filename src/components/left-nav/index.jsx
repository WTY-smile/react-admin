import React, { Component } from 'react';
import { Icon, Menu } from "antd";
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import menuList from '../../config/menu-config';

import './index.less';
import logo from '../../assets/images/logo.png';

const { SubMenu, Item } = Menu;

class LeftNav extends Component{
    static propTypes = {
        collapsed: PropTypes.bool.isRequired
    };

    createMenu = (menu) => {
        return <Item key={menu.key}>
            <Link to={menu.key}>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
            </Link>
        </Item>
    };

    componentWillMount() {
        const { pathname } = this.props.location;
        // 生成菜单
        this.menus = menuList.map((menu) => {
            // 判断是哪一级菜单
            const children = menu.children;
            if (children) {
                // 有children为二级菜单
                return <SubMenu
                    key={menu.key}
                    title={
                        <span>
                            <Icon type={menu.icon} />
                             <span>{menu.title}</span>
                        </span>
                    }
                >
                    {
                        children.map((item) => {
                            if (item.key === pathname) {
                                // 当前地址为二级菜单，需要展开
                                this.openKey = menu.key;
                            }
                            return this.createMenu(item);
                        })
                    }
                </SubMenu>;
            } else {
                // 一级菜单
                return this.createMenu(menu)
            }
        });

        this.selectedKey = pathname;
    }

    render() {
        const { collapsed } = this.props;
        return <div>
            <Link className="left-nav-logo" to="/home">
                <img src={logo} alt="logo"/>
                <h1 style={{display: collapsed ? "none" : "block"}}>硅谷后台</h1>
            </Link>
            <Menu theme="dark" defaultSelectedKeys={[this.selectedKey]} defaultOpenKeys={[this.openKey]} mode="inline">
                {
                    this.menus
                }
               {/* <Item key="home">
                    <link to="/home">
                        <Icon type="pie-chart" />
                        <span>首页</span>
                    </link>
                </Item>
                <SubMenu
                    key="sub1"
                    title={
                        <span>
                  <Icon type="user" />
                  <span>商品</span>
                </span>
                    }
                >
                    <Item key="2">
                        <Icon type="file" />
                        <span>品类管理</span>
                    </Item>
                    <Item key="3">
                        <Icon type="file" />
                        <span>商品管理</span>
                    </Item>
                </SubMenu>
                <Item key="4">
                    <Icon type="file" />
                    <span>用户管理</span>
                </Item>
                <Item key="5">
                    <Icon type="file" />
                    <span>商品管理</span>
                </Item>
                <SubMenu
                    key="sub2"
                    title={
                        <span>
                  <Icon type="team" />
                  <span>图形图表</span>
                </span>
                    }
                >
                    <Item key="6">
                        <Icon type="file" />
                        <span>柱形图</span>
                    </Item>
                    <Item key="7">
                        <Icon type="file" />
                        <span>折线图</span>
                    </Item>
                    <Item key="8">
                        <Icon type="file" />
                        <span>饼图</span>
                    </Item>
                </SubMenu>*/}
            </Menu>
        </div>;
    }
}

// withRouter是一个高阶组件，向非路由组件传递三大属性：history、location、match
export default withRouter(LeftNav);