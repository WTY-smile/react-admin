import React, {Component} from 'react';
import { Form, Icon, Input, Button, message } from 'antd';

// 引入logo图片资源，在React脚手架中图片必须引入才会打包使用
import logo from '../../assets/images/logo.png';

// import 语法必须在最上面，只要不是在最上面就会报错
import './index.less';
import axios from "axios";

const Item = Form.Item;

class Login extends Component {
    // 阻止submit默认提交表单
    login = (e) => {
        e.preventDefault();

        // 校验表单并获取表单的值
        this.props.form.validateFields((error, values) => {
            console.log(error, values);
            // error 代表表单校验结果   null为校验通过   {}为校验失败，里面为失败的原因
            // values 获取传入表单的值
            if (!error) {
                // 校验通过
                const { username, password } = values;
                // 发送请求，请求登录
                axios.post('/login', { username, password})
                    .then((res) => {
                        const { data } = res;
                        console.log(data);

                        if (data.status === 0) {
                            // 请求成功，跳转至主页面Admin
                            // <Redirect to='/'> 在render方法中推荐使用
                            /*this.props.history.replace('/') 在回调函数中推荐使用
                               replace 不缓存之前的网址，不需要返回之前的页面中推荐使用
                               push 缓存之前的网址，需要返回之前的页面中推荐使用*/
                            this.props.history.replace('/');
                        } else {
                            // 请求失败，提示用户
                            message.error(data.msg, 2);
                            // 重置密码为空
                            this.props.form.resetFields(['password']);
                        }
                    })
                    .catch((err) => {
                        // 请求失败：网络错误、服务器内部错误等
                        message.error('网络出现异常，请刷新重试', 2);
                        // 重置密码为空
                        this.props.form.resetFields(['password']);
                    })
            } else {
                // 校验失败
                console.log('登录表单校验失败:', error);
            }
        })
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