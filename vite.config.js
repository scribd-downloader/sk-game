import { defineConfig } from 'vite';
import vitePluginSitemap from 'vite-plugin-sitemap';
import { resolve } from 'path';
import copy from 'rollup-plugin-copy';

export default defineConfig({
  plugins: [
    vitePluginSitemap({
      hostname: 'https://suikagame.pro',
      routes: [
        '/',
        '/about-us', // ✅ added
        '/disclaimer',
        '/privacy-policy',
        '/terms-of-service',
        '/contact-us',
        '/suika-game-version',
        '/suika-game-multiple-player',
        '/suika-game-summer-holiday',
        '/suika-game-sunset-beach',
        '/suika-sunflower-farm',
        '/suika-fireworks-display',
        '/suika-moonlight-and-lanterns',
        '/suika-wagashi-whispers',
        '/suika-melodies-of-fall',
        '/suika-crimson-walk',
        '/suika-halloween-party',
        '/suika-christmas-night',
        '/suika-new-year-sunrise'
      ],
    }),
    copy({
      targets: [
        { src: 'ads.txt', dest: 'dist' },
        { src: '_redirects', dest: 'dist' },
      ],
      hook: 'closeBundle',
    }),
  ],

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        aboutUs: resolve(__dirname, 'about-us.html'), // ✅ added
        disclaimer: resolve(__dirname, 'disclaimer.html'),
        privacyPolicy: resolve(__dirname, 'privacy-policy.html'),
        termsOfService: resolve(__dirname, 'terms-of-service.html'),
        contactUs: resolve(__dirname, 'contact-us.html'),
        suikaGameVersion: resolve(__dirname, 'suika-game-version.html'),
        suikaGameMultiplePlayer: resolve(__dirname, 'suika-game-multiple-player.html'),
        suikaGameSummerHoliday: resolve(__dirname, 'suika-game-summer-holiday.html'),
        suikaGameSunsetBeach: resolve(__dirname, 'suika-game-sunset-beach.html'),
        suikaSunflowerFarm: resolve(__dirname, 'suika-sunflower-farm.html'),
        suikaFireworksDisplay: resolve(__dirname, 'suika-fireworks-display.html'),
        suikaMoonlightAndLanterns: resolve(__dirname, 'suika-moonlight-and-lanterns.html'),
        suikaWagashiWhispers: resolve(__dirname, 'suika-wagashi-whispers.html'),
        suikaMelodiesOfFall: resolve(__dirname, 'suika-melodies-of-fall.html'),
        suikaCrimsonWalk: resolve(__dirname, 'suika-crimson-walk.html'),
        suikaHalloweenParty: resolve(__dirname, 'suika-halloween-party.html'),
        suikaChristmasNight: resolve(__dirname, 'suika-christmas-night.html'),
        suikaNewYearSunrise: resolve(__dirname, 'suika-new-year-sunrise.html'),
      },
    },
  },

  server: {
    fs: { strict: false },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const routeToHtml = {
          '/': '/index.html',
          '/about-us': '/about-us.html', // ✅ added
          '/disclaimer': '/disclaimer.html',
          '/privacy-policy': '/privacy-policy.html',
          '/terms-of-service': '/terms-of-service.html',
          '/contact-us': '/contact-us.html',
          '/suika-game-version': '/suika-game-version.html',
          '/suika-game-multiple-player': '/suika-game-multiple-player.html',
          '/suika-game-summer-holiday': '/suika-game-summer-holiday.html',
          '/suika-game-sunset-beach': '/suika-game-sunset-beach.html',
          '/suika-sunflower-farm': '/suika-sunflower-farm.html',
          '/suika-fireworks-display': '/suika-fireworks-display.html',
          '/suika-moonlight-and-lanterns': '/suika-moonlight-and-lanterns.html',
          '/suika-wagashi-whispers': '/suika-wagashi-whispers.html',
          '/suika-melodies-of-fall': '/suika-melodies-of-fall.html',
          '/suika-crimson-walk': '/suika-crimson-walk.html',
          '/suika-halloween-party': '/suika-halloween-party.html',
          '/suika-christmas-night': '/suika-christmas-night.html',
          '/suika-new-year-sunrise': '/suika-new-year-sunrise.html',
        };

        const sanitizedUrl = req.url.replace(/\/$/, '');

        if (routeToHtml[sanitizedUrl]) {
          req.url = routeToHtml[sanitizedUrl];
        }
        next();
      });

      // Static HTML serving (dev)
      server.middlewares.use('/about-us.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'about-us.html'));
      });

      server.middlewares.use('/disclaimer.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'disclaimer.html'));
      });
      server.middlewares.use('/privacy-policy.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'privacy-policy.html'));
      });
      server.middlewares.use('/terms-of-service.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'terms-of-service.html'));
      });
      server.middlewares.use('/contact-us.html', (req, res) => {
        res.sendFile(resolve(__dirname, 'contact-us.html'));
      });
    },
  },
});
