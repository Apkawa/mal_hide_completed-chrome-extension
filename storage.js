var Storage = function () {
    this.default_options = {
            username: "",
            update_interval: 30,
            hide_flag: true,
        }
    this.options = {}
    this.storage = localStorage
}
Storage.prototype.load_options = function () {
    for (i in this.default_options) {
        this.options[i] = this.storage[i] || this.default_options[i];
    }
}

Storage.prototype.save_options = function () {
    for (i in this.default_options) {
        this.storage[i] = this.options[i] || this.default_options[i];
    }
}

Storage.prototype.get = function (key) {
    return this.storage[key];
}

Storage.prototype.set = function (key, value) {
    this.storage[key] = value;
    this.options[key] = value;
}

Storage.prototype.get_all = function () {
    var copy_obj = {};
    for (i in this.default_options) {
        copy_obj[i] = this.options[i] || this.storage[i] || this.default_options[i];
    }
    return copy_obj

}

