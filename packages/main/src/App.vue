<script setup lang="ts">
	import { ref } from 'vue'
	import { shepherd } from '../../shepherd/src/index'
	shepherd({})
	defineProps({
		msg: {
			type: String,
			default: "",
		}
	})


	const driver = shepherd()
	const drivers = () => {
		driver.addSteps([{
			attachTo: {
				element: document.querySelector('#header-main'),
				on: 'auto'
			},
			title: '顶部导航',
			text: '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容。',
			buttons: [{
				action () {
					return
					// return this.next()
				},
				text: '下一步'
			}]
		}, {
			attachTo: {
				element: document.querySelector('#driver-btn2'),
				on: 'auto'
			},
			title: '新手引导',
			text: '点击打开新手引导的操作按钮。'
		}, {
			attachTo: {
				element: document.querySelector('#main-btn2'),
				on: 'auto'
			},
			title: '操作按钮',
			text: '操作按钮操作按钮操作按钮操作按钮。',
			buttons: [{
				action () {
					return
					// return this.cancel()
				},
				text: '完成'
			}]
		}])
		driver.start()
  }

  const  onOpenDriver2 = () => drivers()



</script>

<template>
  <div class="home-view">
      <a-button id="driver-btn2" type="primary" @click.stop="onOpenDriver2">打开新手引导</a-button>

      <div class="PT32">
        <a-button class="MR10">操作一</a-button>
        <a-button class="MR10">操作二</a-button>
        <a-button class="MR10" type="primary" id="main-btn2">操作三</a-button>
      </div>

  </div>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
