var language = "en";
var materials = [];
var sheets = [];
var texts = new CTextList();
var mat_slot_selected = -1;
var debug_level = 10;
var part_class = "ico_blade";
var craft_slots_used = [];
var craft =
{
    "color": 0,
    "purity": 0,
    "max": 0,
    "average": 0,
    "m": 0,
    "x": 0,
    "stats": {}
};

function startZeroCraft() {
    loadTexts();
    generateSlotList();
    loadTranslations(language);
}

function newText( label ) {
    var div = document.createElement("div");
    var text = document.createTextNode(translate(label));

    Element.extend(div);
    div.addClassName("text");
    div.appendChild(text);

    texts.add(new CText(label, div));

    return div;
}

function newIcon( texture_name, label ) {
    var img = document.createElement("div");
    Element.extend(img);

    img.addClassName("texture");
    img.addClassName(texture_name);

    if ( label != undefined ) {
        img.setAttribute("title", translate(label));
        texts.add(new CAttributeText(label, img, "title"));
    }
    return img;
}

function loadTexts() {
    var text_divs = $$(".text");

    for ( var index = 0; index < text_divs.length; ++index ) {
        texts.add(new CText(text_divs[ index ].innerHTML, text_divs[ index ]));
    }
}

function loadTranslations( lang ) {
    language = lang;
    texts.translate(lang);
}

function doCraft() {
    //loggetFunctionName(arguments.callee.toString()) + " - start");
    var stats = {};
    var stat;
    var color = 1;
    var colors =
    {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0
    };
    var purity = 0;
    var class_count = 0;
    var quantity = 0;
    var sitem;

    for ( var slot in craft_slots_used ) {
        if ( isNaN(slot) ) {
            continue;
        }
        for ( var mpstat = 0; mpstat < 34; ++mpstat ) {
            if ( Slots[ slot ].stat.indexOf(mpstat) == -1 ) {
                continue;
            }
            if ( stats[ mpstat ] ) {
                stat = stats[ mpstat ];
            }
            else {
                stat = {};
                stat.before = 0;
                stat.after = 0;
                stat.count = 0;
            }
            for ( var sheet_id in craft_slots_used[ slot ] ) {
                if ( isNaN(sheet_id) ) {
                    continue;
                }
                quantity = craft_slots_used[ slot ][ sheet_id ];
                sitem = SItems[ sheet_id ].craft;

                if ( mpstat === 0 ) {
                    colors[ sitem.color ] += quantity;
                    purity += sitem.purity * quantity;
                    class_count += quantity;
                }
                stat.before += (sitem.data[ slot ].stat[ mpstat ] / 100) * quantity;
                stat.count += quantity;
            }
            stats[ mpstat ] = stat;
        }
    }
    var max = { "before": 0 };
    var average = 0;
    var count = 0;
    var sum_before = 0;
    for ( var mpstat in stats ) {
        stat = stats[ mpstat ];
        count += stat.count;
        average += stat.before;
        if ( stat.count != 0 ) {
            stat.before /= stat.count;
        }
        sum_before += stat.before;
        if ( !max ) {
            max = stat;
        }
        if ( stat.before > max.before ) {
            max = stat;
        }
    }
    craft.max = max.before;

    if ( count != 0 ) {
        average /= count;
    }
    craft.average = average;

    var delta = max.before - average;
    if ( delta >= 0.35 ) {
        max.after += 0.1;
    }
    if ( delta < 0.3 ) {
        delta = 0.3 / delta;
    }
    delta = Math.max(1.00, Math.min(2.00, delta));

    var sum_after = 0;
    var stat_count = 0;
    var count_less_max = 0;
    var count_greater_min = 0;
    for ( var mpstat in stats ) {
        stat = stats[ mpstat ];
        stat.after += (stat.before - average) * delta + average;
        ++count_less_max;
        ++count_greater_min;
        if ( stat.after > 1.00 ) {
            stat.after = 1.00;
            --count_less_max;
        }
        else if ( stat.after < 0.00 ) {
            stat.after = 0.00;
            --count_greater_min;
        }
        sum_after += stat.after;
        ++stat_count;
    }
    craft.m = delta;

    delta = sum_after - sum_before;

    if ( Math.abs(delta) > stat_count * 0.001 ) {
        if ( delta < 0 ) {
            delta = Math.abs(delta) / count_less_max;
        }
        else if ( delta > 0 ) {
            delta = -(delta / count_greater_min);
        }

        for ( var mpstat in stats ) {
            stat = stats[ mpstat ];
            stat.after += delta;

            if ( stat.after > 1.00 ) {
                stat.after = 1.00;
            }
            else if ( stat.after < 0.00 ) {
                stat.after = 0.00;
            }
        }
    }
    if ( class_count != 0 ) {
        purity /= class_count;
    }
    if ( purity >= 80 ) {
        purity = 4;
    }
    else if ( purity >= 65 ) {
        purity = 3;
    }
    else if ( purity >= 50 ) {
        purity = 2;
    }
    else if ( purity >= 35 ) {
        purity = 1;
    }
    else {
        purity = 0;
    }
    max = 0;
    for ( var mpcol in colors ) {
        if ( colors[ mpcol ] > max ) {
            color = mpcol;
            max = colors[ mpcol ];
        }
    }
    craft.color = color;
    craft.purity = purity;
    craft.stats = stats;

    loadPreview();
}
function slotAddRemove( slot ) {
    //loggetFunctionName(arguments.callee.toString()) + " - start");
    if ( craft_slots_used[ slot ] ) {
        delete(craft_slots_used[ slot ]);
    }
    else {
        craft_slots_used[ slot ] = [];
        //craft_slots_used[slot][0] = 0;

        if ( materials[ slot ] == null ) {
            loadMaterials(slot);
        }
    }
    updateItemList();
    //loggetFunctionName(arguments.callee.toString()) + " - end");
}
function generateSlotList() {
    //loggetFunctionName(arguments.callee.toString()) + " - start");
    var slots = $("ui:interface:main:slots");
    var table = slots.select("table");

    if ( table.length ) {
        slots.removeChild(table[ 0 ]);
    }
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");

    for ( var slot in Slots ) {
        var row = document.createElement("tr");
        var cell = document.createElement("td");

        var label = Slots[ slot ].label;
        var image_file = Slots[ slot ].icon;
        var icon = newIcon(image_file, label);
        var text = newText(label);

        var txt_button = document.createElement("a");
        txt_button.setAttribute("href", "javascript:slotAddRemove(TSlot." + TSlot[ slot ] + ")");
        txt_button.appendChild(text);

        cell.appendChild(icon);
        cell.appendChild(txt_button);

        row.appendChild(cell);
        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    slots.appendChild(table);
    //loggetFunctionName(arguments.callee.toString()) + " - end");
}
function generateMaterialList( slot ) {
    //loggetFunctionName(arguments.callee.toString()) + " - start");
    var selection = $("ui:interface:material_selection");
    var table = selection.select("table");

    if ( table.length ) {
        selection.removeChild(table[ 0 ]);
    }

    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    var row = document.createElement("tr");
    var max_width = 15;
    var count = 0;

    var sorted_mats = [];
    var reverse_lookup = {};
    var sitem;
    var sort_string;

    if ( materials[ slot ] == undefined ) {
        return;
    }
    for ( var index = 0; index < materials[ slot ].length; ++index ) {
        sitem = materials[ slot ][ index ];
        sort_string = "" + translate("mpfam" + sitem.craft.family) + sitem.craft.purity + sitem.craft.quality + sitem.sheet_id;
        reverse_lookup[ sort_string ] = sitem;
        sorted_mats.push(sort_string);
    }
    sorted_mats.sort();

    //for(var i in sorted_mats)
    for ( var index = 0; index < sorted_mats.length; ++index ) {
        sitem = reverse_lookup[ sorted_mats[ index ] ];

        if ( !craft_slots_used[ slot ] || !craft_slots_used[ slot ][ sitem.sheet_id ] ) {
            count++;
            var cell = document.createElement("td");

            var sheet = getSheet(sitem.sheet_id);
            var action = "ah_addMaterial(" + slot + ", " + sitem.sheet_id + ")";
            var sheet_id = sitem.sheet_id;
            var value = slot;
            sheet.setAttribute("onclick", action);
            /*
             sheet.observe
             (
             "click"
             , function(event)
             {
             if(event.isLeftClick())
             {
             ah_addMaterial(value, sheet_id);
             };
             }
             );
             */
            action = "ah_itemInfo(event, this, " + slot + ", " + sitem.sheet_id + ")";
            sheet.setAttribute("oncontextmenu", action);

            cell.appendChild(sheet);

            row.appendChild(cell);
            if ( count >= max_width ) {
                tbody.appendChild(row);
                var row = document.createElement("tr");
                count = 0;
            }
        }
    }
    if ( count < max_width ) {
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    selection.appendChild(table);
    //loggetFunctionName(arguments.callee.toString()) + " - end");
}
function updateItemList() {
    //loggetFunctionName(arguments.callee.toString()) + " - start");
    var item_list = $("ui:interface:main:craft_window:item_list");
    var table = item_list.getElementsByTagName("table");
    var max_width = 8;

    if ( table.length ) {
        item_list.removeChild(table[ 0 ]);
    }

    var table = document.createElement("table");
    var tbody = document.createElement("tbody");

    for ( var slot in craft_slots_used ) {
        if ( !isNaN(slot) ) {
            var count = 0;
            var row = document.createElement("tr");
            var cell = document.createElement("td");

            var label = Slots[ slot ].label;
            var image_file = Slots[ slot ].icon;
            var icon = newIcon(image_file, label);
            var text = newText(label);

            cell.appendChild(icon);
            cell.appendChild(text);
            cell.setAttribute("colspan", 8);

            row.appendChild(cell);
            tbody.appendChild(row);

            var row = document.createElement("tr");
            row.setAttribute("id", Slots[ slot ].label);

            for ( var item in craft_slots_used[ slot ] ) {
                if ( !isNaN(item) && item > 0 ) {
                    count++;
                    var cell = document.createElement("td");
                    var quantity = craft_slots_used[ slot ][ item ];
                    var img = getSheet(item, quantity);

                    var action = "ah_selectMaterialQuantity(event, this, ";
                    action += slot + ", " + item + ")";
                    img.setAttribute("onclick", action);
                    action = "ah_itemInfo(event, this, " + slot + ", " + item + ")";
                    img.setAttribute("oncontextmenu", action);

                    cell.appendChild(img);
                    row.appendChild(cell);
                    if ( count >= max_width ) {
                        count = 0;
                        tbody.appendChild(row);
                        var row = document.createElement("tr");
                    }
                }
            }

            var cell = document.createElement("td");
            var img = newIcon("w_slot_item");

            var action = "ah_selectMaterial(event, " + slot + ")";
            img.setAttribute("onclick", action);
            //var value = slot;
            //img.observe("click", function(event){ ah_selectMaterial(event, value)} );

            cell.appendChild(img);
            row.appendChild(cell);

            tbody.appendChild(row);
        }
    }
    table.appendChild(tbody);
    item_list.appendChild(table);
    doCraft();
    //loggetFunctionName(arguments.callee.toString()) + " - end");
}
function loadPreview() {
    //loggetFunctionName(arguments.callee.toString()) + " - start");
    var preview = $("ui:interface:main:craft_window:preview");
    var table = preview.getElementsByTagName("table");

    while ( table.length ) {
        preview.removeChild(table[ 0 ]);
        table = preview.getElementsByTagName("table");
    }
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    var param_color = craft.color;
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    var row = document.createElement("tr");

    var cell = document.createElement("td");
    var cell_text = document.createTextNode("max: " + Math.floor(craft.max * 100 * 1000) / 1000);
    cell.appendChild(cell_text);
    row.appendChild(cell);

    var cell = document.createElement("td");
    var cell_text = document.createTextNode("avg: " + Math.floor(craft.average * 100 * 1000) / 1000);
    cell.appendChild(cell_text);
    row.appendChild(cell);

    var cell = document.createElement("td");
    var cell_text = document.createTextNode("max - avg: " + Math.floor((craft.max - craft.average) * 100 * 1000) / 1000);
    cell.appendChild(cell_text);
    row.appendChild(cell);

    var cell = document.createElement("td");
    var cell_text = document.createTextNode("m: " + Math.floor(craft.m * 100) / 100);
    cell.appendChild(cell_text);
    row.appendChild(cell);
    tbody.appendChild(row);

    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var cell_text = document.createTextNode("Color: " + translate("mpcol" + craft.color));
    cell.appendChild(cell_text);
    row.appendChild(cell);
    tbody.appendChild(row);

    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var cell_text = document.createTextNode("Class: " + translate("uiItemRMClass" + craft.purity));
    cell.appendChild(cell_text);
    row.appendChild(cell);
    tbody.appendChild(row);

    table.appendChild(tbody);
    preview.appendChild(table);

    var table = document.createElement("table");
    var tbody = document.createElement("tbody");

    var row = document.createElement("tr");

    var cell = document.createElement("th");
    var cell_text = document.createTextNode("Stat");
    cell.appendChild(cell_text);
    row.appendChild(cell);
    var cell = document.createElement("th");
    var cell_text = document.createTextNode("before");
    cell.appendChild(cell_text);
    row.appendChild(cell);
    var cell = document.createElement("th");
    var cell_text = document.createTextNode("after");
    cell.appendChild(cell_text);
    row.appendChild(cell);
    var cell = document.createElement("th");
    var cell_text = document.createTextNode("rubarn");
    cell.appendChild(cell_text);
    row.appendChild(cell);
    tbody.appendChild(row);

    for ( var mpstat in craft.stats ) {
        var stat_before = craft.stats[ mpstat ].before;
        var stat = craft.stats[ mpstat ].after;

        var row = document.createElement("tr");
        var cell = document.createElement("td");

        var label = translate("mpstat" + mpstat);
        var cell_text = document.createTextNode(label);

        cell.appendChild(cell_text);
        row.appendChild(cell);

        var cell = document.createElement("td");
        //var cell_text = document.createTextNode(stat_before * 100);
        var cell_text = document.createTextNode(Math.floor(stat_before * 100 * 1000) / 1000);
        cell.appendChild(cell_text);
        row.appendChild(cell);

        var cell = document.createElement("td");
        //var cell_text = document.createTextNode(stat * 100);
        var cell_text = document.createTextNode(Math.floor(stat * 100 * 1000) / 1000);
        cell.appendChild(cell_text);
        row.appendChild(cell);

        var cell = document.createElement("td");
        //var cell_text = document.createTextNode(stat * 120);
        var cell_text = document.createTextNode(Math.floor(stat * 120 * 1000) / 1000);
        cell.appendChild(cell_text);
        row.appendChild(cell);

        tbody.appendChild(row);
    }
    table.appendChild(tbody);
    preview.appendChild(table);

    //loggetFunctionName(arguments.callee.toString()) + " - end");
}
function loadMaterials( slot ) {
    //generateMaterialList(slot);
    var sheet;
    for ( var sheet_id in SItems ) {
        sheet = SItems[ sheet_id ];
        if ( sheet.craft.part & Math.pow(2, slot) ) {
            if ( materials[ slot ] == undefined ) {
                materials[ slot ] = [];
            }
            materials[ slot ].push(sheet);
        }
    }
}
function translate( label, lang ) {
    //loggetFunctionName(arguments.callee.toString()) + " - start");
    if ( lang == null ) {
        lang = language;
    }
    var txt_translated = "<NotExist:" + lang + ":" + label + ">";

    // fallback to english
    if ( lang != 'en' ) {
        txt_translated = translate(label, 'en');
    }
    if ( translation[ lang ] && translation[ lang ][ label ] ) {
        txt_translated = translation[ lang ][ label ];
    }
    else {
        var start_sitem = label.indexOf(".sitem.");
        if ( start_sitem != -1 ) {
            var sheet_name = label.substring(0, start_sitem);
            var property = label.substring(start_sitem + 7);

            if ( ItemWords[ lang ]
                && ItemWords[ lang ][ sheet_name ]
                && ItemWords[ lang ][ sheet_name ][ property ] ) {
                txt_translated = ItemWords[ lang ][ sheet_name ][ property ];
            }
        }
    }
    //loggetFunctionName(arguments.callee.toString()) + " - end");
    return txt_translated;
}
function getSheet( sheet_id, quantity ) {
    //loggetFunctionName(arguments.callee.toString()) + " - start");

    if ( sheets[ sheet_id ] != null
        && quantity == null ) {
        //loggetFunctionName(arguments.callee.toString()) + " - cached sheet loaded");
        //loggetFunctionName(arguments.callee.toString()) + " - end");
        return sheets[ sheet_id ].cloneNode(true);
    }
    var sheet = document.createElement("div");
    var slot = document.createElement("div");
    var texture = [];
    var img;
    Element.extend(sheet);

    for ( var index in SItems[ sheet_id ].icon.texture ) {
        texture.push(SItems[ sheet_id ].icon.texture[ index ]);
    }
    for ( var i = 0; i < texture.length; i++ ) {
        if ( !texture[ i ] ) {
            continue;
        }
        img = newIcon(texture[ i ]);

        sheet.appendChild(img);
    }
    if ( SItems[ sheet_id ].icon.text ) {
        var text_white = document.createElement("div");

        var text = document.createTextNode(SItems[ sheet_id ].icon.text.toUpperCase());
        text_white.appendChild(text);

        text_white.setAttribute("class", "text");
        sheet.appendChild(text_white);
    }
    quality = SItems[ sheet_id ].craft.quality;
    if ( quality != "" ) {
        var text_white = document.createElement("div");

        var text = document.createTextNode(quality);
        text_white.appendChild(text);

        text_white.setAttribute("class", "quality");
        sheet.appendChild(text_white);
    }
    if ( quantity != null ) {
        var text_white = document.createElement("div");

        var text = document.createTextNode(quantity);
        text_white.appendChild(text);

        text_white.setAttribute("class", "quantity");
        sheet.appendChild(text_white);
    }
    sheet.setAttribute("title", translate(Sheets[ sheet_id ] + ".name"));
    sheet.setAttribute("class", "sheet");

    texts.add(new CAttributeText(Sheets[ sheet_id ] + ".name", sheet, "title"));

    if ( quantity == null ) {
        sheets[ sheet_id ] = sheet.cloneNode(true);
    }
    //loggetFunctionName(arguments.callee.toString()) + " - end");
    return sheet;
}
function ah_hide( id ) {
    //log"ah_hide(" + id + ")");
    $(id).hide();
}
function ah_show( id ) {
    //log"ah_show(" + id + ")");
    $(id).show();
}
function ah_showHide( id ) {
    //log"ah_showHide(" + id + ")");
    $(id).toggle();
}
function ah_selectMaterial( event, slot ) {
    //loggetFunctionName(arguments.callee.toString()));
    var selection = $("ui:interface:material_selection");
    selection.style.left = event.clientX + document.body.scrollLeft - 25;
    selection.style.top = event.clientY + document.body.scrollTop - 25;

    ah_show("ui:interface:material_selection");
    generateMaterialList(slot);
    mat_slot_selected = slot;
}
function ah_addMaterial( slot, sheetID ) {
    //loggetFunctionName(arguments.callee.toString()));
    if ( !craft_slots_used[ slot ] ) {
        craft_slots_used[ slot ] == [];
    }
    craft_slots_used[ slot ][ sheetID ] = 1;
    updateItemList();
    ah_hide("ui:interface:material_selection");
}
function ah_selectMaterialQuantity( event, element, slot, sheetID ) {
    //loggetFunctionName(arguments.callee.toString()) + " - start");
    var select_quantity = $("ui:interface:quantity_selection");

    select_quantity.style.left = event.clientX + document.body.scrollLeft - 30;
    select_quantity.style.top = event.clientY + document.body.scrollTop - 90;

    var sheet = $("ui:interface:quantity_selection:sheet");
    if ( sheet.firstChild != null ) {
        sheet.removeChild(sheet.firstChild);
    }
    sheet.title = element.title;
    sheet.appendChild(element.cloneNode(true));
    sheet.firstChild.setAttribute("onclick", "");
    sheet.firstChild.setAttribute("onmousedown", "");

    var remove = $("ui:interface:quantity_selection:button_remove");
    var action = "ah_setMaterialQuantity(" + slot + ", " + sheetID + ", 0)";
    remove.setAttribute("onclick", action);

    var ok = $("ui:interface:quantity_selection:button_ok");
    var action = "ah_setMaterialQuantity(" + slot + ", " + sheetID + ")";
    ok.setAttribute("onclick", action);

    var txt = $("ui:interface:quantity_selection:txt_quantity");
    var quantity = craft_slots_used[ slot ][ sheetID ];
    var action = "if(event.keyCode == 13){ah_setMaterialQuantity(" + slot + ", " + sheetID + ")}";
    txt.value = quantity;
    txt.setAttribute("onkeypress", action);

    txt.select();
    txt.focus();
    ah_show("ui:interface:quantity_selection");
    //loggetFunctionName(arguments.callee.toString()) + " - end");
}
function ah_setMaterialQuantity( slot, sheetID, count ) {
    //loggetFunctionName(arguments.callee.toString()) + " - start");
    ah_hide("ui:interface:quantity_selection");

    if ( count == null ) {
        var txt = $("ui:interface:quantity_selection:txt_quantity");
        count = parseInt(txt.value);
    }

    if ( count <= 0 ) {
        count = 0;
        delete(craft_slots_used[ slot ][ sheetID ]);
    }
    else {
        craft_slots_used[ slot ][ sheetID ] = count;
    }

    updateItemList();
    //loggetFunctionName(arguments.callee.toString()) + " - end");
}
function ah_itemInfo( event, element, slot, sheetId ) {
    if ( event.button != 2 ) {
        return false;
    }

    //loggetFunctionName(arguments.callee.toString()) + " - start");

    var item_info = $("ui:interface:item_info");
    item_info.style.left = event.clientX + document.body.scrollLeft - 25;
    item_info.style.top = event.clientY + document.body.scrollTop - 25;

    ah_show("ui:interface:item_info");

    var sheet = $("ui:interface:item_info:content:sheet");
    if ( sheet.firstChild != null ) {
        sheet.removeChild(sheet.firstChild);
    }
    sheet.title = element.title;
    sheet.appendChild(element.cloneNode(true));
    sheet.firstChild.setAttribute("onclick", "");
    sheet.firstChild.setAttribute("oncontextmenu", "");

    loadItemInfo(sheetId, slot);

    if ( event.preventDefault ) {
        event.preventDefault();
    }
    else {
        event.returnValue = false;
    }
    //loggetFunctionName(arguments.callee.toString()) + " - end");

    return false;
}
var item_info;

function loadItemInfo( sheet_id, slot ) {
    var sitem = SItems[ sheet_id ];
    item_info = {};
    item_info[ "sheet_id" ] = sitem.sheet_id;
    item_info[ "formuli" ] = [];
    item_info[ "average" ] = sitem.craft.purity;
    item_info[ "color" ] = sitem.craft.color;
    item_info[ "family" ] = sitem.craft.family;
    item_info[ "quality" ] = sitem.craft.quality;

    var slots = [];
    /*
     for(var part in Slots)
     {
     if(sitem.craft.part & Math.pow(2, part))
     {
     slots.push(part);
     };
     };
     */
    var index = 0;
    for ( var part in sitem.craft.data ) {
        item_info[ "formuli" ][ index ] = {};
        item_info[ "formuli" ][ index ][ "slot" ] = part;
        item_info[ "formuli" ][ index ][ "race" ] = sitem.craft.data[ part ].ecosystem;
        item_info[ "formuli" ][ index ][ "stats" ] = sitem.craft.data[ part ].stat;
        ++index;
    }
    generateItemInfo(slot);

    //loggetFunctionName(arguments.callee.toString()) + " - end");
}
function generateItemInfo( slot ) {
    //loggetFunctionName(arguments.callee.toString()) + " - start");
    if ( slot == null ) {
        slot = item_info[ "formuli" ][ 0 ][ "slot" ];
    }
    var islot = 0;
    for ( var i = 0; i < item_info[ "formuli" ].length; i++ ) {
        if ( item_info[ "formuli" ][ i ][ "slot" ] == slot ) {
            islot = i;
            break;
        }
    }

    var sheet_id = $("ui:interface:item_info:content:lbl_sheet_id");
    var quality = $("ui:interface:item_info:content:lbl_quality");
    var race = $("ui:interface:item_info:content:lbl_ecosystem");
    var family = $("ui:interface:item_info:content:lbl_family");
    var color = $("ui:interface:item_info:content:lbl_color");

    sheet_id.innerHTML = item_info[ "sheet_id" ];
    quality.innerHTML = "Q" + item_info[ "quality" ];
    race.innerHTML = translate("iompf" + item_info[ "formuli" ][ islot ][ "race" ]);
    family.innerHTML = translate("mpfam" + item_info[ "family" ]);
    color.innerHTML = translate("mpcol" + item_info[ "color" ]);

    var item_parts = $("ui:interface:item_info:content:item_parts");
    for ( ; item_parts.options.length > 0; ) {
        item_parts.remove(0);
    }

    for ( var i = 0; i < item_info[ "formuli" ].length; i++ ) {
        slot = item_info[ "formuli" ][ i ][ "slot" ];
        var item_part = document.createElement("option");
        item_part.text = translate(Slots[ slot ].label);
        item_part.value = i;
        item_parts.add(item_part, null);
    }

    showItemStats(islot);
    //loggetFunctionName(arguments.callee.toString()) + " - end");
}
function showItemStats( islot ) {
    //loggetFunctionName(arguments.callee.toString()) + " - start");

    var item_parts = $("ui:interface:item_info:content:item_parts");
    item_parts.selectedIndex = islot;

    var stats = $("ui:interface:item_info:content:stats");
    if ( stats.firstChild ) {
        stats.removeChild(stats.firstChild);
    }
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");

    var slot = item_info[ "formuli" ][ islot ][ "slot" ];
    var part = $("ui:interface:item_info:content:img_part");
    part.removeClassName(part_class);
    part_class = Slots[ slot ].icon;
    part.addClassName(part_class);
    for ( var mpstat = 0; mpstat < 34; ++mpstat ) {
        if ( Slots[ slot ].stat.indexOf(mpstat) == -1 ) {
            continue;
        }
        var stat = item_info[ "formuli" ][ islot ][ "stats" ][ mpstat ];
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
        //stat_count++;
    }
    table.appendChild(tbody);
    stats.appendChild(table);
}

function getProgressBar( value ) {
    //loggetFunctionName(arguments.callee.toString()) + " - start");

    var bar = document.createElement("div");
    var bar_content = document.createElement("div");

    bar_content.style.width = value;
    bar_content.setAttribute("class", "bar_content");

    bar.appendChild(bar_content);
    bar.setAttribute("class", "bar");

    //loggetFunctionName(arguments.callee.toString()) + " - end");
    return bar;
}
function log( text ) {
    var log_list = $("ui:interface:log");
    var new_line = document.createElement("br");
    var log_line = document.createTextNode(Date() + " " + text + "\n");
    //var log_line = document.createTextNode(text);

    if ( debug_level > 0 ) {
        log_list.appendChild(log_line);
        log_list.appendChild(new_line);
    }
}
function getFunctionName( funcName ) {

    funcName = funcName.substr("function ".length);        // trim off "function "
    funcName = funcName.substr(0, funcName.indexOf("("));

    return funcName + "()";
}
try {
    startZeroCraft();
}
catch ( e ) {
}
