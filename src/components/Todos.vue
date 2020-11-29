<template>
	<div class='todo-container'>
		<div class="todos">
			<div class="tools">
				<div>
					<span><input type="checkbox" @click="selectAll()" v-model="allSelected">Select All </span>
				</div>
				<div>
					<button class='complete-all' @click="updateSelected()">Complete All Selected</button>
				</div>
			</div>

			<div v-for="todo in allTodos" :key="todo.id" class='todo' v-bind:class="{'completed':todo.completed}">
				<div><input type="checkbox" v-model="todoIds" @click="select()" :value="todo.id"></div>
				<div class="title">{{todo.title}}</div>
				<div class="options">
					<span @click='onCheck(todo)'>{{todo.completed ? 'Mark Incomplete' : 'Mark Complete'}}</span>
					<span> | </span>
					<span @click='removeTodo(todo.id)'>Delete</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapGetters, mapActions} from 'vuex'

	export default {
		name: "Todos",
		data(){
			return {
				selected: [],
				allSelected: false,
				todoIds: []
			}
		},
		methods: {
			...mapActions(['fetchTodos', 'removeTodo', 'updateTodo', 'completeSelected']),
			onCheck(todo){
				const params = {id: todo.id, title: todo.title, completed: !todo.completed}
				this.updateTodo(params)
			},
			selectAll: function() {
							this.todoIds = [];
							if (!this.allSelected) {
								for (var val in this.allTodos) {
									this.todoIds.push(this.allTodos[val].id);
								}
							}
			},
			select: function() {
				this.allSelected = false;
			},
			updateSelected: function(){
				this.completeSelected(this.todoIds)
			}
		},
		computed: mapGetters(['allTodos']),
		created(){
			this.fetchTodos()
		}
	}
</script>

<style lang="scss" scoped>
	.tools{
		display: flex;
		margin-bottom: 10px;
		align-items: baseline;
	}
	.todo{
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		border-bottom: 2px solid #fafafa;
		padding: 15px 20px;
		background: #ffe2e2;
		.title{
			font-weight: 600;
			font-size: 25px;
			width: 60%;
			text-align: left;
		}
		.status{

		}
		.options{
			span{
				cursor: pointer;
			}
		}
	}
	.completed{
		background: #dce2ff;
	}
	button.complete-all{
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
		padding: 10px 20px;
		margin-left: 10px;
		&:hover{
			background: #5177e8;
		}
	}
</style>
