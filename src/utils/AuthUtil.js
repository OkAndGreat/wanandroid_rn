import StorageUtil from './storageUtil';

const userInfoKey = '@userInfo';
const cookieKey = '@cookie';

export default class AuthUtil {
    static saveUserInfo = info => {
        return StorageUtil.save(userInfoKey, info);
    };

    static getUserInfo = () => {
        return StorageUtil.get(userInfoKey);
    };

    static removeUserInfo = () => {
        return StorageUtil.delete(userInfoKey);
    };

    static saveCookie(cookie) {
        return StorageUtil.save(cookieKey, cookie);
    }

    static getCookie = () => {
        return StorageUtil.get(cookieKey);
    };

    static removeCookie = () => {
        return StorageUtil.delete(cookieKey);
    };

    static removeAllKeys = async () => {
        return StorageUtil.delete(await StorageUtil.keys());
    };
}