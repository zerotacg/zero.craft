import type {Route} from "./+types/home";
import {Welcome} from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "Craft Simulator"},
        {name: "description", content: "preview crafting results for Ryzom"},
    ];
}

export default function Home() {
    return <Welcome/>;
}
