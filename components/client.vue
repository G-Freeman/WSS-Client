<template>
	<section class="client">
		<div v-if="redraw"></div>
		<div class="client_header">
			<div class="status">
				<div class="status_marker" :class="{online:socket.connected}"/>
			</div>
			<label v-text="socket.name"/>
			<div class="close" @click="remove"/>
		</div>
		<div class="client_body">
			<preloader v-if="!socket.connected"/>
			<div v-else>
				123
			</div>
		</div>
		<div class="client_footer">
			<div v-text="''"/>
			<label v-text="socket.connected"/>
			<div v-text="''"/>
		</div>
	</section>
</template>

<script>
import preloader from "~/components/preloaders/simple.vue";
import WSS from "~/classes/network/wss";

export default {
	name: "client",
	props: {
		socket: { }
	},
	components: {
		preloader
	},
	computed: {
		WSS: () => WSS,
		redraw() { return this.$store.getters["network/wss/redraw"] },
	},
	data: () => {
		return {
			// isConnected: false,
			// wsClient: null,
		}
	},
	methods: {
		init() {
			// this.ws.client.onopen	= this.ws_onopen;
			// this.ws.client.onclose	= this.ws_close;
		},
		ws_onopen() {
			this.isConnected = true;
		},
		ws_close() {
			this.isConnected = false;
		},
		disconnect() {
			this.socket.close();
		},
		remove() {
			this.disconnect();
			this.$emit('remove');
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
	background: #313336;
	border-radius: 12px;
	border: solid 1px #2b2b2c;
	margin: 4px;
	color: black;
	box-sizing: border-box;
	overflow: auto;
	position: relative;
	display: flex;
	flex-direction: column;
	&_header, &_footer {
		width: 100%;
		height: 32px;
		display: flex;
		position: relative;
		align-self: center;
		line-height: 1;
		align-items: center;
		color: #e9e9e9;
		justify-content: space-between;
		label {
			width: 100%;
			text-align: center;
		}
		.status {
			min-width: 18px;
			height: 18px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-left: 4px;
			&_marker {
				width: 8px;
				height: 8px;
				background: #1f1f1f;
				border: solid 1px #2b2b2c;
				border-radius: 50%;
				&.online {
					background: green;
				}
			}
		}
		.close {
			min-width: 18px;
			height: 18px;
			border-radius: 8px;
			background: #3c3f41 url("~/static/icons/cross.svg") no-repeat center;
			background-size: 12px;
			border: solid 1px #2b2b2c;
			margin-right: 4px;
			&:hover {
				cursor: pointer;
				opacity: .7;
			}
			&:active {
				cursor: pointer;
				opacity: .8;
			}
		}
	}
	&_body {
		height: 100%;
		box-sizing: border-box;
		background: #2b2b2c;
		position: relative;
	}
}
</style>
