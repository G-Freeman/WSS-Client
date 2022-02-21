<template>
	<section class="index">
		<div class="control">
			<div class="add" @click="addClient(url)"/>
			<div class="url">
				<input type="text" v-model="url">
			</div>
		</div>
		<div class="test">
			<client_card v-for="id in sockets" :socket="WSS.sockets[id]"/>
		</div>
	</section>
</template>

<script>
import Vue from 'vue'
import WSS from "~/classes/network/wss";
import APP from "~/classes/app";

const client_card = () => import("~/components/client.vue");

export default Vue.extend({
	name: 'IndexPage',
	components: {
		client_card
	},
	data: () => {
		return {
			url: 'ws:localhost:9000',
		}
	},
	computed: {
		WSS: () => WSS,
		sockets() { return this.$store.getters["network/wss/sockets"] },
	},
	methods: {
		init() {
			APP.store = this.$store;
		},
		addClient(url) {
			new WSS(url,'name');
		}
	},
	mounted() {
		this.init();
	}
})
</script>

<style scoped lang="scss">
.index {
	.control {
		background: #2b2b2c;
		display: flex;
		.add {
			width: 32px;
			height: 32px;
			border-radius: 4px;
			background: #3c3f41 url("~/static/icons/plus.svg") no-repeat center;
			background-size: 32px;
			margin: 8px;
			&:hover {
				cursor: pointer;
				opacity: .7;
			}
			&:active {
				cursor: pointer;
				opacity: .8;
			}
		}
		.url {
			min-width: 128px;
			margin: 8px;
			background: #3c3f41;
			border-radius: 4px;
			display: flex;
			input {
				background: transparent;
				border: 0;
				outline: 0;
				padding: 0 8px 0 8px;
				color: #e9e9e9;
				font-size: 22px;
				line-height: 0;
			}
		}
	}
	.test {
		display: grid;
		grid-template-columns: repeat(auto-fit,minmax(255px,1fr));
		grid-gap: 8px;
		padding: 8px;
		justify-items: center;
	}
}
</style>
