if(!/\.?www./g.test(location.host)) {
  location.href = location.href.replace("://","://www.")
  console.log("location.href=" + location.href)
}