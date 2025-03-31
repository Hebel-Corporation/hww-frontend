import jwt from 'jsonwebtoken'
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { SessionType } from '../types';

export function toCapitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getFirstChar(str: string) {
  if (str && str.length > 0) {
    return str[0];
  }
  return '';
}

export function getInitialChar(names:{first_name: string, last_name: string}) {
  const initialName = getFirstChar(names?.first_name) + '' + getFirstChar(names?.last_name)
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

export function formatDateTime(date: string) {
    try {
        return format(parseISO(date), "d MMMM yyyy", { locale: fr });
    } catch (error) {
        return date; // retourne la date originale en cas d'erreur
    }
}

export function getTokenValue(token: string): SessionType | null {
  try {
    const decodedToken = jwt.decode(token, { complete: true });
    const payload = decodedToken?.payload;
    
    // Type guard to ensure the payload matches SessionType structure
    if (payload && typeof payload === 'object' && 'user' in payload) {
      return payload as SessionType;
    }
    return null;
  } catch (error) {
    return null;
  }
}