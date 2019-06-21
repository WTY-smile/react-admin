import React, {Component} from 'react';

import { Form, Icon, Input, Button } from 'antd';
// 引入logo图片资源，在React脚手架中图片必须引入才会打包使用
import logo from './logo.png';

// import 语法必须在最上面，只要不是在最上面就会报错
import './index.less';

const Item = Form.Item;

class Login extends Component{
    // 阻止submit默认提交表单
    login = (e) => {
      e.preventDefault();
    };

    render() {
        return <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.login} className="login-form">
                        <Item>
                            <Input prefix={<Icon type="user" />} placeholder="用户名" />
                        </Item>
                        <Item>
                            <Input prefix={<Icon type="lock" />} placeholder="密码" type="password"/>
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
                        </Item>
                    </Form>
                </section>
            </div>;
    }
}

export default Login;