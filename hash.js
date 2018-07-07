
const crypto = require("crypto");

/**
 * Sha256算法
 * @param {Buffer|String} bufferOrHex
 * @return {Buffer}
 */
function Sha256(bufferOrHex) {
    if (typeof(bufferOrHex) == "string") bufferOrHex = Buffer.from(bufferOrHex, "hex");
    return crypto.createHash("sha256").update(bufferOrHex).digest();
}

/**
 * Ripemd160算法
 * @param {Buffer|String} bufferOrHex
 * @return {Buffer}
 */
function Ripemd160(bufferOrHex) {
    if (typeof(bufferOrHex) == "string") bufferOrHex = Buffer.from(bufferOrHex, "hex");
    return crypto.createHash("ripemd160").update(bufferOrHex).digest();
}

/**
 * 比特币的Hash256算法 两次Sha256
 * @param {Buffer|String} bufferOrHex
 * @return {Buffer}
 */
function Hash256(bufferOrHex) {
    return Sha256(Sha256(bufferOrHex));
}

/**
 * 比特币的Hash160算法 先Sha256再Ripemd160
 * @param {Buffer|String} bufferOrHex
 * @return {Buffer}
 */
function Hash160(bufferOrHex) {
    return Ripemd160(Sha256(bufferOrHex));
}

module.exports = {
    Sha256,
    Ripemd160,
    Hash256,
    Hash160,
};
