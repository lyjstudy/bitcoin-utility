
const base58 = require("base-x")("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
const hash = require("./hash.js");

/**
 * Base58Check编码
 * @param {Integer} type
 * @param {Buffer|String} bufferOrHex
 * @return {String}
 */
function Base58CheckEncode(type, bufferOrHex) {
    if (typeof(bufferOrHex) == "string") bufferOrHex = Buffer.from(bufferOrHex, "hex");
    const base = Buffer.concat([
        Buffer.from([type]),
        bufferOrHex,
    ]);
    const checksum = hash.Hash256(base).slice(0, 4);
    return base58.encode(Buffer.concat([
        base,
        checksum,
    ]));
}

/**
 * Base58Check解码
 * @param {String} str
 * @return {Object}
 */
function Base58CheckDecode(str) {
    const buf = base58.decode(str);
    const type = buf[0];
    const data = buf.slice(1, -4);
    const checksum = buf.slice(-4);
    let good = true;
    if (hash.Hash256(buf.slice(0, -4)).slice(0, 4).compare(checksum) != 0) {
        good = false;
    }
    return {
        type,
        data,
        checksum,
        good,
    };
}

function EncodeP2PKHAddress(pubkeyhash) {
    return Base58CheckEncode(0, pubkeyhash);
}

function EncodeP2PKAddress(pubkey) {
    return EncodeP2PKHAddress(hash.Hash160(pubkey));
}

module.exports = {
    Base58CheckEncode,
    Base58CheckDecode,
};
