declare global {
    interface Window {
        grecaptcha: any;
        dataLayer: any
    }
}

export default class reCAPTCHA {
    siteKey: string;
    action?: string;

    constructor(siteKey: string, action?: string) {
        this.siteKey = siteKey;
        this.action = action;
    }

    loadReCaptcha() {
        const isScriptExist = document.getElementById('recaptcha-key');
        if (!isScriptExist) {
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${this.siteKey}`;
            script.type = "text/javascript";
            script.id = "recaptcha-key";
            document.body.appendChild(script);
        }
    }

    async getToken(): Promise<string> {
        let token = "";
        await window.grecaptcha.execute(this.siteKey, { action: this.action })
            .then((res: string) => {
                token = res;
            })
        return token;
    }
}