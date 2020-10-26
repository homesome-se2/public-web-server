class LSTokenService {
    static paths = {
        token: 'C_sessionKey',
        isAdmin: 'C_isAdmin',
        homeAlias: 'H_alias',
    }
    static hcStates = {
        error: "INVALID"
    }
    static isAuth = () => {
        return (this.getToken() === this.hcStates.error) ? false : true;
    }

    static setToken = token => {
        localStorage.setItem(this.paths.token, token);
    }

    static getToken = () => {
        return (localStorage.getItem(this.paths.token) === null) ?
        this.hcStates.error : 
        localStorage.getItem(this.paths.token);
    }
    static setAdminFlag = admingFlag => {
        localStorage.setItem(this.paths.isAdmin, (typeof admingFlag === "boolean")? admingFlag : this.hcStates.error );
    }

    static getAdminFlag = () => {
        return (localStorage.getItem(this.paths.isAdmin) === null) ?
        this.hcStates.error : 
        localStorage.getItem(this.paths.token);
    }
    static setHomeAlias = homeAlias => {
        localStorage.setItem(this.paths.homeAlias, homeAlias );
    }

    static getHomeAlias = () => {
        return localStorage.getItem(this.paths.token);
    }
    static clearStorage = () => {
        localStorage.clear();
    }


 
}
 
export default LSTokenService;