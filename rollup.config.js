import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import json from '@rollup/plugin-json';
import html from '@rollup/plugin-html';
import nodePolyfills from 'rollup-plugin-node-polyfills';


const production = !process.env.ROLLUP_WATCH;
const version = Date.now();

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js',
		inlineDynamicImports: true
	},
	plugins: [
		svelte({
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: 'bundle.css' }),
		
		html({
			template: async ({ attributes, files, meta, publicPath, title }) => {
				return `<!DOCTYPE html>
				<html lang="en">
				<head>
				  <meta name="google-site-verification" content="l1TxbWLD1_xv_R5qWf1CLLPA_BycIgM7ym_E4VCb_OE">
				  <meta name="facebook-domain-verification" content="ggpvifr0wbhpuuic9qu30nruw6t3hz">
				  <meta name="msvalidate.01" content="89B6E6BB09A292D84E2930DE0EE520C0">
				  <meta charset='utf-8'>
				  <meta name='viewport' content='width=device-width,initial-scale=1'>
				  <link rel="canonical" href="https://www.unep.org/interactive/pollution-to-solution/">
				  <link rel="shortcut icon" href="https://www.unep.org/themes/custom/UNEP_3Spot/favicon.ico" type="image/vnd.microsoft.icon">
				  <link rel="preconnect" href="https://fonts.googleapis.com">
				  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
				  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap" rel="stylesheet">
				  <link defer rel='stylesheet' href='bundle.css?t=${version}'>
				  <link defer rel='stylesheet' href='global.css?t=${version}'>
				  <script defer src='bundle.js?t=${version}'></script>
				  <title>Visual Feature | Pollution to Solution: Accessing marine litter and plastic pollution</title>
				  <meta name="title" content="Visual Feature | Pollution to Solution: Accessing marine litter and plastic pollution">
				  <meta name="description" content="Learn the effects of marine litter and plastic pollution and the solutions that we can implement to reduce the amount of plastic entering the ocean.">
				  <meta name="robots" content="index, follow">
				  <meta name="language" content="EN">
				  <meta name="keywords" content="Visual Feature | Pollution to Solution: Accessing marine litter and plastic pollution">
				  <meta property="og:type" content="website">
				  <meta property="og:url" content="https://www.unep.org/interactive/pollution-to-solution/">
				  <meta property="og:title" content="Visual Feature | Pollution to Solution: Accessing marine litter and plastic pollution">
				  <meta property="og:description" content="Learn the effects of marine litter and plastic pollution and the solutions that we can implement to reduce the amount of plastic entering the ocean.">
				  <meta property="og:image" content="https://www.unep.org/interactive/pollution-to-solution/img/promo.jpg">
				  <meta property="og:image:width" content="2568">
				  <meta property="og:image:height" content="1538">
				  <meta property="twitter:card" content="summary_large_image">
				  <meta property="twitter:url" content="https://www.unep.org/interactive/pollution-to-solution/">
				  <meta property="twitter:title" content="Visual Feature | Pollution to Solution: Accessing marine litter and plastic pollution">
				  <meta property="twitter:description" content="Learn the effects of marine litter and plastic pollution and the solutions that we can implement to reduce the amount of plastic entering the ocean.">
				  <meta property="twitter:image" content="https://www.unep.org/interactive/pollution-to-solution/img/promo.jpg">
				  <script type="application/ld+json">
					{
					"@context": "https://schema.org",
					"@type": "Article",
					"mainEntityOfPage": “https://www.unep.org/interactive/pollution-to-solution/”
						"@type": "Organization",
						"@id": "https://unep.org/"
					},
					"headline": "Pollution to Solution: Accessing marine litter and plastic pollution",
					"description": "Learn the effects of marine litter and plastic pollution and the solutions that we can implement to reduce the amount of plastic entering the ocean.",
					"image": "https://www.unep.org/interactive/pollution-to-solution/img/promo.jpg",  
					"author": {
						"@type": "",
						"name": ""
					},  
					"publisher": {
						"@type": "Organization",
						"name": "",
						"logo": {
						"@type": "ImageObject",
						"url": ""
						}
					},
					"datePublished": "2021-10-21"
					}
					</script>			
				</head>
				<body>
				</body>
				</html>`;
			}
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte'],
		}),
		commonjs(),
		nodePolyfills(),
		json(),
		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};
