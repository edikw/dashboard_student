<template>
	<div class="founder">
		<div class="back">
			<a @click="$router.go(-1)"><img id="backImg" src="../assets/logo/back.png"></a>
		</div>
		<div class="head">
			<h1>FOUNDER</h1>
			<hr>
		</div>
		<img v-bind:src="image" class="my-3">
		<div class="wrapper">
			<div class="founder-desc">
				<p v-for="(a, key) in founder" :key="key">{{a.description}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import router from '../router.js'

	export default {
		name: 'founder',
		data(){
			return {
				founder:null,
				b: null,
				image: null
			}
		},
		mounted(){
			this.founder = router.app.founder

			this.founder.map(data=>{
				this.b = data.file
			})
			const url = 'http://192.168.2.231:8000/'
			this.image = url + this.b
		}
	}
</script>

<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.my-3 {
	margin: 1rem 0;
}
.founder {
	text-align: center;
	display: inline-block;
	width: 92.5%;
}
.founder .head hr {
  width: 50%;
  border: 0;
  height: 2px;
  background-color: #ccc;
}
.founder h1 {
	color: #c41e30;
	font-family: monospace, sans-serif;
	margin: 0;
	display: inline-block;
}

.founder img {
	width: 20%;
}

.founder-desc{
	background: #fff;
	padding: 20px;
	width: 70%;
	text-align: center;
	font-size: 20px;
	display: inline-block;
	box-shadow: 0 0 50px rgba(0,0,0,0.15);
}
.founder-desc p{
	text-align: left;
	letter-spacing: 1px;
}
/*tablet*/
@media all and (min-width: 768px) and (max-width: 1024px) {
	.founder {
		width: 100%;
	}
	.founder h1 {
		font-size: 35px;
	}
	.founder img {
		width: 30%;
	}
	.founder-desc {
		width: 90%;
	}
	.founder-desc p {
		font-size: 25px;
	}
}

/*mobile landscape*/
@media all and (min-width: 481px) and (max-width: 767px) {
	.founder {
		width: 100%;
	}
	.founder h1 {
		font-size: 20px;
	}
	.founder img {
		width: 30%;
	}
	.founder-desc {
		width: 90%;
	}
	.founder-desc p {
		font-size: 15px;
	}
}

/*mobile and down*/
@media all and (max-width: 480px) {
	.founder {
		width: 100%;
	}
	.founder h1 {
		font-size: 20px;
	}
	.founder img {
		width: 50%;
	}
	.founder-desc {
		width: 90%;
	}
	.founder-desc p {
		font-size: 15px;
	}
}
</style>