function get(cname: string) {

    let name = cname + "=";

    let decodedCookie = decodeURIComponent(document.cookie);

    let ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {

        let c = ca[i];

        while (c.charAt(0) == ' ') {

            c = c.substring(1);

        }

        if (c.indexOf(name) == 0) {

            return c.substring(name.length, c.length);

        }

    }

    return undefined;

}



function set(cname: string, cvalue: string, exValue: number = 30) {

    const d = new Date(Date.now() + Number(exValue) * 1000);

    // d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));

    let expires = "expires=" + d.toUTCString();

    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";

}


function clear() {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        let eqPos = c.indexOf('=');
        let name = eqPos > -1 ? c.substring(0, eqPos) : c;
        
        // Set the cookie's expiration date to a past date to delete it
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
    }
}



export default {

    get,
    set,
    clear
}