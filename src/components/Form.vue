<template>
	<div class="Form">
		<h2>{{ pesan }}</h2>
		<p>Please contact for more information.</p>
	</div>
</template>

<script>
	export default {
		name: 'Message',
		props: {
			pesan: String
		}
	}
</script>