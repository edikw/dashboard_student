<template>
	<div class="tes">
		<div class="list" v-for="a in data">
			<div v-for="i in a.images">
				
				<img :src="i.url">
			</div>
		</div>
		
	</div>
</template>
<script>
	  import router from '../router.js'
	  export default {
	  	data() {
	  		return {
	  			data: []
	  		}
	  	},
	  	mounted() {
	  	this.data = router.app.njajal
	  		console.log('njajal data tes',router.app.njajal)
	  	}
	  }
</script>