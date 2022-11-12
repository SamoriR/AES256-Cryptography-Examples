import CryptoJS from 'crypto-js';


class AESCipher {
    readonly blockSize: number = 16;
    key: string = '';

    constructor(key: string) {
        this.key = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(key)).toString();
    }

    generateRandomHex = (length: number): string => [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
    createIv = () => this.generateRandomHex(this.blockSize);

    encrypt = (data: string, iv: string | undefined) => {
        const encodedKey = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(this.key)).toString();

        const usedIV = iv === undefined ? this.createIv() : iv
        const encodedIv = CryptoJS.enc.Utf8.parse(usedIV);

        const encrypted = CryptoJS.AES.encrypt(data, encodedKey, { iv: encodedIv, mode: CryptoJS.mode.CBC});

        return {
            data: encrypted.toString(),
            iv: encodedIv
        };
    }

    decrypt = (data: string, iv: string): string => {
        const encodedIv = CryptoJS.enc.Utf8.parse(iv);
        const decrypted = CryptoJS.AES.encrypt(data, this.key, { iv: encodedIv, mode: CryptoJS.mode.CBC});

        return decrypted.toString();
    }

}

export default AESCipher;