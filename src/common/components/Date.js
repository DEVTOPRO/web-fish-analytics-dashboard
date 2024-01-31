export const getCurrentDate = (dateValue) => {
    var date =  dateValue?new Date(dateValue):new Date();
    var curr_date = date.getDate();
    var curr_month = date.getMonth() + 1;
    var curr_year = date.getFullYear();
    let currentDate =
     
      (curr_month < 10 ? '0' + curr_month : curr_month) +
      '/' +
      (curr_date < 10 ? '0' + curr_date : curr_date) +"/"+ curr_year 
       
    return currentDate;
  };
  export const formatdisplayDate=(data,format)=>{

        var date =  new Date(data);
        var curr_date = date.getDate();
        var curr_month = date.getMonth() + 1;
        var curr_year = date.getFullYear();
        let formatedDate =curr_year+'-'+(curr_month < 10 ? '0' + curr_month : curr_month)+"-"+(curr_date < 10 ? '0' + curr_date : curr_date) ;
        

       
    return formatedDate;
  }
  
  export const ageCalculate=(data)=>{
      let birthDate = new Date(data);
      let otherDate = new Date(getCurrentDate());
      var years = otherDate.getFullYear() - birthDate.getFullYear();
      if (
        otherDate.getMonth() < birthDate.getMonth() ||
        (otherDate.getMonth() == birthDate.getMonth() &&
          otherDate.getDate() < birthDate.getDate())
      ) {
        years--;
      }
      if (years >= 0) {
        let age=years;
        return age;
      } else {
        let age=years='';
        return age;
      }
    }
    export const ageCalculator = dateInput => {
      var dob = new Date(dateInput);
      var month_diff = Date.now() - dob.getTime();
      var age_dt = new Date(month_diff);
      var year = age_dt.getUTCFullYear();
      let ageCalculateValue = year - 1970;
      console.log(ageCalculateValue)
      return ageCalculateValue;
    };
    export const nextDayFormater=(data)=>{
      let isNextDay=false;
      let day=new Date();
     day.setDate(day.getDate() + 1); 
  if(new Date(day)>=new Date(data)){
    isNextDay=true;
  }
return isNextDay;
    }