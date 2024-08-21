import { Page, Locator, expect } from "@playwright/test";

export class TrianglePage {
  private readonly page: Page;
  private readonly title: Locator;
  private readonly inputA: Locator;
  private readonly inputB: Locator;
  private readonly inputC: Locator;
  private readonly submitButton: Locator;
  private readonly result: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = this.page.locator("#title");
    this.inputA = this.page.locator("input.js_a");
    this.inputB = this.page.locator("input.js_b");
    this.inputC = this.page.locator("input.js_c");
    this.submitButton = this.page.locator("button.btn-submit");
    this.result = this.page.locator("div.info.logg");
  }

  async goto() {
    await this.page.goto("https://playground.learnqa.ru/puzzle/triangle");
    // TODO: Without this hack the test will not work
    await this.page.waitForTimeout(1000);
  }

  async checkTitle() {
    return this.title.textContent();
  }

  async areInputsVisible() {
    const inputs = [this.inputA, this.inputB, this.inputC];
    for (const input of inputs) {
      const isVisible = await input.isVisible();
      if (!isVisible) {
        return false;
      }
    }
    return true;
  }

  async fillInputs(values: (string | number)[]) {
    await this.inputA.fill(values[0].toString());
    await this.inputB.fill(values[1].toString());
    await this.inputC.fill(values[2].toString());
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async getResultText() {
    await this.result.waitFor({ state: "visible" });
    return this.result.textContent();
  }

  // TODO move to POM
  async inputSubmitCheck(values: (string | number)[], expectedResult: string) {
    await this.goto();
    await this.fillInputs(values);
    await this.submitForm();
    const actualResult = await this.getResultText();

    expect(actualResult).toBe(expectedResult);
  }

  // TODO placeholder for gigifunction
  async check(values, expectedResult, ...rest) {
    // do everything: fillall, submit, check
  }
}
