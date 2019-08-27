var FrameAnimation = function(options) {
  this.options = {
    frames: [],
    frameSize: null,
    image: '',
    imageEl: null
  };
  if(!options.frames || options.frames.length == 0 || !options.imageEl || !options.image || !options.frameSize) {
    return;
  }
  // 帧
  this.frames = options.frames;
  // 默认帧
  this.defaultFrame = options.defaultFrame || this.frames[0];
  // 帧数量
  this.frameCount = this.frames.length;
  // 帧大小
  this.frameSize = options.frameSize;
  // 图像DOM
  this.imageEl = options.imageEl;
  // 图像
  this.image = options.image;
  // 帧速度
  this.frameSpeed = options.frameSpeed || 24;
  // 播放周期 休眠时间
  this.sleep = options.sleep || 0;
  // 是否自动播放
  this.autoRun = typeof options.autoRun === 'undefined' ? true : options.autoRun;
  // 播放次数 为0时则循环不断播放
  this.iterationCount = options.iterationCount || 0;
  // 播放一个周期后的回调方法
  this.cycleCallback = options.cycleCallback || null;

  // 当前已播放周期
  this.runingIterationCount = 0;
  // 当前帧索引
  this.index = 0;

  this.imageEl.style.width = this.frameSize[0];
  this.imageEl.style.height = this.frameSize[1];

  // 是否准备就绪
  this.ready = false;

  var that = this;
  var img = new Image();
  img.onload = function() {
    that.ready = true;
    that.imageEl.style.backgroundImage = 'url(' + that.image + ')';
    if (that.autoRun) {
      that.run();
    }
  }
  img.src = this.image;
}
FrameAnimation.prototype.run = function(){
  if (!this.ready) {
    return false;
  }
  this.stop();
  this.runingIterationCount++;
  this.playtimer = setInterval(this.frame.bind(this), 1000 / this.frameSpeed);
  return true;
}
FrameAnimation.prototype.frame = function() {
  this.index++;
  if (this.index > this.frameCount - 1) {
    this.index = 0;
    if (this.cycleCallback) {
      this.cycleCallback();
    }
    if (this.iterationCount && this.runingIterationCount >= this.iterationCount) {
      this.stop();
      this.runingIterationCount = 0;
      return;
    }
    if (this.sleep) {
      this.stop();
      setTimeout(function(){
        this.run();
      }.bind(this), this.sleep);
      return;
    }
  }
  this.imageEl.style.backgroundPosition = '-' + this.frames[this.index][0] + ' ' + '-' + this.frames[this.index][1];
}
FrameAnimation.prototype.stop = function(t) {
  this.playtimer && clearInterval(this.playtimer);
  this.index = 1;
  if(!t) {
    this.imageEl.style.backgroundPosition = '-' + this.defaultFrame[0] + ' ' + '-' + this.defaultFrame[1];
  }
}