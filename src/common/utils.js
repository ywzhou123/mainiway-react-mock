export const JSON2Str = (data) => {
    let toString = "";
    for (var key in data) {
        var obj = data[key];
        if (Array.isArray(obj)) {
            let arrayString = obj.join(",");
            toString += key + "=" + encodeURIComponent(arrayString) + "&";
        }
        else {
            toString += key + "=" + encodeURIComponent(data[key]) + "&";
        }
    }
    return toString.replace(/\&$/, "");
};
