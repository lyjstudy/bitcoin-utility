
const crypto = require("crypto");
const secp256k1 = require("secp256k1");

/**
 * 判断私钥匙是否合法
 * @param {Buffer} privKey 32个字节的私钥
 * @return {Boolean}
 */
function IsValidPrivateKey(privKey) {
    return secp256k1.privateKeyVerify(privKey);
}

/**
 * 随机产生一个合法的私钥
 * @return {Buffer} 合法的32个字节的私钥
 */
function GeneratePrivateKey() {
    let privKey;
    do {
        privKey = crypto.randomBytes(32);
    } while (!secp256k1.privateKeyVerify(privKey));
    return privKey;
}

/**
 * 根据私钥匙产生公钥
 * @param {Buffer} privKey 32个字节的合法私钥
 * @param {Boolean} compressed 是否为压缩格式
 * @return {Buffer} 公钥
 */
function GetPublicKey(privKey, compressed = false) {
    return secp256k1.publicKeyCreate(privKey, compressed);
}

/**
 * 转换公钥格式
 * @param {Buffer} pubKey 公钥
 * @param {Boolean} compressed 是否为压缩格式
 * @return {Buffer} 
 */
function ConvertPublicKey(pubKey, compressed) {
    return secp256k1.publicKeyConvert(pubKey, compressed);
}

module.exports = {
    IsValidPrivateKey,
    GeneratePrivateKey,
    GetPublicKey,
    ConvertPublicKey,
};
