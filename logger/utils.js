/* we filter out credit card numbers, assuming that a credit
 * card number consists of 13 or more digits (without spaces). This function
 * does the actual masking.
 */
function maskCardNumbers(s) {
    var match;
    while (match = s.match(/(\d{13}\d*)/)) {
        var toBeMasked = match[1];
        s = s.replace(toBeMasked, toBeMasked.substring(0, 6) + '****' + toBeMasked.substring(toBeMasked.length - 4));
    }
    return s;
}


/* we filter predefined secret add to meta like secret, pwd ().This function
 * does the actual masking.
 */
function maskSecrets(msg, meta) {
    var match;
    var KEYS_SHOULD_BE_MASKED = ["secret", "pwd"];

    while (match = msg.match(/(secret|SECRET|Secret)/)) {
        var toBeMasked = match[1];
        msg = msg.replace(toBeMasked, '******');
    }
    meta = Object.keys(meta).reduce(function(maskedMeta, key) {
        console.log(JSON.stringify(maskedMeta) + "=" + key);
        if (KEYS_SHOULD_BE_MASKED.indexOf(key.toLowerCase())) {
            maskedMeta[key] = '<REDACTED>';
        } else {
            maskedMeta[key] = meta[key];
        }
        return maskedMeta;
    }, {});

    return {
        msg: msg,
        meta: meta
    };
}

var entry = {
    msg: "this contain secret sww",
    meta: {
        secret: "123456",
        pwd: "mytopsecret"
    }
}
console.log("====================")
console.log(JSON.stringify(entry));
console.log("====================")
var masked = maskSecrets(entry.msg, entry.meta);
console.log("====================")
console.log(JSON.stringify(masked));
