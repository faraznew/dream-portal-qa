export class HomePage {
  constructor(page) {
    this.page = page;
    this.myDreamsBtn = page.locator('text=My Dreams');
  }

  async waitForLoading() {
    await this.page.waitForTimeout(3000); // simulate animation
  }

  async clickMyDreams() {
    await this.myDreamsBtn.click();
  }

  async isMainVisible() {
    return this.myDreamsBtn.isVisible();
  }
}
