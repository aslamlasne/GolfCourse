export const ValidateDate = (testDate: string) => {
  // var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  var date_regex = /^[0-3]?[0-9].[0-3]?[0-9].(?:[0-9]{2})?[0-9]{2}$/;
  if (!(date_regex.test(testDate))) {
    return false;
  }
  return true;
}


export const FormatDate = (dateIn: string) => {
  return dateIn;
  if (dateIn) {
    const date:Date = new Date(dateIn);
    if (date) {
      const dateOut = (date.getMonth() + 1) + 
      "/" +  date.getDate() +
      "/" +  date.getFullYear();
      console.log(`FormatDate dateIn - ${dateIn}  date - ${date} dateOut - ${dateOut}`);
      return dateOut;
    }
  }
  return '';
}

export const TimeStamp = (dateIn: string) => {
  const datetime = (new Date(dateIn));
  var dateString = new Date(
    datetime.getTime() - datetime.getTimezoneOffset() * 60000
  );
  var curr_time = dateString.toISOString();
  return curr_time;
}
