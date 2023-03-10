// 引入封装好的组件
import PenkButton from "./components/PenkButton.vue";

let arr = [PenkButton]; // 如果有多个其它组件,都可以写到这个数组里

// 批量组件注册
const install = function (Vue: any) {
    arr.forEach((com) => {
        Vue.component(com.name, com);
    });
};

export default install; // 这个方法使用的时候可以被use调用

