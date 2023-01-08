"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 内置统一的参数，方便使用
 */
var _default = {
  // 是否显示黑色遮罩层
  useModalOverlay: true,
  // 键盘按钮控制步骤
  keyboardNavigation: true,
  defaultStepOptions: {
    // 显示关闭按钮
    cancelIcon: {
      enabled: true
    },
    scrollTo: {
      behavior: 'smooth',
      block: 'center'
    },
    // 高亮元素四周要填充的空白像素
    modalOverlayOpeningPadding: 8,
    // 空白像素的圆角
    modalOverlayOpeningRadius: 4,
    buttons: [{
      action: function action() {
        return this.back();
      },
      text: '上一步'
    }, {
      action: function action() {
        return this.next();
      },
      text: '下一步'
    }]
  }
};
exports.default = _default;