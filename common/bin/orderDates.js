"use strict";
const moment = require("moment");

function orderByDateDesc(data) {
  const formatString = "MMMM YYYY";
  return data.sort((a, b) => {
    if (a.dates.start && b.dates.start) {
      return (
        moment(b.dates.start, formatString) -
        moment(a.dates.start, formatString)
      );
    }
    return moment(b.dates.end, formatString) - moment(a.dates.End);
  });
}

export default orderByDateDesc;
