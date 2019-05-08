<template>
	<div class="gallery">
		<div class="back">
			<a @click="$router.go(-1)"><img id="backImg" src="../assets/logo/back.png"></a>
		</div>
		<div class="head">
			<h1>GALLERY</h1>
			<hr>
		</div>
		<div class="gallery-desc">
			<div class="images-list">
				<div class="a"  v-for="(img, key) in images" :key="key">
					<img :src="img.file" @click="detail">
					{{img.file}}
				</div>
			</div>
		</div>
		<div class="modal" id="myModal">
			<span class="close" @click="closePage">&times;</span>
			<img id="itemPict" src="">				
		</div>
	</div>
</template>

<script>
	import router from '../router'
	export default {
		name: 'gallery',
		data() {
			return {
				
				images : null
			}
		},
		mounted() {
			this.images = router.app.gallery
		},
		methods: {
			detail() {
				var target = event.target.src;

				var pict = document.getElementById("itemPict");
				pict.src = target;

				var modal = document.getElementById('myModal');
				modal.style.display = "block";
				
			},
			closePage(){
				var modal = document.getElementById('myModal');
				// var span = document.getElementsByClassName("close")[0];

				modal.style.display = "none";
			}
		}
	}
</script>

<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.gallery {
	display: inline-block;
	text-align: center;
	width: 92.5%;
}
.gallery .head hr {
  width: 50%;
  border: 0;
  height: 2px;
  background-color: #ccc;
}
.gallery h1 {
	color: #c41e30;
	font-family: monospace, sans-serif;
	margin: 0;
	display: inline-block;
}
.gallery .gallery-desc {
	display: inline-block;
	width: 70%;
	height: 70vh;
	margin-top: 20px;
	overflow-y: scroll;
	background-color: #fff;
	box-shadow: 0 0 50px rgba(0,0,0,0.15);
	padding: 20px 0;;
}
.gallery .gallery-desc .a .image-list {
	width: 30%;
	margin: 10px;
	display: inline-block;
	text-align: left;
}
.a img {
	width: 100%;
	margin: 0 10px;
	margin-top: 10px;
	cursor: pointer;
}
.modal {
	display: none;
	position: fixed;
	z-index: 1;
	top: 0;
	width: 100%;
	height:100%;
	background-color: rgba(0, 0, 0, 0.3);
	transition: 0.3s;
	/*animation-name: name;
    animation-duration: 0.3s;*/
}
/*@keyframes name {
    from {transform:scale(0)} 
    to {transform:scale(1)}
 }*/
.modal img {
	margin: auto;
	width: 40%;
	position: fixed;
	top: 30%;
	left: 31%;
	animation-name: zoom;
    animation-duration: 0.8s;
}
@keyframes zoom {
    from {transform:scale(0)} 
    to {transform:scale(1)}
}
.close {
	text-align: center;
	position: fixed;
	top: 2%;
	left: 95%;
	color: #fff;
	font-size: 70px;
	cursor: pointer;
	transition: 0.3s;
	padding: 0px;
}

/*tablet*/
@media all and (min-width: 768px) and (max-width: 1024px) {
	.gallery {
		width: 100%;
	}
	.gallery h1 {
		font-size: 35px;
	}
	.gallery .gallery-desc {
		width: 90%;
		height: 85vh;
	}
	.a img {
		width: 40%;
	}
	.gallery .gallery-desc {
		padding: 5px 5px;
	}
	.modal img {
		width: 60%;
		top: 35%;
		left: 21%;
}	
	.close {
		top: 1%;
		left: 90%;
		color: #fff;
		font-size: 70px;
	}
}

/*mobile landscape*/
@media all and (min-width: 481px) and (max-width: 767px) {
	.gallery {
		width: 100%;
	}
	.gallery h1 {
		font-size: 20px;
	}
	.gallery .gallery-desc {
		width: 90%;
		height: 75vh;
	}
	.a img {
		width: 40%;
	}
	.gallery .gallery-desc {
		padding: 5px 5px;
	}
	.modal img {
		width: 60%;
		top: 30%;
		left: 21%;
	}
	.close {
		top: 1%;
		left: 90%;
		color: #fff;
		font-size: 50px;
	}
}

/*mobile and down*/
@media all and (max-width: 480px) {
	.gallery {
		width: 100%;
	}
	.gallery h1 {
		font-size: 20px;
	}
	.gallery .gallery-desc {
		width: 90%;
		height: 75vh;
	}
	.a img {
		width: 40%;
	}
	.gallery .gallery-desc {
		padding: 5px 5px;
	}
	.modal img {
		width: 60%;
		top: 40%;
		left: 21%;
	}
	.close {
		top: 1%;
		left: 85%;
		font-size: 50px;
	}
}

</style>