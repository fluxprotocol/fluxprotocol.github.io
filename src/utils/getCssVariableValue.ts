

export default function getCssVariableValue(key: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(key);
}
