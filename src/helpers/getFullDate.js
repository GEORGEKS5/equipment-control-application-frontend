/**
 * Вычисляет дату и время на момент вызова
 * @returns Форматированную строку с датой и временем
 */
function getFullDate(){
    let date = new Date();
    let yearNow = date.getFullYear();
    let monthNow = date.getMonth() + 1;
    let dayNow = date.getDate();
    let hourNow = date.getHours();
    let minuteNow = date.getMinutes();
    let secondNow = date.getSeconds();

    let fullDate = yearNow  + '-' + monthNow + '-' + dayNow;
    let fullTime = hourNow + ':' + minuteNow + `:${secondNow}.000`;
    let fullDateTime = fullDate + ' ' + fullTime;

    return fullDateTime;
}

export default getFullDate