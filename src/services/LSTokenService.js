class LSTokenService {
  static paths = {
    username: 'C_nameID',
    token: 'C_sessionKey',
    isAdmin: 'C_isAdmin',
    homeAlias: 'H_alias',
    hash: 'V_hash',
  };
  static hcStates = {
    error: 'INVALID',
  };
  static isAuth = () => {
    return this.getToken() === this.hcStates.error ? false : true;
  };

  static setToken = (token) => {
    localStorage.setItem(this.paths.token, token);
  };

  static getToken = () => {
    return localStorage.getItem(this.paths.token) === null
      ? this.hcStates.error
      : localStorage.getItem(this.paths.token);
  };
  static setAdminFlag = (admingFlag) => {
    localStorage.setItem(
      this.paths.isAdmin,
      typeof admingFlag === 'boolean' ? admingFlag : this.hcStates.error
    );
  };

  static getAdminFlag = () => {
    return localStorage.getItem(this.paths.isAdmin) === null
      ? this.hcStates.error
      : localStorage.getItem(this.paths.isAdmin);
  };
  static setHomeAlias = (homeAlias) => {
    localStorage.setItem(this.paths.homeAlias, homeAlias);
  };
  static setUsername = (username) => {
    localStorage.setItem(this.paths.username, username);
  };
  static getUsername = () => {
    return localStorage.getItem(this.paths.username);
  };
  static getHomeAlias = () => {
    return localStorage.getItem(this.paths.homeAlias);
  };
  static setHash = (hash) => {
    localStorage.setItem(this.paths.hash, hash);
  };
  static getHash = () => {
    return localStorage.getItem(this.paths.hash);
  };
  static clearStorage = () => {
    localStorage.clear();
  };
  static isFieldValid = (value) => {
    return !(value === null) && value.length > 0;
  };
  static isEligibleForAutoAuth = () => {
    return (
      LSTokenService.isFieldValid(localStorage.getItem(this.paths.isAdmin)) &&
      LSTokenService.isFieldValid(localStorage.getItem(this.paths.token)) &&
      LSTokenService.isFieldValid(LSTokenService.getHash()) &&
      LSTokenService.isFieldValid(LSTokenService.getUsername()) &&
      LSTokenService.isFieldValid(LSTokenService.getHomeAlias())
    );
  };
}

export default LSTokenService;
