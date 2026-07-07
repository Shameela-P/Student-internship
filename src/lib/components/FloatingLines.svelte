<script>
	// A lightweight, purely CSS animated background for the hero section
</script>

<div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
	<!-- Deep ambient glow -->
	<div class="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-blue-500/10 blur-[120px] mix-blend-screen animate-pulse-slow"></div>
	<div class="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full bg-purple-500/10 blur-[150px] mix-blend-screen animate-pulse-slow" style="animation-delay: 2s;"></div>

	<!-- Flowing lines -->
	<div class="absolute inset-0 opacity-[0.15] dark:opacity-30">
		<svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stop-color="#3b82f6" stop-opacity="0" />
					<stop offset="50%" stop-color="#8b5cf6" stop-opacity="1" />
					<stop offset="100%" stop-color="#06b6d4" stop-opacity="0" />
				</linearGradient>
				<linearGradient id="grad2" x1="100%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stop-color="#06b6d4" stop-opacity="0" />
					<stop offset="50%" stop-color="#3b82f6" stop-opacity="1" />
					<stop offset="100%" stop-color="#8b5cf6" stop-opacity="0" />
				</linearGradient>
			</defs>

			<!-- Animated curved paths simulating silk/floating lines -->
			<path class="animated-line line-1" d="M -100 200 C 300 0, 600 400, 1200 100" fill="none" stroke="url(#grad1)" stroke-width="2" />
			<path class="animated-line line-2" d="M -100 400 C 400 600, 800 100, 1500 300" fill="none" stroke="url(#grad2)" stroke-width="1.5" />
			<path class="animated-line line-3" d="M -100 100 C 200 400, 700 0, 1300 500" fill="none" stroke="url(#grad1)" stroke-width="3" />
			<path class="animated-line line-4" d="M 0 600 C 500 200, 900 700, 1400 200" fill="none" stroke="url(#grad2)" stroke-width="1" />
		</svg>
	</div>
</div>

<style>
	.animated-line {
		stroke-dasharray: 2000;
		stroke-dashoffset: 2000;
		animation: dash 12s linear infinite;
	}

	.line-1 { animation-duration: 15s; }
	.line-2 { animation-duration: 18s; animation-delay: -5s; }
	.line-3 { animation-duration: 22s; animation-delay: -10s; }
	.line-4 { animation-duration: 14s; animation-delay: -2s; }

	@keyframes dash {
		0% {
			stroke-dashoffset: 2000;
		}
		50% {
			stroke-dashoffset: 0;
		}
		100% {
			stroke-dashoffset: -2000;
		}
	}
	
	@keyframes pulse-slow {
		0%, 100% { opacity: 0.5; transform: scale(1); }
		50% { opacity: 0.8; transform: scale(1.1); }
	}
	.animate-pulse-slow {
		animation: pulse-slow 8s ease-in-out infinite;
	}
</style>
