export function sleepFor(seconds: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, 1000 * seconds)
    });
}