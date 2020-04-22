export function formatTime(time) {
  if(typeof time === 'string'){
    time = parseInt(time, 10);
  }
  if(typeof time !== 'number'){
    console.error('time not a number')
    return
  }
  var date = new Date(time);
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate
}