import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

var url = App.data().url
var data = {
	student: null,
	about: null,
	major:null,
	work: null,
	founder: null,
}


Vue.config.productionTip = false
Vue.use(VueAxios, axios)


window.onload = (function(){
	getStudent()
	render()
})();

function getStudent() {
	Vue.axios.get(url.student).then((response)=>{
		data.student = response.data;
		getAbout()
	})
}

function getAbout() {
	Vue.axios.get(url.about).then((response)=>{
		data.about = response.data;
		getMajor()
	})	
}

function getMajor() {
	Vue.axios.get(url.major).then((response)=>{
		data.major = response.data;
		getFounder()

	})	
}
function getFounder() {
	Vue.axios.get(url.founder).then((response)=>{
		data.founder = response.data;	
		getWork();

	})	
}
function getWork() {
	Vue.axios.get(url.work).then((response)=>{
		data.work = response.data;
		render()	

	})	
}

function render() {
	new Vue({
		router,
		data: function(){
			return data;
		},
		render: h => h(App)
	}).$mount('#app')
}
