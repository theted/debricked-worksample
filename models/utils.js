const timestamp = (mode) => {
  let today = new Date()
  let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
  let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
  let full = date + '@' + time

  switch (mode) {
    default: case 'time': return time
    case 'full': return full
    case 'date': return date
  }
}

module.exports = { timestamp }
