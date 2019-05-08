 <template>
	<div class="home">
		<div class="logo">
			<img src="../assets/logo_black.png">
		</div>
		<ul>
			<li id="about-img-home"><router-link to="/about"><img src="../assets/logo/about_grey_home.png"><p>About</p></router-link></li>
			<li id="founder-img-home"><router-link to="/founder"><img src="../assets/logo/founder_grey_home.png"><p>Founder</p></router-link></li>
			<li id="student-img-home"><router-link to="/student"><img src="../assets/logo/student_grey_home.png"><p>Students</p></router-link></li>
			<li id="gallery-img-home"><router-link to="/gallery"><img src="../assets/logo/gallery_grey_home.png"><p>Gallery</p></router-link></li>
			<li id="work-img-home"><router-link to="/ourwork"><img src="../assets/logo/ourwork_grey_home.png"><p>Our Works</p></router-link></li>
		</ul>
	</div>
</template>

<script>

</script>

<style scoped>
	* {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}
	.home {
		width: 100%;
	}
	.home .logo img{
		margin-top: 15px;
		padding: 15px;
	}
	.home ul {
		padding: 0;
		margin: 0;
		display: flex;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
	}
	.home ul li {
		list-style: none;
		background-color: #fff;
		display: flex;
		margin: 7px;
		height: 300px;
		text-align: center;
		justify-content: center;
		align-content: center;
		align-items: center;
		padding: 50px;
		box-shadow: 0 0 50px rgba(0,0,0,0.15);
	}
	.home ul li a {
		text-decoration: none;
		color: #ccc;
		font-size: 20px;
	}

	.home ul li:hover a {
		color: #c31d2f;
	}
	.home ul li img {
		width: 100px;
		margin: 20px 0;
		display: inline-block;
	}
	#about-img-home:hover img{
		content: url("../assets/logo/about_red_home.png");
		/*background-size: 50%;*/
	}
	#founder-img-home:hover img{
		content: url("../assets/logo/founder_red_home.png");
		background-size: 50%;
	}
	#student-img-home:hover img{
		content: url("../assets/logo/student_red_home.png");
		background-size: 100%;
	}
	#gallery-img-home:hover img{
		content: url("../assets/logo/gallery_red_home.png");
		background-size: 100%;
	}
	#work-img-home:hover img{
		content: url("../assets/logo/ourwork_red_home.png");
		background-size: 100%;
	}
	/*#about-img-home:hover{
		
	}
	#founder-img-home:hover{
		
	}
	#student-img-home:hover{
		
	}
	#gallery-img-home:hover{
		
	}
	#work-img-home:hover{
		
	}*/

	/*tablet*/
	@media all and (min-width: 768px) and (max-width: 1024px) {
		.home {
			text-align: center;
		}
		.home .logo {
			text-align: center;
		}
		.home .logo img {
			width: 20%;
		}

		.home ul {
			display: inline-block;
			text-align: center;
			position: static;
			left: 0;
			top: 0;
			transform: none;
			padding: 0;
			margin: 0;
			width: 100%;
			height: auto;
			/*margin-top: 25px;*/
		}
		.home ul li {
			display: inline-block;
			padding: 0;
			height: auto;
			width: 40%;
			padding: 20px 0;
			/*height: 20vh;*/
		}
		.home ul li img {
			width: 80px;
			margin-top: 15px;

		}
		.home ul li p {
			margin: 0;
			font-size: 25px;
		}
	}

	/*mobile landscape*/
	@media all and (min-width: 481px) and (max-width: 767px) {
		.home {
			text-align: center;
		}
		.home .logo {
			text-align: center;
		}
		.home ul {
			/*display: inline-block;*/
			text-align: center;
			position: static;
			left: 0;
			top: 0;
			transform: none;
			padding: 0;
			margin: 0;
		}
		.home ul li {
			display: inline-block;
			padding: 0;
			height: auto;
			width: 40%;
			padding: 25px 0;
		}
		.home ul li img {
			width: 50px;
			margin: 0;
		}
		.home ul li p {
			margin: 0;
			font-size: 15px;
		}
	}

	/*mobile and down*/
	@media all and (max-width: 480px) {
		.home {
			text-align: center;
		}
		.home .logo {
			text-align: center;
		}
		.home ul {
			display: inline-block;
			text-align: center;
			position: static;
			left: 0;
			top: 0;
			transform: none;
			padding: 0;
			margin: 0;
		}
		.home ul li {
			display: inline-block;
			padding: 0;
			height: auto;
			width: 40%;
			padding: 25px 0;
		}
		.home ul li img {
			width: 50px;
			margin: 0;
		}
		.home ul li p {
			margin: 0;
			font-size: 15px;
		}
	}

</style>