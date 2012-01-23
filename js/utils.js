var Task = function (callback, delay) {
    /* @arg interval: seconds */
    this.callback = callback
    this.task_id = null;

    this.set_delay(delay);
}

Task.prototype.start = function () {
    if (this.task_id) {
        this.stop()
    }
    this.task_id = setInterval(this.callback, this.interval);
}

Task.prototype.stop = function () {
    clearInterval(this.task_id);
    this.task_id = null;
}

Task.prototype.restart = function () {
    this.stop();
    this.start();
}


Task.prototype.set_delay = function (delay) {
    this.interval = delay * 1000
}


Task.prototype.change_delay = function (delay) {
    var old_interval = this.interval
    this.set_delay(delay);
    if (old_interval != this.interval) {
        this.restart();
    }
}
