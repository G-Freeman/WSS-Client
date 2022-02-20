<template>
	<section class="client">
		<div class="client_header" v-text="header"/>
		<div class="client_body">
			<preloader v-if="!isConnected"/>
			<div v-else>
				123
			</div>
		</div>
		<div class="client_footer">Footer</div>
	</section>
</template>

<script>
import WSS from "~/classes/network/wss";
import preloader from "~/components/preloaders/simple.vue";

export default {
	name: "client",
	props: {
		header: { default:'header', type:String },
		url:	{ default:null,		type:String },
	},
	components: {
		preloader
	},
	data: () => {
		return {
			isConnected: false,
			wsClient: null,
		}
	},
	methods: {
		init() {
			this.wsClient = new WSS(this.url);
			this.wsClient.onopen	= this.ws_onopen;
			this.wsClient.onclose	= this.ws_close;
		},
		ws_onopen() {
			this.isConnected = true;
		},
		ws_close() {
			this.isConnected = false;
		}
	},
	mounted() {
		this.init();
	}
}
</script>

<style scoped lang="scss">
.client {
	width: 100%;
	max-width: 350px;
	height: 420px;
	background: #3c3f41;
	border-radius: 12px;
	margin: 4px;
	color: black;
	box-sizing: border-box;
	overflow: auto;
	position: relative;
	display: flex;
	flex-direction: column;
	&_header, &_footer {
		height: 32px;
		background: #3c3f41;
		position: relative;
		align-self: center;
		line-height: 1;
		display: flex;
		align-items: center;
		color: #e9e9e9;
	}
	&_body {
		height: 100%;
		box-sizing: border-box;
		background: #2b2b2c;
		position: relative;
	}
}
</style>
