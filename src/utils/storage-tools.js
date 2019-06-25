
const USER_KEY = 'USER_KEY';
const USER_TIME = 'USER_TIME';
// 过期时间
const EXPIRES_IN = 1000 * 3600 * 24 * 7;

// 读取
export const getItem = function () {
    const startTime = localStorage.getItem(USER_TIME);

    if (Date.now() - startTime > EXPIRES_IN) {
        // 已过期，清除用户信息
        /*
        * const定义的变量没有变量提升，为什么直接调用没有报错：
            * 因为在定义getItem函数时，函数还未调用，函数体代码没有执行
            * 当引入这个模块时，模块内容都已经全部加载完成
            * 因此在还未调用函数之前，就已经定义了三个方法
            * 定义好了调用就能找到removeItem ()方法
            * 所以定义之后可以调用，定义之前调用则会报错
        */
        removeItem ();
        return {};
    }
    // 没有过期
    return JSON.parse(localStorage.getItem(USER_KEY));
};
// 设置
export const setItem = function (data) {
    // 代表用户第一次登录
    // 用户第一次登录时间
    // 需要将时间持久化存储，而且这个以后用不上，所以单独存储
    localStorage.setItem(USER_TIME, Date.now());
    // 存储用户数据
    localStorage.setItem(USER_KEY, JSON.stringify(data));
};
// 删除
export const removeItem = function () {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_TIME);
};
