import { Locator, Page, expect } from "@playwright/test";

export enum TriangleSide {
    A = '.js_a',
    B = '.js_b',
    C = '.js_c'
}



export type TriangleSideValue = string | number

export class TrianglePageModel {
    private readonly page: Page;
    private readonly triangleComponent: Locator;
    constructor(page: Page) {
        this.page = page;
        this.triangleComponent = this.page.locator('.field');
    }

    /**
     * fill a single triangle input on the form
     * @param side - side of a triangle
     * @param value - value to set
     */
    async fill(side: TriangleSide, value: TriangleSideValue) {
        const input = await this.triangleComponent.locator(side);
        expect(input).not.toBeNull();
        expect(input.isVisible()).toBeTruthy();

        await input.fill(value.toString())
    }
    async fillAll(values: [TriangleSideValue, TriangleSideValue, TriangleSideValue]) {
        const sides = [TriangleSide.A, TriangleSide.B, TriangleSide.C]
        for (const i in sides) {
            await this.fill(sides[i], values[i]);
        }
    }

    async checkMessage(message: string) {
        throw new Error('not implemented')
    }

    async checkError(message: string) {
        throw new Error('not implemented')
    }

    async submit() {
        throw new Error('not implemented')
    }

    async fillAllAndCheck(values: [TriangleSideValue, TriangleSideValue, TriangleSideValue], message: string, isError: boolean = false) {
        // workaround for not assigned callback
        // ToDo ABC-123
        await this.page.waitForTimeout(1000);
        await this.fillAll(values);
        if (isError) {
            await this.checkError(message)
        } else {
            await this.checkMessage(message)
        }
    }
}
