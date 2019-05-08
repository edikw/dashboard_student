<template>
  <div id="app">
    <div class="nav" v-if="$route.name!='home'">
      <router-link to="/"><img src="./assets/logo_black.png" id="doesLogo"></router-link>
      <nav role="navigation">
        <div id="menuToggle">
          <input type="checkbox" ref="checkbox">
          <div class="burger">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <ul id="menu" v-on:click="hide" >
            <router-link to="/about"><li id="about-img"><img src="./assets/logo/about_grey.png" ><span>About</span></li></router-link>

            <router-link to="/founder"><li  id="founder-img"><img src="./assets/logo/founder_grey.png"><span>Founder</span></li></router-link>

            <router-link to="/student"><li id="student-img"><img src="./assets/logo/student_grey.png"><span>Students</span></li></router-link>

            <router-link to="/gallery"><li id="gallery-img"><img src="./assets/logo/gallery_grey.png"><span>Gallery</span></li></router-link>

            <router-link to="/ourwork"><li id="work-img"><img src="./assets/logo/ourwork_grey.png"><span>Our Works</span></li></router-link>
          </ul>
        </div>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        url: {
          student: 'http://192.168.2.231:8000/v1/student',
          about: 'http://192.168.2.231:8000/v1/about',
          founder: 'http://192.168.2.231:8000/v1/founder',
          major: 'http://192.168.2.231:8000/v1/major',
          work: 'http://192.168.2.231:8000/v1/ourwork',
        }
      }
    },
    methods: {
      hide() {
        this.$refs.checkbox.checked = false;
      }
    }
  }
</script>

<style>
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  body {
    margin: 0 auto;
    background-color: #f4f4f4;
  }
  #app {
    height: 100vh;
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #2c3e50;
    display: inline-flex;
  }
  #doesLogo {
    margin-top: 30px;
  }
  #menuToggle input {
    display: none;
  }
  .nav {
    position: relative;
    background-color: #fff;
    height: 100vh;
    width: 113px;
    display: inline-block;
    text-align: center;
  }
  ul #menu {
    left: 0;
  }
  .nav ul {
    padding: 0;
    margin: 0;
  }
  .nav ul li {
    list-style: none;
    padding: 0px 10px;
    margin: 40px 0;
  }
  .nav ul li span {
    display: block;
  }
  .nav ul a{
    text-decoration: none;
    color: #ccc;
    font-size: 14px;
  }
  .nav ul a li:hover {
    color: #c41e30;
    border-right: 5px solid #c41e30;
    /*border-right-style: dotted;*/
  }
  .nav ul a #about-img:hover img{
    content: url("./assets/logo/about_red.png");
  }
  .nav ul a #founder-img:hover img {
    content: url("./assets/logo/founder_red.png");
  }
  .nav ul a #student-img:hover img{
    content: url("./assets/logo/student_red.png");
  }
  .nav ul a #gallery-img:hover img{
    content: url("./assets/logo/gallery_red.png");
  }
  .nav ul a #work-img:hover img{
    content: url("./assets/logo/ourwork_red.png");
  }
  .back {
    display: inline-block;
    width: 100%;
    text-align: right;
    padding: 20px;
  }
  .back #backImg {
    cursor: pointer;
    width: auto;
  }
  .a {
    text-align: center;
  }

  @media all and (min-width: 768px) and (max-width: 1024px) {
    #app {
      display: inline-block;
    }
    .nav {
      position: static;
      height: 0;
      width: 0;
      display: inline;
    }
    #doesLogo {
      display: none;
    }
    a {
      text-decoration: none;
      color: #232323;
      transition: color 0.3s ease;
    }

    #menuToggle {
      display: block;
      position: relative;
      top: 30px;
      left: 30px;
      z-index: 1;
      -webkit-user-select: none;
      user-select: none;
      width: 0;
    }
    #menuToggle input:checked ~ ul {
      transform: none;
      padding-top: 65px;
    }

    #menuToggle input {
      display: block;
      width: 40px;
      height: 32px;
      position: absolute;
      top: -7px;
      left: -5px; 
      cursor: pointer;
      opacity: 0; /* hide this */
      z-index: 2; /* and place it over the hamburger */
      
      -webkit-touch-callout: none;
    }

    .burger span {
      display: block;
      width: 35px;
      height: 4px;
      margin-bottom: 5px;
      position: relative;
      background: #cdcdcd;
      border-radius: 3px;
      z-index: 1;
      background-color: #000;
      transform-origin: 4px 0px;
      transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                  background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                  opacity 0.55s ease;
    }

    .burger span:first-child {
      transform-origin: 0% 0%;
    }

    .burger span:nth-last-child(2) {
      transform-origin: 0% 100%;
    }

    #menuToggle input:checked ~ .burger span {
      opacity: 1;
      transform: rotate(45deg) translate(1px, -19px);
      background: #fff;
    }

    #menuToggle input:checked ~ .burger span:nth-last-child(3) {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }

    #menuToggle input:checked ~ .burger span:nth-last-child(2) {
      transform: rotate(-45deg) translate(-2px, 22px);
    }

    #menuToggle input:checked ~ #menu {
      left: 0;
    }

    #menu {
      position: fixed;
      left: -100%;
      top: 0;
      height: 100%;
      background: #000;
      list-style-type: none;
      -webkit-font-smoothing: antialiased;      
      padding-top: 65px;
      transition: 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
    }

    #menu li {
      text-align: center;
      padding: 0px 15px;
      margin: 50px 0;
      font-size: 1.3em;
    }

    #menu li img  {
      max-width: 40px;
    }

    #menuToggle input:checked ~ ul {
      transform: none;
    }
    .nav ul a li:hover {
      border-right: none;
    }
  }

  /*mobile landscape*/
  @media all and (min-width: 481px) and (max-width: 767px) {
    #app {
      display: inline-block;
    }
    .nav {
      position: static;
      height: 0;
      width: 0;
      display: inline;
      z-index: 0;
    }
    #doesLogo {
      display: none;
    }

    #menuToggle {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 0;
    }
    #menuToggle input {
    display: inline;
    }
    #menuToggle input:checked ~ #menu {
      left: 0;
    }

    #menuToggle input {
      border: 1px solid black;
      width: 30px;
      height: 30px;
      position: fixed;
      top: 15px;
      left: 15px; 
      cursor: pointer;
      opacity: 0;
      z-index: 9999;
      
      /*-webkit-touch-callout: none;*/
    }

    #menuToggle .burger span {
      display: block;
      width: 25px;
      height: 4px;
      margin-bottom: 5px;
      position: relative;
      background: #cdcdcd;
      border-radius: 3px;
      z-index: 1;
      background-color: #000;
      transform-origin: 4px 0px;
      transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                  background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                  opacity 0.55s ease;
    }

    .burger {
      position: fixed;
      top: 15px;
      left: 15px;
      z-index: 999;
      margin: 0;
    }

    .burger span:first-child {
      transform-origin: 0% 0%;
    }

    .burger span:nth-last-child(2) {
      transform-origin: 0% 100%;
    }

    #menuToggle input:checked ~ .burger span {
      opacity: 1;
      transform: rotate(45deg) translate(-5px, -13px);
      background: #fff;
    }

    #menuToggle input:checked ~ .burger span:nth-last-child(3) {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }

    #menuToggle input:checked ~ .burger span:nth-last-child(2) {
      transform: rotate(-45deg) translate(-4px, 8px);
    }

    #menu {
      position: fixed;
      width: 100%;
      left: -100%;
      top: 0;
      background: #000;
      opacity: 0.8;
      transition: 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
      display: inline-flex;
      justify-content: space-around;
      z-index: 9;
      padding-left: 30px;
    }

    #menu li {
      margin: 1rem 0;
    }

    #menu li span {
      font-size: 0.8em;
    }

    #menu li img  {
      max-width: 30px;
    }
    .nav ul a li:hover {
      border-right: none;
    }
  }

  /*mobile and down*/
  @media all and (max-width: 480px) {
    #app {
      display: inline-block;
    }
    .nav {
      position: absolute;
      height: 0;
      width: 0;
      display: inline;
    }
    #doesLogo {
      display: none;
    }
    a {
      text-decoration: none;
      color: #232323;
      transition: color 0.3s ease;
    }

    #menuToggle {
      display: block;
      position: relative;
      top: 30px;
      left: 30px;
      z-index: 1;
      -webkit-user-select: none;
      user-select: none;
      width: 0;
    }
    #menuToggle input:checked ~ ul {
      transform: none;
      padding-top: 65px;
    }

    #menuToggle input {
      display: block;
      width: 40px;
      height: 32px;
      position: absolute;
      top: -7px;
      left: -5px; 
      cursor: pointer;
      opacity: 0;
      z-index: 2;
      -webkit-touch-callout: none;
    }

    .burger span {
      display: block;
      width: 25px;
      height: 4px;
      margin-bottom: 5px;
      position: relative;
      background: #cdcdcd;
      border-radius: 3px;
      z-index: 1;
      background-color: #000;
      transform-origin: 4px 0px;
      transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                  background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                  opacity 0.55s ease;
    }

    .burger span:first-child {
      transform-origin: 0% 0%;
    }

    .burger span:nth-last-child(2) {
      transform-origin: 0% 100%;
    }

    #menuToggle input:checked ~ .burger span {
      opacity: 1;
      transform: rotate(45deg) translate(-20px, -20px);
      background: #fff;
    }

    #menuToggle input:checked ~ .burger span:nth-last-child(3) {
      opacity: 0;
      transform: rotate(0deg) scale(0.2, 0.2);
    }

    #menuToggle input:checked ~ .burger span:nth-last-child(2) {
      transform: rotate(-45deg) translate(5px, -3px);
    }

    #menuToggle input:checked ~ #menu {
      left: 0;
    }

    #menu {
      position: fixed;
      left: -100%;
      top: 0;
      height: 100%;
      background: #000;
      list-style-type: none;
      -webkit-font-smoothing: antialiased;      
      padding-top: 65px;
      transition: 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
    }

    #menu li {
      text-align: center;
      padding: 0px 10px;
      margin: 42px 0;
      font-size: 0.8em;
    }

    #menu li img  {
      max-width: 30px;
    }

    #menuToggle input:checked ~ ul {
      transform: none;
    }
    .nav ul a li:hover {
      border-right: none;
    }
  }
</style>
