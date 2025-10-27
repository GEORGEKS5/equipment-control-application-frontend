
type userData = {
    name: string,
    value: string | undefined,
};

function getStartIndex(cookie: string, name: string ): number{
    return cookie.indexOf(name + '=');
}

export function getCookieByName(name: string): userData{
    let v: string | undefined;
    const cookieString: string = document.cookie;

    const sIndex: number = getStartIndex(cookieString, name);

    if(sIndex !== -1){
        const eqIndex: number = cookieString.indexOf('=', sIndex);
        const dotIndex: number = cookieString.indexOf(';', eqIndex);
    
        v = cookieString.slice(eqIndex + 1, dotIndex === -1 ? undefined : dotIndex);
    }

    console.log(v);

    return {
        name: name,
        value: v,
    }
}

export function hasCookie(name: string): boolean{
    return getStartIndex(document.cookie, name) === -1 ? false : true;
}

export function setCookie(cookieName: string, cookieValue: string): void{
    document.cookie = `${cookieName}=${cookieValue};`;
}

export function delCookie(cookieName: string): void{
    let cookieObj: userData = getCookieByName(cookieName);

    if(cookieObj.value){
        document.cookie = `${cookieObj.name}=${cookieObj.value}; max-age=-1`;
        return;
    }

    console.error('Delete cookie not found');
}