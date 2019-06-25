import React, { Component } from 'react';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';

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

    render() {
        const { sysTime, weather, weatherImg } = this.state;
        return <div>
            <div className="header-main-top">
                <span>欢迎, { this.username }</span>
                <MyButton onClick={this.logout}>退出</MyButton>
            </div>
            <div className="header-main-bottom">
                <span className="header-main-left">用户管理</span>
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