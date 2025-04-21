var language = "en";
var sheets = [];
var texts = new CTextList();
var part_class = "ico_blade";

function startZeroCraft() {
    loadTranslations(language);
}

function newIcon(texture_name, label) {
    var img = document.createElement("div");
    Element.extend(img);

    img.addClassName("texture");
    img.addClassName(texture_name);

    if (label != undefined) {
        img.setAttribute("title", translate(label));
        texts.add(new CAttributeText(label, img, "title"));
    }
    return img;
}

function loadTranslations(lang) {
    language = lang;
    texts.translate(lang);
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

function getSheet(sheet_id, quantity) {
    if (sheets[sheet_id] != null
        && quantity == null) {
        return sheets[sheet_id].cloneNode(true);
    }
    var sheet = document.createElement("div");
    var slot = document.createElement("div");
    var texture = [];
    var img;
    Element.extend(sheet);

    for (var index in SItems[sheet_id].icon.texture) {
        texture.push(SItems[sheet_id].icon.texture[index]);
    }
    for (var i = 0; i < texture.length; i++) {
        if (!texture[i]) {
            continue;
        }
        img = newIcon(texture[i]);

        sheet.appendChild(img);
    }
    if (SItems[sheet_id].icon.text) {
        var text_white = document.createElement("div");

        var text = document.createTextNode(SItems[sheet_id].icon.text.toUpperCase());
        text_white.appendChild(text);

        text_white.setAttribute("class", "text");
        sheet.appendChild(text_white);
    }
    quality = SItems[sheet_id].craft.quality;
    if (quality != "") {
        var text_white = document.createElement("div");

        var text = document.createTextNode(quality);
        text_white.appendChild(text);

        text_white.setAttribute("class", "quality");
        sheet.appendChild(text_white);
    }
    if (quantity != null) {
        var text_white = document.createElement("div");

        var text = document.createTextNode(quantity);
        text_white.appendChild(text);

        text_white.setAttribute("class", "quantity");
        sheet.appendChild(text_white);
    }
    sheet.setAttribute("title", translate(Sheets[sheet_id] + ".name"));
    sheet.setAttribute("class", "sheet");

    texts.add(new CAttributeText(Sheets[sheet_id] + ".name", sheet, "title"));

    if (quantity == null) {
        sheets[sheet_id] = sheet.cloneNode(true);
    }
    return sheet;
}


try {
    startZeroCraft();
} catch (e) {
}
