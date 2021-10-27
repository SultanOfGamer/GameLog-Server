function getDate(){
    const date = new Date();
    var year = date.getFullYear().toString();

    var month = date.getMonth() + 1;
    month = month < 10 ? '0' + month.toString() : month.toString();

    var day = date.getDate();
    day = day < 10 ? '0' + day.toString() : day.toString();

    let hours = date.getHours(); // 시
    let minutes = date.getMinutes();  // 분
    let seconds = date.getSeconds();  // 초

    return year + '/' +  month + '/' + day + '-' + hours + ':' + minutes + ':' + seconds;
}

function getDateUNIX(){
    const now = new Date();
    return parseInt(now.getTime() / 1000);
}

module.exports = {
    getDate,
    getDateUNIX
};
