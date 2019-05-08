<template>
	<div class="ourwork">
		<div class="back">
			<a @click="$router.go(-1)"><img id="backImg" src="../assets/logo/back.png"></a>
		</div>
		<div class="head">
			<h1>OUR WORKS</h1>
			<hr>
		</div>
		<div class="ourwork-desc">
			<div class="work" v-for="(work, key) in data" :key="key">
				<img v-bind:src="work.file">
				<h2>{{work.data.category}}</h2>
				<p>{{work.data.title}}</p>
				<a v-bind:href="work.data.url_website">{{work.data.url_website}}</a>
			</div>
		</div>
	</div>
</template>
<script>
	import router from '../router'
	import App from '../App'
	import VueAxios from 'vue-axios'
	import axios from 'axios'
	import Vue from 'vue'
	Vue.use(VueAxios, axios)

	export default {
		name: 'ourwork',
		data() {
			return {
				url: App.data().url,
				ourwork: null,
				dataOurworkId: null,
				file:null,
				data: null
			}
		},
		mounted () {
			this.ourwork = router.app.work

			const url = 'http://192.168.2.231:8000/' 
			
			var a = []
			this.ourwork.map(data=>{
				if(data){
					a.push(data.file)
				}
			})
			this.file = a

			var fix = []

			this.file.map((x,y)=>{
			
				if (x ==  this.ourwork[y].file) {
					fix.push({
						data: this.ourwork[y],
						file: url + x
					})
				}
			})
			this.data = fix
		}

	}
</script>
	
<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.ourwork {
	display: inline-block;
	text-align: center;
	width: 92.5%;
}
.ourwork .head hr {
  width: 50%;
  border: 0;
  height: 2px;
  background-color: #ccc;
}
.ourwork .head h1 {
	color: #c41e30;
	font-family: monospace, sans-serif;
	margin: 0;
	display: inline-block;
	/*font-size: 31px;*/
}
.ourwork .ourwork-desc {
	display: inline-block;
	width: 70%;
	height: 70vh;
	margin-top: 20px;
	overflow-y: scroll;
	background-color: #fff;
	box-shadow: 0 0 50px rgba(0,0,0,0.15);
	padding: 20px 0;
}
.ourwork .ourwork-desc .work {
	width: 30%;
	margin: 10px;
	display: inline-block;
	text-align: left;
	vertical-align: top;
}
.ourwork .ourwork-desc .work img {
	width: 50%;
}

.ourwork .ourwork-desc .work h2 {
	color: #000;
	font-size: 15px;
	margin: 0;
}

.ourwork .ourwork-desc .work p {
	font-size: 15px;
	margin: 0;
}
.ourwork .ourwork-desc .work a {
	text-decoration: none;
}

/*tablet*/
@media all and (min-width: 768px) and (max-width: 1024px) {
	.ourwork {
		width: 100%;
	}
	.ourwork h1 {
		font-size: 35px;
	}
	.ourwork .ourwork-desc {
		width: 90%;
		height: 85vh;
	}
	.ourwork .ourwork-desc .work {
		width: 70%;
	}
	.ourwork .ourwork-desc .work {
		padding: 10px;
	}
	.ourwork .ourwork-desc .work h2 {
		font-size: 20px;
	}
	.ourwork .ourwork-desc .work p {
		font-size: 20px;
	}
	.ourwork .ourwork-desc .work a {
		font-size: 20px;
	}
}

/*mobile landscape*/
@media all and (min-width: 481px) and (max-width: 767px) {
	.ourwork {
		width: 100%;
	}
	.ourwork h1 {
		font-size: 20px;
	}
	.ourwork .ourwork-desc {
		width: 80%;
		height: 75vh;
	}
	.ourwork .ourwork-desc .work {
		width: 70%;
	}
}

/*mobile and down*/
@media all and (max-width: 480px) {
	.ourwork {
		width: 100%;
	}
	.ourwork h1 {
		font-size: 20px;
	}
	.ourwork .ourwork-desc {
		width: 90%;
		height: 75vh;
	}
	.ourwork .ourwork-desc .work {
		width: 80%;
	}
}

</style>