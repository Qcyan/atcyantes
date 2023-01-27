<script setup lang="ts">
	import { ref } from 'vue'
	import { shepherd } from '../../../shepherd/src/index'
	defineProps<{ msg: string }>()

	const count = ref(0)

  console.log(shepherd,'shepherd')

	shepherd({  steps: [
			{
				// 设置引导标题
				title: '欢迎使用本产品',
				// 设置引导文本
				text: '这是第一个引导说明, 你好呀!朋友',
				// 设置指向的目标元素
				attachTo: {
					// 目标元素
					element: '.hero-welcome',
					// 引导DOM位于目标元素的方位
					on: 'bottom'
				},
				// 设置底部按钮
				buttons: [
					{
						action: function() {
							// Shepherd退出引导的方法
							return;
						},
						// 颜色是否突出, 设置次要的颜色就不为突出
						secondary: true,
						text: 'Exit'
					},
					{
						action: function() {
							// Shepherd执行下一步引导的方法
							return;
						},
						text: 'Next'
					}
				],
				id: 'welcome'    // 用于Shepherd step的唯一标识符
			}
		],})
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank" class="hero-welcome"
    >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
