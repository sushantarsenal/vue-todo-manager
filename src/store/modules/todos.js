import axios from 'axios'

const state = {
	todos: []
}
const getters = {
	allTodos: state => state.todos
}
const actions = {
	async fetchTodos({commit}){
		const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
		commit('setTodos', response.data)
	},
	async addTodo({commit}, title){
		const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {title, completed: false})
		commit('createTodo', response.data)
	},
	async removeTodo({ commit }, id) {
		await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
		commit('eraseTodo', id)
	},
	async filterTodos({commit}, e){
		const limit = parseInt(e.target.options[e.target.options.selectedIndex].innerText)
		const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`)
		commit('setTodos', response.data)
	},
	async updateTodo({commit}, params){
		try {
			const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${params.id}`, params)
			commit('changeStatus', response.data)
		} catch (error) {
			commit('forceComplete', [params.id])
		}
	},
	async completeSelected({ commit }, todoIds) {
		// skipping batch update in backend as it is not supported by the 3rd party api we are using
		// const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${params.id}`, params)
		commit('completeAllSelected', todoIds)
	}
}

const mutations = {
	setTodos: (state, todos) => {
		state.todos = todos
	},
	createTodo: (state, todo) => {
		state.todos.unshift(todo)
	},
	eraseTodo: (state, id) => {
		state.todos = state.todos.filter(todo => todo.id !== id)
	},
	changeStatus: (state, params) => {
		let index = state.todos.findIndex(todo => todo.id == params.id)
		if (index !== -1) state.todos.splice(index, 1, params)
	},
	completeAllSelected: (state, todoIds) => {
		for (var element of state.todos) {
			if(todoIds.includes(element.id)){
				element.completed = true
			}
		}
	},
	forceComplete: (state, todoIds) => {
		for (var element of state.todos) {
			if (todoIds.includes(element.id)) {
				element.completed = !element.completed
			}
		}
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
