import type {Config} from "@react-router/dev/config";

export default {
    ssr: false,
    basename: "/zero.craft/",

    async prerender() {
        return ["/"];
    },
} satisfies Config;
