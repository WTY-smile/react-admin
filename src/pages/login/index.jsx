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

      this.props.form.validateFields = (error, values) => {
          // error传是校验结果   null：校验通过   {}：校验失败
          // values获取当前输入表单的值
          if(!error) {
              // 校验通过,获取表单的值
              const { username, password } = values;
              console.log(username, password);
          } else {
              // 校验失败，则不获取表单的值
              console.log('登录表单校验失败：', error);
          }
        }
    };

    // 自定义校验的函数
    validator = (rule, value, callback) => {
        const name = rule.fullField === 'username' ? '用户名' :  '密码';

        if(!value) {
            // !value表示没有输入
            callback(`必须输入${name}！`);
        } else if(value.length < 4) {
            callback(`${name}必须大于4位`);
        } else if(value.length > 15) {
            callback(`${name}必须小于15位`);
        } else if (!/^[a-zA-Z0-9+$]/.test(value)) {
            callback(`${name}只能包含英文字母、数字和下划线`);
        } else {
            // 校验成功，则不传参
            callback();
        }
    };

    render() {
        // getFieldDecorator为一个高阶组件
        const { getFieldDecorator } = this.props.form;

        return <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.login} className="login-form">
                        <Item>
                            {
                                getFieldDecorator("username", {
                                        rules: [
                                            /*{required: true, message: '请输入用户名！'},
                                            {min: 4, message: '用户名必须大于4位'},
                                            {max: 15, message: '用户名必须小于15位'},
                                            {pattern: /^[a-zA-Z0-9]+$/,message: '用户名只能包含英文字母、数字和下划线'}
                                        */
                                            {
                                                validator: this.validator
                                            }
                                        ]
                                    }
                                )(
                                    <Input prefix={<Icon type="user" />} placeholder="用户名" />
                                )
                            }
                        </Item>
                        <Item>
                            {
                                getFieldDecorator("password", {
                                        rules: [
                                            {
                                                validator: this.validator
                                            }
                                        ]
                                    }
                                )(
                                    <Input prefix={<Icon type="lock" />} placeholder="密码" type="password"/>
                                )
                            }
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
                        </Item>
                    </Form>
                </section>
            </div>;
    }
}

// 返回值为一个包装组件 <From(Login)><Login></From(Login)>
// 通过Form(Login)包装组件向Login组件传递form属性
export default Form.create()(Login);