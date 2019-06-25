import jsonp from 'jsonp';
import { message } from "antd";
import ajax from './ajax';

// 请求登录函数

// 一般不适用这种，因为不能看到转的具体数据
// export const reqLogin = (data) => ajax('/login', data, 'POST');

// { username, password }第一个为解构赋值传一个参数（对象），第二个为对象的简写
// 可知道具体传的参数，如果参数比较多（三四个以上）就使用这种
// export const reqLogin = ({ username, password }) => ajax('/login', { username, password }, 'POST');

// 传两个参数，可知道具体传的参数，如果参数较少就使用这种
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST');

// 请求验证用户信息
export const reqValidateUserInfo = (id) => ajax('/validate/user', {id}, 'POST');

// 只有登录成功跳转到admin页面才需要调用加载天气数据，所以一定要在外面包裹一层函数再暴露，作为函数的返回值返回，要调用时再调用
export const reqWeather = function () {
    // jsonp(url, opts, fn) 调用jsonp传的三个参数
    // jsonp为一个异步代码，想要得到其返回值，必须在外面包裹Promise
    return new Promise((resolve, reject) => {
        jsonp('http://api.map.baidu.com/telematics/v3/weather?location=深圳&output=json&ak=3p49MVra6urFRGOT9s8UBWr2', {}, function (err, data) {
            if (!err) {
                // 获取天气数据
                const { dayPictureUrl, weather } = data.results[0].weather_data[0];
                // 一但成功，就调用resolve方法，将值返回出去
                resolve ({
                    weatherImg: dayPictureUrl,
                    weather
                })
            } else {
                message.error('请求天气信息失败，请刷新重试');
                resolve();
            }
        });
    });
};

