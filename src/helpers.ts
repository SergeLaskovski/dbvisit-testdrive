export function isValidEmail(email: string) {
    const mailformat: RegExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return email.match(mailformat);
}

export function secondsToHms(d: number) {
    const h: number = Math.floor(d / 3600);
    const m: number = Math.floor(d % 3600 / 60);
    const s: number = Math.floor(d % 3600 % 60);
    return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
}

export function jsonFriendlyErrorReplacer(key: string, value: any) {
    if (value instanceof Error) {
        return {
            // Pull all enumerable properties, supporting properties on custom Errors
            ...value,
            // Explicitly pull Error's non-enumerable properties
            name: value.name,
            message: value.message,
            stack: value.stack
        }
    }

    return value
}