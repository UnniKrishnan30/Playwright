class ApiUtils {
    constructor(apiContext , payload) {
        this.apiContext = apiContext;
        this.payload = payload;
    }

    async getTocken() {
        // let apiContext = await request.newContext();
        let loginRsponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: this.payload });
        // expect(loginRsponse.ok()).toBeTruthy();
        let result = await loginRsponse.json();
        let token = result.token;
        console.log(token)
        return token;
    }
} 
export default ApiUtils