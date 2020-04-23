timer: any;
timerScreen = "00:00";
targetTime = null;
isRunning = false;
tempSec = null;
 

function timerRepeat() {
    const t = new Date().getTime();
    if (t >= this.targetTime) {
      this.timerStop();
      /*
      this.alertCtrl
        .create({
          title: "Timer Completed!",
          buttons: ['Dismiss']
        })
        .present();
       */
    } else {
      this.timerScreen = this.miliToClock(this.targetTime - t);
      document.title = this.timerScreen.slice(0,-4);
    }
  }

function timerStart(t: number) {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.setTargetTime(t);
    this.tempSec = null;
    this.timer = setInterval(this.timerRepeat.bind(this), 57);
    this.isRunning = true;
  }

function timerStop() {
    clearInterval(this.timer);
    this.timerScreen = "00:00 Done";
    this.isRunning = false;
    setTimeout(() => {
      alert("done");
    }, 100);
  }

function timerPause() {
    clearInterval(this.timer);
    const tempSec = this.targetTime - new Date().getTime();
    this.tempSec = tempSec / 1000;
    this.isRunning = false;
  }

function setTargetTime(t: number) {
    const ct = new Date().getTime();
    if (t < 100) {
      this.targetTime = ct + t * 1000;
    } else {
      const min = Math.floor(t / 100);
      this.targetTime = ct + min * 60 * 1000 + (t - min * 100) * 1000;
    }
  }

function miliToClock(t: number) {
    let second = [0, 0, 0];
    second[0] = Math.floor(t / 1000 / 60);
    second[1] = Math.floor((t - second[0] * 60 * 1000) / 1000);
    second[2] = t - second[0] * 60 * 1000 - second[1] * 1000;
    return `${second[0]
      .toString()
      .padStart(2, "0")}:${second[1]
      .toString()
      .padStart(2, "0")}.${second[2].toString().padStart(3, "0")}`;
  }

function ngOnDestroy() {
    clearInterval(this.timer);
    this.isRunning = false;
  }