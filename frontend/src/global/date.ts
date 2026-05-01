export default function isoDateToFormatString(isoDate: string): string {
  const date = isoDate.substring(0, 10)
  const time = isoDate.substring(11, 16)
  return date + ' ' + time
}

export function isoDateToFormatStringWithSecond(isoDate: string): string {
  const date = new Date(isoDate)
  return (
    date.getFullYear() +
    '-' +
    date.getMonth() +
    '-' +
    date.getDate() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds()
  )
}

export function isoDateToFormatStringOnlyDate(isoData: string): string {
  return isoData.substring(0, 10)
}
