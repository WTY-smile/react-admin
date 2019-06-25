import React, { Component } from 'react';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';

import menuList from '../../config/menu-config';
import MyButton from "../my-button";
import {getItem, removeItem} from "../../utils/storage-tools";
import { reqWeather } from "../../api";

import './index.less';

class HeaderMain extends Component {
    state = {
        // 初始化时间
        sysTime: Date.now(),
        weather: '晴',
        weatherImg: 'http://api.map.baidu.com/images/weather/day/qing.png'
    };

    // 因为用户名只需要读取一次,在渲染之前就要使用，必须挂载到this上才能使用
    componentWillMount() {
        this.username = getItem().username;
        // 在这里调用就不会走setInterval，避免一直触发，这样优化性能
        // 第一次调用需要用this.props的值
        this.title = this.getTitle(this.props);
    }

    async componentDidMount() {
        // 每隔一秒更新时间为当前时间
        setInterval(() => {
            this.setState({
                sysTime: Date.now()
            })
        },1000);

        // 发送请求，请求天气
        const result = await reqWeather();

        if (result) {
            // 如果有值表示加载成功
            this.setState(result);
        }

    }

    componentWillReceiveProps(nextProps, nextContext) {
        // 在这里调用就不会走setInterval，避免一直触发，这样优化性能
        // 后面调用需要用nextProps的值，nextProps为最新的值
        this.title = this.getTitle(nextProps);
    }

    // 登出
    /*logout = () => {
        // 需要多次调用就提取
        // const { confirm } = Modal;
        Modal.confirm({
            title: '您确定要退出登录吗?',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                // 清空本地数据
                removeItem();
                // 退出登录
                this.props.history.replace('/login');
            }
        });
    };*/
    logout = () => {
        Modal.confirm({
            title: '您确认要退出登录吗？',
            okText: '确认',
            cancelText: '取消',
            // 普通函数没人调用this默认指向window，默认使用严格模式，在严格模式下为undefined
            // 所以要使用箭头函数，这样就会指向外面包裹函数的this指向
            onOk: () => {
                // 先清空本地数据
                removeItem();
                // 再退出登录
                // 因为当前组件不是路由组件，所以要引入高阶组件withRouter
                this.props.history.replace('/login');
            }
        })
    };

    // 封装成函数，方便调用和查看
    // nextProps为最新的值，this.props为上一次的值，所以需要调用nextProps的值
    getTitle = (nextProps) => {
        // console.log('getTitle()');
        // 获取当前页面的路径
        const { pathname } = nextProps.location;
        // 找到当前页面路径和menuList里的key对应，之后再获取menuList里的title
        for (let i = 0; i < menuList.length; i++) {
            const menu = menuList[i];
            // 判断是否是二级菜单，二级菜单里面有children
            if (menu.children) {
                // 有就再进入下面这个循环，匹配key的值
                for (let j = 0; j < menu.children.length; j++) {
                    const item = menu.children[j];
                    if (item.key === pathname) {
                        return item.title;
                    }
                }
            } else {
                // 没有就直接匹配key的值，匹配成功就返回里面的title的值
                if (menu.key === pathname) {
                    return menu.title;
                }
            }
        }
    };
    render() {
        const { sysTime, weather, weatherImg } = this.state;

        return <div>
            <div className="header-main-top">
                <span>欢迎, { this.username }</span>
                <MyButton onClick={this.logout}>退出</MyButton>
            </div>
            <div className="header-main-bottom">
                <span className="header-main-left">{this.title}</span>
                <div className="header-main-right">
                    <span>{dayjs(sysTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                    <img src={weatherImg} alt="weatherImg"/>
                    <span>{weather}</span>
                </div>
            </div>
        </div>;
    }
}

export default withRouter(HeaderMain);