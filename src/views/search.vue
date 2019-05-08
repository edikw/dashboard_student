<template>
	<div class="searchtry">
		<div class="multi">
			<multiselect v-model="value" :options="options" :custom-label="nameWithLang" placeholder="Select one" label="name" track-by="name"></multiselect>

			<pre class="language-json" v-for="i in value"><code>{{ i }}</code></pre>
		</div>
	</div>
</template>

<script>
	import Multiselect from 'vue-multiselect'

	export default {
		components: {
		Multiselect
		},
		data () {
			return {
				value: null,
				options: [
				{ name: 'jarnmbk', jurusan: 'Javipt' },
				{ name: 'Rails', jurusan: 'Ruy' },
				{ name: 'Sinatra', jurusan: 'uby' },
				{ name: 'Lavel', jurusan: 'HP'},
				{ name: 'Phoenix', jurusan: 'Eixir'},
				{ name: 'Rjaran', jurusan: 'uby' },
				{ name: 'Sina', jurusan: 'Rby' },
				{ name: 'Lavel', jurusan: 'PP'},
				{ name: 'Phnix', jurusan: 'Exir'},
				{ name: 'ue.s', jurusan: 'JavaScript' },
				{ name: 'ails', jurusan: 'Ruy' },
				{ name: 'inatra', jurusan: 'Rby' },
				{ name: 'Lravel', jurusan: 'PH'},
				{ name: 'Phenix', jurusan: 'Elir'},
				{ name: 'Rjran', jurusan: 'uby' },
				{ name: 'Sia', jurusan: 'Rby' },
				{ name: 'Lvel', jurusan: 'PP'},
				{ name: 'Pnix', jurusan: 'Exir'}
				]
			}
  		},
  		methods: {
    		nameWithLang ({ name, jurusan }) {
    		return `${name} , ${jurusan}`
    		}
  		}
 	}

</script>
<style>
	
	.searchtry {
	 	width: 100%;
	 	display: flex;
	 	justify-content: center;
	 	align-content: center;
	 }
	 .multi {
	 	margin-top: 30px;
	 }
	 .multiselect__tags {
	 	width: 80vh;
	 }

</style>