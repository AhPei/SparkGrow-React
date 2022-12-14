export function get_cookie(name) {
  return document.cookie
  .split(";")
  .some((c) => c.trim().startsWith(name + "="));
}

export function delete_cookie(name, path, domain) {
  if (get_cookie(name)) {
    document.cookie =
    name +
    "=" +
    (path ? ";path=" + path : "") +
    (domain ? ";domain=" + domain : "") +
    ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}

export function doesHttpOnlyCookieExist(cookiename) {
  var d = new Date();
  d.setTime(d.getTime() + (1000));
  var expires = "expires=" + d.toUTCString();

  document.cookie = cookiename + "=new_value;path=/;" + expires;
  return document.cookie.indexOf(cookiename + '=') == -1;
}