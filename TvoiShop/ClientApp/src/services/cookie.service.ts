import Cookies from "js-cookie";

class CookieService {
    private cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    };
    
    /*public setCookie(name: string, value: string, expirationTime?: number) {
        let cookieString = `${name}=${value}; `;
        
        if (expirationTime) {
            const expirationDate = new Date(expirationTime);
            cookieString += `expires=${expirationDate.toUTCString()}; `;
        }
        
        cookieString += `httpOnly=${this.cookieOptions.httpOnly}; secure=${this.cookieOptions.secure}; sameSite=${this.cookieOptions.sameSite}`;
        console.log(cookieString);
        document.cookie = cookieString;  
    }*/

    public setCookie(name: string, value: string, expirationTime?: number) {
        Cookies.set(name, value, { expires: expirationTime });
    }
    
    /*public getCookie(name: string): string | undefined {
        const cookies = document.cookie.split(';');
    
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
    
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
    
        return undefined;
    }*/

    public getCookie(name: string): string | undefined {
        return Cookies.get(name);
    }
    
    /*public deleteCookie(name: string) {
        const pastDate = new Date(0);
        const cookieString = `${name}=; expires=${pastDate.toUTCString()}`;
        document.cookie = cookieString;
    }*/

    public deleteCookie(name: string) {
        Cookies.remove(name);
    }
}

const cookieService = new CookieService();

export default cookieService;