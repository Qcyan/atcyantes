<template>
	<button @click="clickBtn">test</button>
	<el-button>test2</el-button>
</template>

<script setup lang="ts">
function clickBtn() {
	console.log("clickBtn...");
}
</script>
<script lang="ts">
export default {
	name: "PenkButton",
};
</script>

<style lang="less" scoped></style>

