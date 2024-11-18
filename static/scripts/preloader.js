// // window.LogRocket && window.LogRocket.init("kiz0ep/firstaid-fcb")
var body = document.querySelector('body');

body.classList.remove('preloader_active');
body.classList.remove('preloader_ready');
document.dispatchEvent(new Event('preloaderFinished'));
sessionStorage.setItem('preloader', 'loaded');

// // fakeLoader
// class FakeLoader {
//   constructor(intervalTime = 100, callback = () => {}) {
//     this.intervalTime = intervalTime;
//     this.progress = 0;
//     this.randomizeTiming = true;
//     this.isRunning = false;
//     this.interval = null;
//     this.callback = callback;
//   }

//   start() {
//     this.isRunning = true;
//     this.progress = 0;
//     this.addProgressInterval();
//   }

//   addProgressInterval() {
//     let randomTimeMultiplier = this.randomizeTiming ? this.randomBetween(0.3, 1) : 1;

//     this.interval = setTimeout(() => {
//       this.progress += 1;
//       this.callback();

//       if (this.progress < 100) {
//         this.interval = this.addProgressInterval();
//       } else {
//         this.isRunning = false;
//         clearTimeout(this.interval);
//       }
//     }, this.intervalTime * randomTimeMultiplier);

//     return this.interval;
//   }

//   randomBetween(min, max) {
//     return Math.random() * max + min;
//   }

//   finish() {
//     this.progress = 100;
//     this.isRunning = false;
//     clearInterval(this.interval);
//   }
// }

// // end fakeloader
// var body = document.querySelector('body');

// // set locale
// function setLocale() {
//   const pathname = window.location.pathname;
//   const preloader = document.querySelector('#preloader');

//   if (!preloader) {
//     return;
//   }

//   const pathPrefix = preloader?.dataset?.pathPrefix || '';

//   if (!pathname) {
//     return;
//   }

//   const locale = pathname
//     .replace(pathPrefix, '')
//     .split('/')
//     .filter((param) => param !== '')[0];
//   preloader?.classList.remove('intl-eng', 'intl-fr', 'intl-nl');
//   switch (locale) {
//     case 'nl':
//       preloader.classList.add('intl-nl');
//       break;

//     case 'eng':
//       preloader.classList.add('intl-eng');

//       break;

//     case 'fr':
//       preloader.classList.add('intl-fr');
//       break;

//     default:
//       preloader.classList.add('intl-en');
//       break;
//   }
// }

// setLocale();

// // const loader = document.querySelector(".three_spinner_percentage")
// const loader = document.querySelector('.circular-loader__path-progress');
// const loaderNumber = document.querySelector('.circular-loader-progress');
// const main = document.querySelector('#preloader-main');

// let totalProgress = 0;
// let progressions = [];
// let fakeloader = new FakeLoader(100, loaderProgress);
// let timeoutIdFirstFrame;

// function loaderProgress() {
//   const sum = progressions.reduce((prev, curr) => prev + curr, 0);
//   const maxSum = 77;

//   if (sum === maxSum) fakeloader.finish();
//   const fakeloaderProgress = Math.round(fakeloader.progress * ((100 - maxSum) / 100));
//   total = sum + fakeloaderProgress;

//   // Style background with progress
//   if (
//     main &&
//     (window.location.pathname === '/' ||
//       window.location.pathname === '/nl/' ||
//       window.location.pathname === '/fr/' ||
//       window.location.pathname === '/en/')
//   )
//     main.style.backgroundColor = `rgba(0,0,0,${(100 - total) / 100})`;

//   loader.setAttribute('stroke-dasharray', 100 + total);
//   loaderNumber.innerHTML = `${Math.min(total, 100)}%`;
//   totalProgress = total;
//   if (total === 100) {
//     setTimeout(isLoaded, 50);
//   }
//   return total;
// }

// function closePreloader() {
//   const delay = 100;
//   body.classList.add('preloader_ready');

//   setTimeout(function () {
//     body.classList.remove('preloader_active');
//     body.classList.remove('preloader_ready');
//     document.dispatchEvent(new Event('preloaderFinished'));
//     sessionStorage.setItem('preloader', 'loaded');
//   }, delay);
// }

// let loadingFinished = false;

// function isLoaded() {
//   if (totalProgress === 100 && !loadingFinished) {
//     // remove error class
//     body.classList.remove('show-error');
//     // remove setTimeout for add error view
//     clearTimeout(timeoutIdFirstFrame);
//     // trigger custom event when everything is loaded
//     document.dispatchEvent(new Event('preloaderFinished'));

//     // prevent this function form executing twice
//     loadingFinished = true;
//     closePreloader();
//   }
// }
// // reload page if errored

// let reloadButton = document.getElementById('reload-page');
// reloadButton &&
//   reloadButton.addEventListener('click', function () {
//     location.reload();
//     // location.href = location.href
//   });

// // Css TailwindLoader
// const tailwind = sessionStorage.getItem('Tailwind');
// progressions[1] = tailwind === 'loaded' ? 1 : 0;
// document.addEventListener('TailwindCssLoaded', (e) => {
//   progressions[1] = 1;
//   loaderProgress();
// });

// // threeSceneReady
// progressions[2] = 0;
// document.addEventListener('SceneReady', (e) => {
//   progressions[2] = 1;
//   loaderProgress();
// });

// // threeGLBProgress
// progressions[0] = 0;
// document.addEventListener('ThreeLoading', (e) => {
//   const maxProgress = 75;

//   progressions[0] = progressions[0] > maxProgress ? progressions[0] : maxProgress;
//   if (progressions[0] === maxProgress) {
//     progressions[0]++; // finished at 75% => add 1 to ignore more loops
//     loaderProgress();
//   } else if (progressions[0] < maxProgress) {
//     loaderProgress();
//   }
// });
