import Rx from "rx";

export default class {
    static create() {
        return (Rx.Observable
                .fromEventPattern(
                    handler => window.addEventListener("hashchange", handler),
                    handler => window.removeEventListener("hashchange", handler)
                )
                .pluck("newURL")
                .startWith(location.hash)
                .map(url => url.split("#")[ 1 ])
        );
    }
}

