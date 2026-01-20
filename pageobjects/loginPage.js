class LoginPage {
    constructor(page) {
        this.page = page;
        this.pageHeader = () => page.locator('//h1[text()="Log in"]');
        this.userNameField = () => page.locator("#userEmail");
        this.passwordValue = () => page.locator("#userPassword");
        this.loginButton = () => page.locator("#login");
    }

    async loginMethod(username, password) {
        await this.page.goto('https://rahulshettyacademy.com/client');
        await this.pageHeader().waitFor();
        await this.userNameField().fill(username);
        await this.passwordValue().fill(password);
        await this.loginButton().click();
    }

}
export default LoginPage