
const toDate = function(dStr) {
    var now = new Date();
    now.setHours(dStr.substr(0,dStr.indexOf(":")));
    now.setMinutes(dStr.substr(dStr.indexOf(":")+1));
    now.setSeconds(0);
    return now;
}

const add_minutes = function(dt, minutes) {
    return new Date(dt.getTime() + minutes*60000);
}

const diff_time = function(dt1, dt2) {
    return (parseInt((dt2 - dt1) / (1000 * 60)));
}


const display12 = function(dt) {
    var options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    var timeString = dt.toLocaleString('en-US', options);
    return timeString;
}

module.exports = {
    toDate: toDate,
    add_minutes: add_minutes,
    diff_time: diff_time,
    display12: display12
}