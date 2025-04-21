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

function ah_hide(id) {
    $(id).hide();
}

function ah_show(id) {
    $(id).show();
}

function ah_itemInfo(slot, sheetId) {
    ah_show("ui:interface:item_info");

    var sheet = $("ui:interface:item_info:content:sheet");
    if (sheet.firstChild != null) {
        sheet.removeChild(sheet.firstChild);
    }
    sheet.appendChild(getSheet(sheetId));

    loadItemInfo(sheetId, slot);

    return false;
}

var item_info;

function loadItemInfo(sheet_id, slot) {
    var sitem = SItems[sheet_id];
    item_info = {};
    item_info["sheet_id"] = sitem.sheet_id;
    item_info["formuli"] = [];
    item_info["average"] = sitem.craft.purity;
    item_info["color"] = sitem.craft.color;
    item_info["family"] = sitem.craft.family;
    item_info["quality"] = sitem.craft.quality;

    var slots = [];
    var index = 0;
    for (var part in sitem.craft.data) {
        item_info["formuli"][index] = {};
        item_info["formuli"][index]["slot"] = part;
        item_info["formuli"][index]["race"] = sitem.craft.data[part].ecosystem;
        item_info["formuli"][index]["stats"] = sitem.craft.data[part].stat;
        ++index;
    }
    generateItemInfo(slot);
}

function generateItemInfo(slot) {
    if (slot == null) {
        slot = item_info["formuli"][0]["slot"];
    }
    var islot = 0;
    for (var i = 0; i < item_info["formuli"].length; i++) {
        if (item_info["formuli"][i]["slot"] == slot) {
            islot = i;
            break;
        }
    }

    var sheet_id = $("ui:interface:item_info:content:lbl_sheet_id");
    var quality = $("ui:interface:item_info:content:lbl_quality");
    var race = $("ui:interface:item_info:content:lbl_ecosystem");
    var family = $("ui:interface:item_info:content:lbl_family");
    var color = $("ui:interface:item_info:content:lbl_color");

    sheet_id.innerHTML = item_info["sheet_id"];
    quality.innerHTML = "Q" + item_info["quality"];
    race.innerHTML = translate("iompf" + item_info["formuli"][islot]["race"]);
    family.innerHTML = translate("mpfam" + item_info["family"]);
    color.innerHTML = translate("mpcol" + item_info["color"]);

    var item_parts = $("ui:interface:item_info:content:item_parts");
    for (; item_parts.options.length > 0;) {
        item_parts.remove(0);
    }

    for (var i = 0; i < item_info["formuli"].length; i++) {
        slot = item_info["formuli"][i]["slot"];
        var item_part = document.createElement("option");
        item_part.text = translate(Slots[slot].label);
        item_part.value = i;
        item_parts.add(item_part, null);
    }

    showItemStats(islot);
}

function showItemStats(islot) {
    var item_parts = $("ui:interface:item_info:content:item_parts");
    item_parts.selectedIndex = islot;

    var stats = $("ui:interface:item_info:content:stats");
    if (stats.firstChild) {
        stats.removeChild(stats.firstChild);
    }
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");

    var slot = item_info["formuli"][islot]["slot"];
    var part = $("ui:interface:item_info:content:img_part");
    part.removeClassName(part_class);
    part_class = Slots[slot].icon;
    part.addClassName(part_class);
    for (var mpstat = 0; mpstat < 34; ++mpstat) {
        if (Slots[slot].stat.indexOf(mpstat) == -1) {
            continue;
        }
        var stat = item_info["formuli"][islot]["stats"][mpstat];
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        var label = document.createTextNode(translate("mpstat" + mpstat));

        cell.appendChild(label);
        row.appendChild(cell);

        var cell = document.createElement("td");
        var bar = getProgressBar(stat);
        cell.appendChild(bar);
        row.appendChild(cell);

        var cell = document.createElement("td");
        var label = document.createTextNode(stat);
        cell.appendChild(label);
        row.appendChild(cell);

        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    stats.appendChild(table);
}

function getProgressBar(value) {
    var bar = document.createElement("div");
    var bar_content = document.createElement("div");

    bar_content.style.width = value;
    bar_content.setAttribute("class", "bar_content");

    bar.appendChild(bar_content);
    bar.setAttribute("class", "bar");

    return bar;
}

try {
    startZeroCraft();
} catch (e) {
}
