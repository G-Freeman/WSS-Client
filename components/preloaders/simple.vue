<template>
	<section class="preloader-simple">
		<div class='sk-wave'>
			<div class='sk-rect sk-rect-1'></div>
			<div class='sk-rect sk-rect-2'></div>
			<div class='sk-rect sk-rect-3'></div>
			<div class='sk-rect sk-rect-4'></div>
			<div class='sk-rect sk-rect-5'></div>
		</div>
	</section>
</template>

<script>
export default {
	name: "simple"
}
</script>

<style lang="scss">
$spinkit-size: 4em !default;
$spinkit-spinner-color: #337ab7 !default;
.preloader-simple {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	.sk-wave {
		$rectCount: 5;
		$animationDuration: 1.2s;
		$delayRange: 0.4s;

		width: $spinkit-size * 1.5;
		height: $spinkit-size;
		margin: auto;
		text-align: center;
		font-size: 1em;

		.sk-rect {
			background-color: $spinkit-spinner-color;
			height: 100%;
			width: .5em;
			display: inline-block;
			animation: sk-wave-stretch-delay $animationDuration infinite ease-in-out;
		}

		@for $i from 1 through $rectCount {
			.sk-rect-#{$i} { animation-delay: - $animationDuration + $delayRange / ($rectCount - 1) * ($i - 1); }
		}
	}

	@keyframes sk-wave-stretch-delay {
		0%, 40%, 100% {
			transform: scaleY(0.4);
		}
		20% {
			transform: scaleY(1.0);
		}
	}
}
</style>
