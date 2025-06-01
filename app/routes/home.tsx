import type {Route} from "./+types/home";
import {Crafting} from "~/crafting/crafting";
import {fetchMaterials} from "~/data/material";
import Context from "~/data/MaterialsContext";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Craft Simulator"},
        {name: "description", content: "preview crafting results for Ryzom"},
    ];
}

export async function clientLoader({params}: Route.ClientLoaderArgs) {
    return await fetchMaterials();
}

export default function Home({loaderData}: Route.ComponentProps) {
    return (
        <Context.Provider value={loaderData}>
            <Crafting/>
        </Context.Provider>
    );
}
