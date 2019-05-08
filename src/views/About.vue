<template>
	<div class="about">
		<div class="back">
			<a @click="$router.go(-1)"><img id="backImg" src="../assets/logo/back.png"></a>
		</div>
		<div class="head">
			<h1>ABOUT</h1>
			<hr>
		</div>
		<img id="img-about" v-bind:src="image">
		<div class="wrapper">
			<div class="about-desc">
				<p v-for="(a, key) in about" :key="key">{{ a.description}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import router from '../router.js'
	import App from '../App'
	import VueAxios from 'vue-axios'
	import axios from 'axios'
	import Vue from 'vue'
	Vue.use(VueAxios, axios)

	export default {
		name: 'about',
		data() {
			return {
				about: null,
				url: App.data().url,
				image: null,
				a: null
			}
		},
		mounted(){
			this.about = router.app.about
			
			if(this.about != null){
				this.about.map(data=>{
					this.a = data.file
				})
			}

			const url=  'http://192.168.2.231:8000/'
			this.image = url + this.a
		}
	}
</script>

<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.about {
	width: 92.5%;
	text-align: center;
	display: inline-block;
}
.about .head hr {
  width: 50%;
  border: 0;
  height: 2px;
  background-color: #ccc;
}
.about h1 {
	color: #c41e30;
	font-family: monospace, sans-serif;
	margin: 0;
}

.about img {
	width: 20%;
}

.about-desc{
	background: #fff;
	padding: 20px;
	width: 70%;
	text-align: center;
	font-size: 20px;
	display: inline-block;
	box-shadow: 0 0 50px rgba(0,0,0,0.15);
}
.about-desc p {
	text-align: left;
	letter-spacing: 1px;
	
}
#img-about {
	margin: 1rem 0;
}

/*tablet*/
@media all and (min-width: 768px) and (max-width: 1024px) {
	.about {
		width: 100%;
	}
	.about h1 {
		font-size: 35px;
	}
	.about img {
		width: 30%;
	}
	.about-desc {
		width: 90%;
	}
	.about-desc p {
		font-size: 25px;
	}
	.back {
		top: 25px;
		right: 25px;
	}
}

/*mobile landscape*/
@media all and (min-width: 481px) and (max-width: 767px) {
	.about {
		width: 100%;
	}
	.about h1 {
		font-size: 20px;
	}
	.about img {
		width: 30%;
	}
	.about-desc {
		width: 90%;
	}
	.about-desc p {
		font-size: 15px;
	}
}

/*mobile and down*/
@media all and (max-width: 480px) {
	.about {
		width: 100%;
	}
	.about h1 {
		font-size: 20px;
	}
	.about img {
		width: 50%;
	}
	.about-desc {
		width: 90%;
	}
	.about-desc p {
		font-size: 15px;
	}
}
</style>