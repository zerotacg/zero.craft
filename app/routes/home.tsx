import type {Route} from "./+types/home";
import {Crafting} from "~/crafting/crafting";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Craft Simulator"},
        {name: "description", content: "preview crafting results for Ryzom"},
    ];
}

export default function Home() {
    return <Crafting/>;
}
