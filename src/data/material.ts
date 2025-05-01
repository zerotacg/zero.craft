import type {SItem} from "../craft/SItem";

export async function fetchMaterials(): Promise<SItem[]> {
    const response = await fetch("./data/materials.json");

    return (await response.json()).items ?? [];
}
