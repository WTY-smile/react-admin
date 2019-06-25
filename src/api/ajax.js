import axios from 'axios';
import { message } from 'antd';

// method不写默认为get请求，data默认为{}，url必填，不然不知道往哪里发送请求
export default function ajax(url, data = {}, method = 'get') {
    // 初始化请求参数
    let reqParams = data;
    // 每个人命名习惯不一样，所以使用toLowerCase()方法，默认全部小写
    method = method.toLowerCase();
    if (method === 'get') {
        // 判断是否是get请求，是get请求就改变为params:data
        reqParams = {
            params: data
        }
    }

    // 发送请求，请求登录
    // promise的语法，return的返回值会作为函数的返回值返回
    // 返回的是后面表达式的整体结果，看的是then/catch的返回值
    // post请求可直接写data参数，而get请求就要写params:data
    return axios[method](url, reqParams)
        // .then为promise对象，data为数据
        .then((res) => {
            const { data } = res;
            // console.log(data);
            // 把成功的数据响应出去，失败的代码就由.catch处理
            // 返回一个成功的promise对象，内部有data数据
            // 无论成功失败返回的都为成 功状态的promise（请求成功有填写表单数据，请求失败则没有）
            if (data.status === 0) {
                // 成功的data上有两个数据status、data，成功就返回data数据
                return data.data;
            } else {
                // 失败的data上有两个数据status、msg，失败就返回msg数据
                message.error(data.msg, 2);
            }

          /*  if (data.status === 0) {
                // 请求成功，跳转至主页面Admin
                // <Redirect to='/'> 在render方法中推荐使用
                /!*this.props.history.replace('/') 在回调函数中推荐使用
                   replace 不缓存之前的网址，不需要返回之前的页面中推荐使用
                   push 缓存之前的网址，需要返回之前的页面中推荐使用*!/
                this.props.history.replace('/');
            } else {
                // 请求失败，提示用户
                message.error(data.msg, 2);
                // 重置密码为空
                this.props.form.resetFields(['password']);
            }*/
        })
        .catch((err) => {
            // 请求失败：网络错误、服务器内部错误等
            message.error('网络出现异常，请刷新重试', 2);
        })
}