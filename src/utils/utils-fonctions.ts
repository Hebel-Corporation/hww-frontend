const jwt = require('jsonwebtoken');

export function toCapitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export function getFirstChar(str: string) {
  if (str && str.length > 0) {
    return str[0];
  }
  return '';
}


export function getInitialChar(first_name: string, last_name: string) {
  const initialName = getFirstChar(first_name) + '' + getFirstChar(last_name)
  return initialName.toUpperCase();
}


export function getFullPathname(path: string, search: any) {

  let index = 0
  let url = path
  for (const [key, value] of Object.entries(search)) {
    if (!index && value)
      url = url.concat(`?${key}=${value}`)
    else if (index && value)
      url = url.concat(`&${key}=${value}`)

    index++;
  }

  return url
}



export function getTokenValue(token: string) {
  try {
    const decodedToken = jwt.decode(token, { complete: true });
    return decodedToken.payload
  } catch (error) {
    return null
  }
}