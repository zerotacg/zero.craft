import SItems from "data/materials";

const UNKOWN_ITEM = {
    "sheet_id": -1,
    "icon": {"texture": ["item_default"]},
    "craft": {
        "part": 0
    }
};

export default class Registry {

    lookup(id) {
        return SItems[id] || UNKOWN_ITEM;
    }
}
