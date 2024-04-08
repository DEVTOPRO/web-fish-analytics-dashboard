export const getCurrentDate = dateInput => {
  var date = dateInput ? new Date(dateInput) : new Date();
  var curr_date = date.getDate();
  var curr_month = date.getMonth() + 1;
  var curr_year = date.getFullYear();
  let formatedDate =
    curr_year +
    '-' +
    (curr_month < 10 ? '0' + curr_month : curr_month) +
    '-' +
    (curr_date < 10 ? '0' + curr_date : curr_date);
  var updatedDate = new Date(formatedDate);

  return updatedDate;
};
export const changeDateFormat = dateInput => {
  var date = new Date(dateInput);
  var curr_date = date.getDate();
  var curr_month = date.getMonth() + 1;
  var curr_year = date.getFullYear();
  let formatedDate =
    (curr_date < 10 ? '0' + curr_date : curr_date) +
    '/' +
    (curr_month < 10 ? '0' + curr_month : curr_month) +
    '/' +
    curr_year;
  // var updatedDate = new Date(formatedDate);
  return formatedDate;
};
export const getCurrentDateToDisplay = dateInput => {
  var date = dateInput ? new Date(dateInput) : new Date();
  var curr_date = date.getDate();
  var curr_month = date.getMonth() + 1;
  var curr_year = date.getFullYear();
  let formatedDate =
    curr_year +
    '-' +
    (curr_month < 10 ? '0' + curr_month : curr_month) +
    '-' +
    (curr_date < 10 ? '0' + curr_date : curr_date);
  //var updatedDate = new Date(formatedDate);

  return formatedDate;
};
export const ageCalculator = dateInput => {
  var dob = new Date(dateInput);
  var month_diff = Date.now() - dob.getTime();
  var age_dt = new Date(month_diff);
  var year = age_dt.getUTCFullYear();
  let ageCalculateValue = year - 1970;
  return ageCalculateValue;
};
export const internalDateConveter = dateInput => {
  var date = dateInput ? dateInput.split('') : null;
  let converterDate;
  if (date.includes('/')) {
    var date = dateInput ? dateInput.split('/') : null;
    converterDate = [date[1], date[0], date[2]].join('/'); //mm/dd/yyyy
  } else {
    var date = dateInput ? dateInput.split('-') : null;
    converterDate = [date[1], date[2], date[0]].join('/'); //mm/dd/yyyy
  }
  return converterDate;
};
export const defaultChangeFormater = dateInput => {
  var date = new Date(dateInput);
  var curr_date = date.getDate();
  var curr_month = date.getMonth() + 1;
  var curr_year = date.getFullYear();
  let formatedDate =
    (curr_date < 10 ? '0' + curr_date : curr_date) +
    '/' +
    (curr_month < 10 ? '0' + curr_month : curr_month) +
    '/' +
    curr_year;
  let converterDate;
  var date = formatedDate ? formatedDate.split('/') : null;
  converterDate = [date[1], date[0], date[2]].join('/'); //mm/dd/yyyy
  return converterDate;
};

export const defaultTimeAndDateFormater = () => {
  let eventDate = new Date();
  let regex = /[,\s;:]+/;
  return  eventDate.toLocaleString().split(regex).join("");
};
export const beforeDaysDate=(days)=>{
let todayDate=new Date();
days?todayDate.setDate(new Date().getDate() - days):todayDate.setDate(new Date().getDate() - 30);
let day = todayDate.getDate();
let month = todayDate.getMonth() + 1;
let year = todayDate.getFullYear();
console.log("datae",`${year}-${ month < 10 ? '0' + month : month }-${day<10? '0' + day : day }`)
return `${year}-${ month < 10 ? '0' + month : month }-${day<10? '0' + day :  day }`
}