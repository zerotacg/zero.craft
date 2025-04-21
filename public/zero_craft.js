var language = "en";
var sheets = [];

function startZeroCraft() {
}


function translate(label, lang) {
    if (lang == null) {
        lang = language;
    }
    var txt_translated = "<NotExist:" + lang + ":" + label + ">";

    // fallback to english
    if (lang != 'en') {
        txt_translated = translate(label, 'en');
    }
    if (translation[lang] && translation[lang][label]) {
        txt_translated = translation[lang][label];
    } else {
        var start_sitem = label.indexOf(".sitem.");
        if (start_sitem != -1) {
            var sheet_name = label.substring(0, start_sitem);
            var property = label.substring(start_sitem + 7);

            if (ItemWords[lang]
                && ItemWords[lang][sheet_name]
                && ItemWords[lang][sheet_name][property]) {
                txt_translated = ItemWords[lang][sheet_name][property];
            }
        }
    }

    return txt_translated;
}


try {
    startZeroCraft();
} catch (e) {
}
