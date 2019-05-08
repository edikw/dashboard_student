<template>
  <div class="student">
    <div class="back">
      <a @click="$router.go(-1)"><img id="backImg" src="../assets/logo/back.png"></a>
    </div>
    <div class="head">
      <h1>STUDENTS</h1>
      <hr>
    </div>
    <form>
      <input type="text" placeholder="Search" v-model="searchThis">
      <button type="button"  v-on:click="search"></button>
    </form>
    <div class="student-desc">
      <div class="student-wrapper">

        <template v-if="searchResult.length>0">
          <div>
            <h1>Search Result:</h1>
            <div class="a">
              <Carousel :perPage="1" :navigationEnabled="true" :mouseDrag="true" paginationPadding='0 2' paginationSize='9' paginationActiveColor="#c41e30">
                <Slide 
                  v-for="(student, key) in searchResult">
                    <router-link :to="{name:'profile', params: {selected_student: student}}">
                      <div class="a-desc-search">
                        <div class="search-foto">
                          <img v-bind:src="student.img">
                        </div>
                        <div class="search-status">
                          <p><strong>{{student.name}}</strong></p>
                          <hr>
                          <p>{{student.major | majorToName}}</p>
                        </div>
                      </div>
                    </router-link>
                </Slide>
              </Carousel>
            </div>
            <hr>
          </div>
        </template>
        <template v-else>
          <div class="noResult" v-if="isSearching">
            <div class="no-result">
              <h1>No Result !!</h1>
            </div>
            <button @click="isSearching=false">Close</button>
            <hr>
          </div>
        </template>
          <template v-for="(group, key) in finaldata">
            <div v-for="major in group.majors">
              <div class="slider-container" :key="key" v-if="major.students.length > 0">
                <div class="slider-title" >
                  <h1>{{major.major_data.name}}/{{group.gen}}</h1>
                  <p>{{major.students.length}} Students</p>
                </div>
                <Carousel :perPageCustom="[[300, 1],[480, 1],[640, 1],[730, 2], [732, 1], [768, 2], [1024, 3], [1366, 2], [1367, 3], [1920, 3], [1080, 1]]" :navigationEnabled="true" :mouseDrag="true" paginationActiveColor="#c41e30">
                  <Slide v-for="student in major.students" >
                    <router-link :to="{name:'profile', params: {selected_student: student, selected_slide: major.students}}">
                      <div class="a-desc">
                        <div class="foto">
                          <img >
                        </div>
                        <div class="status">
                          <p><strong>{{student.name}}</strong></p>
                          <hr>
                          <p>{{student.major | majorToName}}</p>
                        </div>
                      </div>
                    </router-link>
                  </Slide>
                </Carousel>
                <hr>
              </div>
            </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel';
  import router from '../router.js'

  export default {
    name: 'student',
    components: {
      Carousel,
      Slide,
    },
    data () {
      return {
        databackend: [],
        databackendMajor:[],
        jumlahGenDatabackend:[],
        genstudents: [],
        studentsByGen: [],
        groupingend: [],
        finaldata : [],
        searchThis: '',
        isSearching: false,
        searchResult: []
      }
    },
    mounted() {
      var self = this;

      // ---------------------------------------------------------------------
      // DATA BACKEND 
      console.log('skilll',router.app.student_skill)
      this.databackend = router.app.student
      this.databackendMajor = router.app.major

      console.log('STUDENTS: ', this.databackend)
      console.log('MAJORS', this.databackendMajor)

      // GROUPING MAUT
      this.finaldata = this.groupingMaut(this.databackend, this.databackendMajor);
      console.log('final data', this.finaldata)
    },

    methods: {

      search(){
          this.isSearching = true;
          var keyword = this.searchThis.toLowerCase();
          console.log(keyword);
          var result = [];
          this.databackend.map( student => {
            if( keyword == student.name.toLowerCase() ){
              result.push(student);
            }
          });

          this.searchResult = result;
          console.log('tesss', searchResult);

      },

      groupingMaut(students, majors){
        // console.clear();
        console.log(students, majors);

        var resultByMajor = [];
        var result = [];

        var gens = this.filterGen(this.gen(students));

        // generate major object + studentsnya (major object only, tanpa gen)
        for (var i = 0; i < majors.length; i++) {
          resultByMajor.push({
            major_data: majors[i],
            students: []
          })
        }

        // push students by major only (gen nya campur2)
        for (var i = 0; i < students.length; i++) {
          for (var j = 0; j < resultByMajor.length; j++) {
            if(students[i].major === resultByMajor[j].major_data.id){
              resultByMajor[j].students.push(students[i]);
            }
          }
        }

        // build result skeleton (students by major && students by gen masih kosong)
        for (var i = 0; i < gens.length; i++) {

          var _m = [];

          for (var j = 0; j < majors.length; j++) {
            _m.push({
             major_data: majors[j],
             students: [] 
            });
          }

          result.push({
            gen: gens[i],
            majors: _m,
            students: []
          });
        }

        // push students by major
        for (var i = 0; i < students.length; i++) {
          for (var j = 0; j < result.length; j++) {

            // by gen dulu
            if(students[i].generations === result[j].gen){
              // push by gen
              result[j].students.push(students[i]);

              // loop by major di setiap generasinya
              for (var k = 0; k < result[j].majors.length; k++) {
                // lanjut by major
                if(students[i].major === result[j].majors[k].major_data.id){
                  // push by major
                  result[j].majors[k].students.push(students[i])
                }
              }
            }
          }
        }

        console.log(result)

        this.checkStudents(result, resultByMajor);
        return result
        // return resultByMajor
      },

      // -------------------------------------------------------------------------
      // JUMLAH GEN
      gen(generasi){
        var filtered = [];

        generasi.map((stud, i)=>{
          var gen = false;
          if(filtered.length == 0){
            gen = false;
          }else {
            filtered.map(a=>{
              if(stud.generations != a || i == 0){
                gen = false;
              }else{
                gen = true;
              }
            });
          }
          if(gen == false){
            filtered.push(stud.generations)
          }
        });
        return filtered;
      },

      // -------------------------------------------------------------------------
      // FILTER JUMLAH GEN
      filterGen(gen){

        var listgen = []

        gen.map(g => {
          var isUnique = true;

          listgen.map(l => {
            // if sudah ada, berarti tidak unik.
            if( g == l ){
              isUnique = false;
            }
          });

          // loopnya sudah selesai, if unik = push
          if(isUnique === true) {  
            listgen.push(g)
          }
        });
        listgen.sort()
        return listgen
      },

      checkStudents(result, resultByMajor){
        for (var i = 0; i < result.length; i++) {
          var r = result[i];
          console.log('MURID GEN ' + r.gen + ': ', r.students)
          for (var j = 0; j < r.majors.length; j++) {
            if(r.majors[j].students.length !== 0){
              // console.log('MURID GEN ' + r.gen + ' JURUSAN '+ r.majors[j].major_data.name +': ', r.majors[j].students)
            }else{
              // console.log('MURID GEN ' + r.gen + ' JURUSAN '+ r.majors[j].major_data.name +': Tidak Ada')
            }

          }
        }

        for (var i = 0; i < resultByMajor.length; i++) {
          var r = resultByMajor[i];
          console.log('MURID JURUSAN ' + r.major_data.name + ': ', r.students)
        }
      },

    },
    filters: {

      majorToName(val){
        var name = []
        router.app.major.map(data=>{
          if(data.id === val){
            name = data.name;
          }
          // console.log('tessss', data)
        })
        return name;
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
.VueCarousel-slide {
  padding: 10px;
  text-align: left;
}
.student {
  width: 92.5%;
  display: inline-block;
  text-align: center;
}
.student h1 {
  color: #c41e30;
  font-family: monospace, sans-serif;
  margin: 0;
  display: inline-block;
}
.student .head hr {
  width: 50%;
  border: 0;
  height: 2px;
  background-color: #ccc;
}
.student form {
  margin: 20px 0;
  display: flex;
  justify-content: center;
}
.student form input {
  width: 35%;
  margin-right: 5px;
  border-radius: 10px;
  padding: 15px;
  border: 1px #ccc solid;
} 
.student form button {
  height: 50px;
  width: 5%;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #fff;
  background-image: url(../assets/logo/icon.png);
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
}
.student form button:hover {
  background-color: #c41e30;
  color:#fff;
  cursor: pointer;
  background-image: url(../assets/logo/icon_2.png);
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
}
.student .head h1 {
  margin: 0;
  padding: 0;
}
.student .student-desc .student-wrapper {
  width: 70%;
  padding: 50px;
  height: 70vh;
  overflow: overlay;
  background-color: #fff;
  display: inline-block;
  box-shadow: 0 0 50px rgba(0,0,0,0.15);
  text-align: left;
}
.student .student-desc .student-wrapper .a {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.student .student-desc .student-wrapper hr {
  width: 70%;
  border: 0;
  height: 2px;
  background-color: #ccc;
}

.student .student-desc .student-wrapper h1 {
  font-family: monospace;
  color: #000;
  font-size: 20px;
  margin: 0;
}
.student .student-desc .student-wrapper p {
  color: #c41e30;
  font-style: italic;
  font-size: 20px;
  padding: 0;
  margin: 0;
}
.student .student-desc .student-wrapper ul {
  margin: 0;
  padding: 0;
  text-align: center;
}
.student .student-desc .student-wrapper ul li a{
  text-decoration: none;
}

.student .student-desc {
  width: 100%;
}
.student .student-desc .student-wrapper .a-desc {
  display: inline-flex;
  position: relative;
  margin-left: 10px;
}

.student .student-desc .student-wrapper .a-desc .foto {
  width: 100px;
  height: 100px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #ccc;
  display: inline-block;
  z-index: 1;
}

.student .student-desc .student-wrapper .a-desc .foto img {
  width: 100%;
  border-radius: 50%;
}

.student .student-desc .student-wrapper .a-desc .status {
  background-color: #c41e30;
  text-align: left;
  display: inline-block;
  padding: 6px 0;
  width: 165%;
  position: absolute;
  left: 80px;
  top: 17px;
  border-bottom-right-radius: 30% 100%;
}

.student .student-desc .student-wrapper .a-desc .status hr {
  width: 80%;
  margin:0;
  height: 1px;
  border: 0;
  background: #8e8e8e;
}

.student .student-desc .student-wrapper .a-desc .status p {
  color: #fff;
  font-size: 15px;
  padding: 5px 30px;
}
.student .student-desc .student-wrapper .a-desc-search {
  display: inline-flex;
  position: relative;
  margin-left: 250px;
}
.student .student-desc .student-wrapper .a-desc-search .search-status {
  background-color: #c41e30;
  text-align: left;
  display: inline-block;
  padding: 4px 0;
  width: 165%;
  position: absolute;
  left: 120px;
  top: 25px;
  border-bottom-right-radius: 30% 100%;
}

.student .student-desc .student-wrapper .a-desc-search .search-status hr {
  width: 80%;
  margin:0;
  height: 1px;
  border: 0;
  background: #8e8e8e;
}

.student .student-desc .student-wrapper .a-desc-search .search-status p {
  color: #fff;
  font-size: 15px;
  padding: 15px 40px;
}
.student .student-desc .student-wrapper .a-desc-search .search-foto {
  width: 150px;
  height: 150px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #ccc;
  display: inline-block;
  z-index: 1;
}

.student .student-desc .student-wrapper .a-desc-search .search-foto img {
  width: 100%;
  border-radius: 50%;
}
.slide-content div{
  position: relative;
  top: 25px;
  left: -25px;
}
.noResult {
  text-align: center;
  margin-bottom: 100px;
  height: 20vh;
}
.noResult hr {
  width: 100%;
  position: relative;
  top: 50%;
}
.noResult .no-result {
  height: 40%;
}
.noResult .no-result h1{
  margin-top: 20px;
}

button {
  cursor: pointer;
  position: relative;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background-color: #fff;

}
button:hover {
  background-color: #c41e30;
  color: #fff;
}

.VueCarousel {
  width: 80%;
  display: inline-block;
}
.VueCarousel-inner {
  flex-basis: 255px;
}
.slider-container {
  text-align: center;
}
.slider-title {
  text-align: left;
}

@media all and (min-width: 768px) and (max-width: 1024px) {
  .student {
    width: 100%;
  }
  .student h1 {
    font-size: 35px;
  }
  .student form input {
    height: 50px;
  }
  .student form button {
    width: 60px;
  }
  .student .student-desc .student-wrapper {
    padding: 5px;
    width: 90%;
  }
  .student .student-desc .student-wrapper h1 {
    font-size: 15px;
  }
  .student .student-desc .student-wrapper p {
    font-size: 15px;
  }
  .student .student-desc .student-wrapper .a-desc {
    display: inline-flex;
    position: relative;
    align-items: center;
    margin-left: 20px;
  }
  .student .student-desc .student-wrapper .a-desc .foto {
    max-width: 80px;
    max-height: 80px;
    background-color: #fff;
    border-radius: 50%;
    border: 1px solid #ccc;
    display: inline-block;
    z-index: 1;
  }
  .student .student-desc .student-wrapper .a-desc .status {
    background-color: #c41e30;
    text-align: left;
    display: inline-block;
    padding: 6px 0;
    position: absolute;
    left: 60px;
    top: 13px;
    border-bottom-right-radius: 30% 100%;
  }
  .student .student-desc .student-wrapper .a-desc .status p {
    color: #fff;
    font-size: 10px;
    padding: 5px 30px;
  }
  .student .student-desc .student-wrapper .a .a-desc-search {
    margin-left: 20%;
  }
}

/*mobile landscape*/
@media all and (min-width: 481px) and (max-width: 767px) {
  .student {
    width: 100%;
  }
  .student h1 {
    font-size: 20px;
  }
  .student form input {
    height: 0;
  }
  .student form button {
    height: 0;
    z-index: -1;
  }
  .student .student-desc .student-wrapper {
    padding: 5px;
    width: 90%;
  }
  .student .student-desc .student-wrapper h1 {
    font-size: 15px;
  }
  .student .student-desc .student-wrapper p {
    font-size: 15px;
  }
  .student .student-desc .student-wrapper .a-desc {
    display: inline-flex;
    position: relative;
    align-items: center;
    margin-left: 25%;
  }
  .student .student-desc .student-wrapper .a-desc-search {
    margin-left: 50px;
  }
}

/*mobile and down*/
@media all and (max-width: 480px) {
  .student {
    width: 100%;
  }
  .student h1 {
    font-size: 20px;
  }
  .student form input {
    height: 0;
  }
  .student form button {
    height: 0;
  }
  .student .student-desc .student-wrapper {
    padding: 5px;
    width: 90%;
  }
  .student .student-desc .student-wrapper h1 {
    font-size: 10px;
    font-weight: normal;
  }
  .student .student-desc .student-wrapper p {
    font-size: 10px;
  }
  .student .student-desc .student-wrapper .a-desc {
    display: inline-flex;
    position: relative;
    align-items: center;
    margin-left: 10%;
  }
  .student .student-desc .student-wrapper .a-desc .status {
    width: 130%;
  }
  .student .student-desc .student-wrapper .a-desc .status p {
    font-size: 5px;
  }
  .student .student-desc .student-wrapper .a .a-desc-search {
    margin-left: 10%;
  }
  .student .student-desc .student-wrapper .a-desc-search .search-foto{
    max-width: 100px;
    max-height: 100px;
  }
  .student .student-desc .student-wrapper .a-desc-search .search-status{
    left: 75px;
    top: 18px;
    width: 135px;
  }
  .student .student-desc .student-wrapper .a-desc-search .search-status p{
    padding: 5px 30px;

  }

}
@media all and (max-width: 320px) {
    .student .student-desc .student-wrapper .a .a-desc-search {
      margin-left: 0px;
    }
    .student .student-desc .student-wrapper .a-desc {
      margin-left: 0px;
    }


}
@media all and (min-width: 500px) and (max-width: 568px) {
  .student .student-desc .student-wrapper .a .a-desc-search {
      margin-left: 3%;
    }

}

@media all and (min-width: 1079px) and (max-width: 1080px) {
  .student .student-desc .student-wrapper .a-desc {
      margin-left: 20%;
  }
  .student .student-desc .student-wrapper .a-desc-search {
      margin-left: 10%;
  }
}
@media all and (min-width: 1081px) and (max-width: 1366px) {
  .student .student-desc .student-wrapper .a-desc {
      margin-left: 10%;
  }
  .student .student-desc .student-wrapper .a-desc-search {
      margin-left: 20%;
  }
}

</style>
