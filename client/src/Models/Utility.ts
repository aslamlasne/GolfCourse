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
