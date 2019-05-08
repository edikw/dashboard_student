<template>
	<div class="profile" v-if="selectedStudent">
		<div class="back">
			<a @click="$router.go(-1)"><img id="backImg" src="../assets/logo/back.png"></a>
		</div>
		<div class="head">
			<h1>PROFILE</h1>
			<hr>
		</div>
		<div class="a-desc">
			<div class="foto">
				<img>
			</div>
			<div class="status" id="status">
				<p><strong>{{selectedStudent.name}}</strong></p>
				<hr>
				<p>{{selectedStudent.major | majorToName}}</p>
			</div>
		</div>
		<div class="profile-desc">
			<div class="bio">
				<h2><span>Gender</span>: <p>{{selectedStudent.gender}}</p></h2>
				<h2><span>Birthday</span>: <p>{{selectedStudent.birthday}}</p></h2>
				<h2><span>Address</span>: <p>{{selectedStudent.address}}</p></h2>
				<h2><span>Email</span>: <p>{{selectedStudent.email}}</p></h2>
				<h2><span>Status</span>: <p>{{selectedStudent.status}}</p></h2>
			</div>
			<div class="hr"></div>
			<div class="personality" v-if="profileSkill">
				<div class="skill">
					<h1>SKILL</h1>
					<div class="list-skill">
							<ul >
								<li v-for="skill in profileSkill.skills" :key="skill.name">{{skill.name}}</li>
							</ul>
					</div>
					<div class="listPersentSkill">
						<div class="persent" v-for="(skil, key) in profileSkill.skills" :key="key">
							<progress v-bind:value="skil.score" max="10"></progress>
						</div>
					</div>
				</div>
				<div class="character" v-if="profileCharacter">
					<h1>CHARACTER</h1>
					<div class="character-list">
						<ul>
							<li v-for="(char, key) in profileCharacter.character" :key="key">{{char.name}}</li>
						</ul>
					</div>
					<div class="listPersentCharacter">
						<div class="persent-char" v-for="(character, key) in profileCharacter.character" :key="key">
							<progress v-bind:value="character.score" max="10"></progress>
						</div>
					</div>
				</div>
			</div>
		</div>
		<hr>		
		<div class="slide-profile">
			<div class="slider-container">
				<Carousel :perPageCustom="[[300, 1],[480, 1],[640, 1],[730, 2], [732, 1], [768, 2], [1024, 3], [1366, 2], [1367, 3], [1920, 3], [1080, 1]]" :navigationEnabled="true" :mouseDrag="true" paginationActiveColor="#c41e30" :paginationPadding='0'>
					<Slide v-for="(student, key) in selectedSlide" :key="key">
						<div class="a-desc-profile" v-on:click="selectStudent(student)">
							<div class="foto-profile">
								<img>
							</div>
							<div class="status-profile">
								<p><strong>{{student.name}}</strong></p>
								<hr>
								<p>{{student.major| majorToName}}</p>
							</div>
						</div>
					</Slide>
				</Carousel>
			</div>
		</div>
	</div>
</template>

<script>
	import { Carousel, Slide } from 'vue-carousel';
	import App from '../App'
	import router from '../router.js'
	import VueAxios from 'vue-axios'
	import axios from 'axios'
	import Vue from 'vue'
	Vue.use(VueAxios, axios)

  export default {
	name: 'profile',
	components: {
		Carousel,
		Slide
	},

	data () {
		return {
			selectedSlide: null,
			selectedStudent:null,
			id_stud: null,
			url: App.data().url,
			profileSkill: null,
			profileCharacter: null,
		}
	},
	mounted() {
		this.selectedStudent = this.$route.params.selected_student;
		this.id_stud = this.selectedStudent.id; 

		// get skill student dgn id

		Vue.axios.get(this.url.student + '/skill/' + this.id_stud).then((response)=>{
			this.profileSkill = response.data;
			
		})

		// get char student dgn id 
		Vue.axios.get(this.url.student + '/character/' + this.id_stud).then((response)=>{
			this.profileCharacter = response.data;
		})

		this.selectedSlide = this.$route.params.selected_slide; 
	},
	methods: {
		selectStudent(student){
			this.selectedStudent = student;
			this.id_stud = student.id
			Vue.axios.get(this.url.student + '/skill/' + this.id_stud).then((response)=>{
				this.profileSkill = response.data;
			
			})

		// get char student dgn id 
			Vue.axios.get(this.url.student + '/character/' + this.id_stud).then((response)=>{
				this.profileCharacter = response.data;
			
			})

			this.render();
		},
		render() {
			this.selectedSlide = this.$route.params.selected_slide; 
		}
	},

	filters: {

		majorToName(val){
			var name = []
			router.app.major.map(data=>{
				if(data.id === val){
					name = data.name;
				}
			})
			return name;
		}
	}
};
</script>

<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.profile {
	width: 92.5%;
	text-align: center;
	display: inline-block;
}
.profile h1 {
	color: #c41e30;
	font-family: monospace, sans-serif;
	margin: 0;
	display: inline-block;
}

.profile .head hr {
  width: 50%;
  border: 0;
  height: 2px;
  background-color: #ccc;
  margin-top: 8px;
  position: relative;
}

.profile-desc{
	background: #fff;
	padding: 20px;
	width: 70%;
	text-align: center;
	font-size: 20px;
	display: inline-flex;
	box-shadow: 0 0 50px rgba(0,0,0,0.15);
	margin-bottom: 29px;
	margin-top: 6px;
}
.profile-desc .hr{
	width: 2px;
	background-color: #ccc;
	height: 320px;
	display: inline-block;
}

.profile-desc .bio {
	text-align: left;
	display: inline-block;
	width: 45%;
	vertical-align: top;
}
.profile-desc .bio span {
	width: 20%;
	display: inline-block;
}
.profile-desc .bio h2 {
	font-size: 20px;
	color: #000;
	font-weight: normal;
	font-family: sans-serif;
	display: flex;
}
.profile-desc .bio h2 p {
	margin: 0;
	margin-left: 10px;
	width: 80%;
	font-weight: bold;
}

.personality {
	display: inline-block;
	text-align: left;
	width: 44%;
	margin-left: 25px; 
}
.personality h1 {
	font-size: 20px;
	color: #000;
	display: block;
}
.personality .skill {
	display: block;
}
.personality .skill .list-skill {
	display: inline-block;
	width: 50%;
}
.personality .skill .list-skill ul {
	/*margin-top: 5px;*/
	margin:  0px
}
.personality .skill .list-skill ul li{
	font-size: 15px;
	padding: 2px;
}
.personality .skill .listPersentSkill {
	display: inline-block;
	width: 50%;
}

.personality .skill .persent progress { 
	-webkit-appearance: none;
	margin-bottom: 5px;
	border: 1px solid #ccc;
}
::-webkit-progress-bar {
	background-color: #fff;
}
.personality .skill .persent progress[value] {
	max-height: 10px;
}
progress::-webkit-progress-value {
	background-color: #c41e30;
}

.personality .character {
	display: block;
}
.personality .character .character-list {
	display: inline-block;
	width: 50%;
}
.personality .character .character-list ul {
	/*margin-top: 5px;*/
	margin: 0px;
}
.personality .character .character-list ul li {
	font-size: 15px;
	padding: 3px;
}
.personality .character .listPersentCharacter {
	width: 50%;
	display: inline-block;
}
.personality .character .persent-char progress[value] {
	max-height: 10px;
}
.personality .character .persent-char progress {
	border: 1px solid #ccc;
	margin-bottom: 5px;
}
.profile .a-desc {
  width: 100%;
  display: inline-flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
}

.profile .a-desc .foto {
  width: 150px;
  height: 150px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #ccc;
  display: inline-block;
  z-index: 1;
}

.profile .a-desc .foto img {
  width: 100%;
  border-radius: 50%;
}

.profile .a-desc .status {
  background-color: #c41e30;
  text-align: left;
  display: inline-block;
  padding: 15px 0;
  width: 20%;
  position: relative;
  left: -15px;
  border-bottom-right-radius: 30% 100%;
}

.profile .a-desc .status hr {
  width: 80%;
  margin:0;
  height: 1px;
  border: 0;
  background: #8e8e8e;
}

.profile .a-desc .status p {
  color: #fff;
  margin: 0;
  font-size: 15px;
  padding: 5px 30px;
}
.profile hr {
	width: 50%;
	border: 0;
	height: 1px;
	background-color: #ccc;
}
.slide-profile {
	margin-top: 50px;
	width: 90%;
	display: inline-block;
}
.slide-profile .a-desc-profile {
	display: inline-flex;
	position: relative;
	margin-left: 50px;
}
.slide-profile .a-desc-profile .foto-profile {
	width: 100px;
	height: 100px;
	background-color: #fff;
	border-radius: 50%;
	border: 1px solid #ccc;
	display: inline-block;
	z-index: 1;
}
.slide-profile .a-desc-profile .foto-profile img {
	width: 100%;
	border-radius: 50%;
}
.slide-profile .a-desc-profile .status-profile {
	background-color: #c41e30;
	text-align: left;
	display: inline-block;
	padding: 0;
	width: 185%;
	position: absolute;
	left: 80px;
	top: 20px;
	border-bottom-right-radius: 30% 100%;
}
.slide-profile .a-desc-profile .status-profile hr {
  width: 80%;
  margin:0;
  height: 1px;
  border: 0;
  background: #8e8e8e;
}

.slide-profile .a-desc-profile .status-profile p {
  color: #fff;
  font-size: 10px;
  padding: 0 30px;
}
.VueCarousel {
  width: 80%;
  display: inline-block;
}
.VueCarousel-inner {
  flex-basis: 255px;
}
.VueCarousel-slide {
	text-align: left;
}
.slider-container {
  text-align: center;
}
.slider-title {
  text-align: left;
}
/*tabled or ipad or dekstop*/
@media all and (min-width: 768px) and (max-width: 1024px) {
	.profile {
		width: 100%;
	}
	.profile h1 {
		font-size: 35px;
	}
	.profile-desc{
		background: #fff;
		padding: 20px;
		width: 90%;
		text-align: center;
		font-size: 20px;
		box-shadow: 0 0 50px rgba(0,0,0,0.15);
		margin-bottom: 29px;
		margin-top: 6px;
	}
	.profile .a-desc .status {
		width: 30%;
	}

	.profile-desc .hr{
		height: 360px;
	}
	.profile-desc .bio span {
		width: 25%;
	}
	.profile-desc .bio h2 {
		font-size: 15px;
		color: #000;
		margin: 0;
		height: 70px;
	}
	.personality .skill h1 {
		font-size: 15px;
	}
	.personality .skill .list-skill ul {
		padding: 0;
		margin-left: 25px;
	}
	.personality .skill .list-skill li {
		margin-bottom: 5px;
	}
	.personality .skill .listPersentSkill {
		display: inline-block;
	}

	.personality .skill .persent progress[value] {
		max-width: 141px;
		max-height: 8px;
		margin-bottom: 6px;
	}
	.personality .character h1 {
		font-size: 15px;
	}
	.personality .character .character-list h1 {
		font-size: 15px;
	}

	.personality .character .character-list ul {
		display: inline-block;
		padding: 0;
		margin-left: 20px;
	}
	.personality .character .character-list ul li {
		font-size: 15px;
		margin: 5px;
	}
	.personality .character .persent-char {
		position: static;
		top: 0;
		left: 0;
		display: inline;
		width: 100%;
		display: flex;
		margin-bottom: 8px;
	}
	.personality .character .persent-char progress[value] {
		max-width: 140px;
		max-height: 8px;
		margin-bottom:7px;
	}
	.slide-profile {
		margin:10% 0 4%;

	}
	.slide-profile .a-desc-profile {
		margin-left: 10%;
	}
	.slide-profile .a-desc-profile .foto-profile {
		width: 80px;
		height: 80px;
	}
	.slide-profile .a-desc-profile .foto-profile img {
		width: 100%;
		border-radius: 50%;
	}
	.slide-profile .a-desc-profile .status-profile {
		padding: 0;
		width: 190%;
		position: absolute;
		left: 65px;
		top: 15px;
	}
	.slide-profile .a-desc-profile .status-profile p {
		color: #fff;
		margin: 0;
		font-size: 10px;
		padding: 7px 20px;
	}
}
/*mobile landscape*/
@media all and (min-width: 481px) and (max-width: 767px) {
	.profile {
		width: 100%;
	}
	.profile h1 {
		font-size: 20px;
	}
	.profile .a-desc {
		max-width: 100%;
		position: relative;
		align-items: center;
		margin: 10px 0;
		justify-content: center;
		z-index: -1;
	}
	.profile .a-desc .foto {
		max-width: 100px;
		max-height: 100px;
		background-color: #fff;
		border-radius: 50%;
		border: 1px solid #ccc;
		display: inline-block;
		z-index: 1;
	}
	.profile .a-desc .foto img{
		max-width: 100px;
		max-height: 100px;
		border-radius: 50%;
	}
	.profile .a-desc .status {
		background-color: #c41e30;
		text-align: left;
		display: inline-block;
		padding: 10px 0;
		max-width: 100%;
		position: relative;
		left: -2%;
		border-bottom-right-radius: 30% 100%;
	}
	.profile .a-desc .status hr {
		width: 80%;
		margin:0;
		height: 1px;
		border: 0;
		background: #8e8e8e;
	}

	.profile .a-desc .status p {
		color: #fff;
		margin: 0;
		font-size: 10px;
		padding: 2px 20px;
	}
	.profile-desc{
		background: #fff;
		padding: 20px;
		width: 85%;
		display: inline-block;
		text-align: center;
		font-size: 20px;
		box-shadow: 0 0 50px rgba(0,0,0,0.15);
		margin-bottom: 29px;
		margin-top: 6px;
	}
	.profile-desc .hr{
		display: none;
	}
	.profile-desc .bio {
		text-align: left;
		width: 100%;
		border-right: none;
		border-bottom: 2px solid #ccc;
	}
	.profile-desc .bio h2 {
		font-size: 15px;
		color: #000;
		font-family: sans-serif;
		font-weight: normal;
		height: 15%;
	}
	.personality {
		width: 100%;
		margin: 15px 0;
	}
	.personality h1 {
		font-size: 15px;
		color: #000;
	}
	.personality .skill .list-skill ul {
		display: inline-block;
	}
	.personality .skill .list-skill li {
		margin-bottom: 5px;
		font-size: 15px;
	}
	.personality .character .character-list h1 {
		font-size: 15px;
	}

	.personality .character .character-list ul {
		margin-top: 10px;
	}
	.personality .character .character-list ul li {
		font-size: 15px;
		margin: 5px;
	}
	.slide-profile .a-desc-profile {
		margin-left: 15%;
	}
}
/*mobile and down*/
@media all and (max-width: 480px) {
	.profile {
		width: 100%;
	}
	.profile h1 {
		font-size: 20px;
	}
	.profile .a-desc {
		width: 100%;
		position: relative;
		align-items: center;
		margin: 10px 0;
		justify-content: center;
		height: 100px;
	}
	.profile .a-desc .foto {
		max-width: 80px;
		max-height: 80px;
		background-color: #fff;
		border-radius: 50%;
		border: 1px solid #ccc;
		display: inline-block;
		position: relative;
		right: 70px;
	}
	.profile .a-desc .foto img{
		max-width: 80px;
		max-height: 80px;
		border-radius: 50%;
	}
	.profile .a-desc .status {
		background-color: #c41e30;
		text-align: left;
		display: inline-block;
		padding: 10px 0;
		width:45%;
		position: absolute;
		left: 35%;
		border-bottom-right-radius: 30% 100%;
	}
	.profile .a-desc .status hr {
		width: 80%;
		margin:0;
		height: 1px;
		border: 0;
		background: #8e8e8e;
	}

	.profile .a-desc .status p {
		color: #fff;
		margin: 0;
		font-size: 10px;
		padding: 2px 35px;
	}
	.profile-desc{
		background: #fff;
		padding: 20px;
		width: 90%;
		display: inline-block;
		text-align: center;
		font-size: 20px;
		box-shadow: 0 0 50px rgba(0,0,0,0.15);
		margin-bottom: 29px;
		margin-top: 6px;
	}
	.profile-desc .hr{
		display: none;
	}

	.profile-desc .bio {
		text-align: left;
		width: 100%;
		border-right:none;
		border-bottom: 1px solid #ccc;
		max-height: 40vh;
	}
	.profile-desc .bio h2 {
		font-size: 10px;
		color: #000;
		font-family: sans-serif;
		font-weight: normal;
		height: 15%;
	}
	.personality {
		width: 100%;
		margin: 10px 0;
	}
	.personality h1 {
		font-size: 10px;
		color: #000;
	}
	.personality .skill .list-skill ul {
		display: inline-block;

	}
	.personality .skill .list-skill li {
		margin-bottom: 5px;
		margin: 0;
		font-size: 10px;
	}
	.personality .skill .list-skill ul li{
		font-size: 10px;
	}
	.personality .skill .persent {
		height: 15px;
	}

	.personality .skill .persent progress {
		width: 115px;
		height: 7px;
		margin-bottom: 5px;
	}
	.personality .character .character-list h1 {
		font-size: 10px;
		display: block;
	}

	.personality .character .character-list ul {
		margin: 0;
	}
	.personality .character .character-list ul li {
		font-size: 10px;
		margin-bottom: 0px;
		/*padding: 3px;*/
	}
	.personality .character .persent-char {
		height: 16px;
	}
	.personality .character .persent-char progress {
		width: 115px;
		height: 7px;
		margin-bottom: 5px;
	}
	.slide-profile {
		margin:20px 0 20px;

	}
	.slide-profile .a-desc-profile {
		margin-left: 15%;
	}
	.slide-profile .a-desc-profile .foto-profile {
		width: 70px;
		height: 70px;
		position: relative;
		left: -20px;
	}
	.slide-profile .a-desc-profile .foto-profile img {
		width: 100%;
		border-radius: 50%;
	}
	.slide-profile .a-desc-profile .status-profile {
		padding: 0;
		width: 210%;
		position: absolute;
		left: 40px;
		top: 14px;
	}
	.slide-profile .a-desc-profile .status-profile p {
		color: #fff;
		margin: 0;
		font-size: 10px;
		padding: 5px 15px;
	}
}

</style>