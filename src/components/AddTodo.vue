<template>
	<div>
		<h2>Task Manager</h2>
		<div class="add-todo">
			<form @submit='handleSubmit'>
				<input type="text" v-model='title' placeholder='Add todo..'>
				<input type="submit" value="Submit">
			</form>
		</div>
	</div>
</template>

<script>
	import {mapActions} from 'vuex'
	export default {
		name: "AddTodo",
		data(){
			return {title: ''}
		},
		methods: {
			...mapActions(['addTodo']),
			handleSubmit(e){
				e.preventDefault();
				this.addTodo(this.title)
			}
		}
	}
</script>

<style lang='scss' scoped>
	form{
		display: flex;
	}

	input[type="text"]{
		flex: 10;
		padding: 10px;
		border: 2px solid #e2e2e2;
		border-radius: 2px;
	}

	input[type="submit"]{
		flex: 2;
		margin-left: 10px;
		background: rgb(65, 105, 225);
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		border-radius: 2px;
		cursor: pointer;
		border: none;
		font-weight: 400;
		font-size: 16px;
		color: rgb(255, 255, 255);
		width: auto;
		padding: 0px 20px;
		&:hover{
			background: #5177e8;
		}
	}
</style>

