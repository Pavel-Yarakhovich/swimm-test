const AudioPlayer = class {
  constructor({ className, node }) {
    this.player = className ? document.querySelector(className) : node;
    this.progress = 0;
    if (this.player) {
      this.audio = this.player.querySelector('audio');
      if (!this.audio) return;
      this.indicator = this.player.querySelector('.timeline-indicator');
      this.progressLine = this.player.querySelector('.timeline-progress');
      this.timeline = this.player.querySelector('.timeline');
      this.play = this.player.querySelector('.player-play');
      this.timePlayed = this.player.querySelector('.timings-left');
      this.timeLeft = this.player.querySelector('.timings-right');
      const foundDuration = this.audio.duration;
      if (isNaN(foundDuration)) {
        this.audio.addEventListener('loadedmetadata', (e) => {
          this.initPlayer();
        });
      } else {
        this.initPlayer();
      }
    }
  }

  destroy() {
    if (this.player) {
      this.audio.removeEventListener('timeupdate', this.timeUpdateListener);
      this.audio.removeEventListener('ended', this.endedListener);
      this.play.removeEventListener('click', this.playListener);
      this.timeline.removeEventListener('click', this.clickTimelineListener);
      this.indicator.addEventListener('drag', this.dragListener);
    }
  }

  initPlayer() {
    this.updateTimes();
    this.clickTimeline();
    this.dragTimeline();
    this.playbutton();

    this.timeUpdateListener = () => {
      this.updateTimeline();
    };

    this.audio.addEventListener('timeupdate', this.timeUpdateListener, false);

    this.endedListener = () => {
      this.isPlaying = 0;
      this.play.classList.remove('playing');
    };

    this.audio.addEventListener('ended', this.endedListener, false);
  }

  updateTimes() {
    let timePlayed = new Date(this.audio.currentTime * 1000).toISOString().substr(14, 5);
    let timeLeft = new Date((this.audio.duration - this.audio.currentTime) * 1000).toISOString().substr(14, 5);
    this.timePlayed.innerHTML = timePlayed;
    this.timeLeft.innerHTML = `-${timeLeft}`;
  }

  playbutton() {
    this.isPlaying = 0;
    this.isLoaded = 0;
    this.playListener = () => {
      if (!this.isPlaying) {
        this.play.classList.add('playing');
        this.audio.play();
      } else {
        this.play.classList.remove('playing');
        this.audio.pause();
      }
      this.isPlaying = !this.isPlaying;
    };

    this.play.addEventListener('click', this.playListener);
  }

  audioLoadingAnimation() {}

  updateTimeline() {
    this.progress = this.audio.currentTime / this.audio.duration;
    this.indicator.style.left = `${this.progress * 98.8}%`;
    this.progressLine.style.width = `${this.progress * 100}%`;
    this.updateTimes();
  }

  clickTimeline() {
    this.clickTimelineListener = (e) => {
      this.progress = (e.clientX - this.timeline.getBoundingClientRect().left) / this.timeline.offsetWidth;
      this.audio.currentTime = this.progress * this.audio.duration;
      this.updateTimeline();
    };
    this.timeline.addEventListener('click', this.clickTimelineListener);
  }

  dragTimeline() {
    this.dragListener = (e) => {
      if (!e.clientX & !e.clientY) return;
      let marginLeft = 0;
      if (e.clientX - this.timeline.getBoundingClientRect().left > 0) {
        marginLeft = e.clientX - this.timeline.getBoundingClientRect().left;
        if (e.clientX < this.timeline.getBoundingClientRect().right) {
          marginLeft = e.clientX - this.timeline.getBoundingClientRect().left;
        } else {
          marginLeft = this.timeline.getBoundingClientRect().right - this.timeline.getBoundingClientRect().left;
        }
      } else {
        marginLeft = 0;
      }
      this.progress = marginLeft / this.timeline.offsetWidth;
      this.audio.currentTime = this.progress * this.audio.duration;
    };
    this.indicator.addEventListener('drag', this.dragListener);
  }
};

export default AudioPlayer;
