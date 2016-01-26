const random = Math.random;
const floor = Math.floor;

export function randomValue(values) {
    return values[randomIndex(values.length)];
}

export function randomIndex(length) {
    return floor(random() * length);
}
