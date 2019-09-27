import moment from 'moment';

export function getClosestToDate(dates:string[], compareDate:Date) {
  let n = -1;

  const dateToStr = moment(compareDate).format('YYYY-MM-DD');
  const index = dates.length - 1;
  const latest = dates[index];

  if (dates.indexOf(dateToStr) > -1) {
    return dateToStr;
  }

  if (compareDate > new Date(latest)) {
    return latest;
  }

  while (++n < dates.length && new Date(dates[n]) < compareDate);

  return dates[n] || dateToStr;
}