import CryptoJS from 'crypto-js/crypto-js';

class AuthCryptoGuard {
  static generateHash = (message, secret) => {
    return CryptoJS.HmacSHA256(message, secret);
  };
  static getBase64Encoding = (hash) => {
    return CryptoJS.enc.Base64.stringify(hash);
  };
  static verify = (hash, reference) => {
    if (hash === reference) return true;
    return false;
  };
}

export default AuthCryptoGuard;
