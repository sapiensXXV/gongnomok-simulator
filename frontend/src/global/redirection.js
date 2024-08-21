if(!/\.?www./g.test(location.host)) {
  location.href = location.href.replace("://","://www.")
}