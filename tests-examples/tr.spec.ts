import { test, expect, Page } from '@playwright/test';
import { TrianglePageModel } from '../page-models/tr';

// async function positiveTest(page: Page, first: string, second: string, third: string, text: string) {
//     await page.goto('https://playground.learnqa.ru/puzzle/triangle');
//     const a = await page.$('.js_a');
//     expect(a).not.toBeNull();
//     const b = await page.$('.js_b');
//     expect(b).not.toBeNull();
//     const c = await page.$('.js_c');
//     expect(c).not.toBeNull();
//     await a?.fill(first)
//     await b?.fill(second)
//     await c?.fill(third)

//     const submit = await page.$('.btn-submit');
//     expect(submit).not.toBeNull();
//     // since callback is not assigned immediately to the submit button
//     // we need to have this hack here
//     // TODO: ABC-123
//     await page.waitForTimeout(1000); 
//     await submit?.click();

//     const result = await page.$('.info.logg')
//     expect(result).not.toBeNull();

//     await result?.waitForElementState('visible')
//     expect(await result?.textContent()).toBe(text)
// }

test.describe('Triangle', () => {
    let pageModel: TrianglePageModel;
    test.beforeEach(async ({ page }) => {
        await page.goto('https://playground.learnqa.ru/puzzle/triangle');
        pageModel = new TrianglePageModel(page);
    })

    test.describe.skip('Positive tests', () => {
        test('Equal side triangle', () => {
            pageModel.fillAllAndCheck([1,1,1], 'Tralala')
        })

        // test('Page load', async ({ page }) => {
        //     const title = await page.title();
        //     expect(title).toEqual('LearnQA - Playground')
        //     const inputs = await page.$$('.group > input');
        //     expect(inputs.length).toEqual(3);
            
        // })
    
        // test('Equal side triangle', async ({ page }) => {
        //     await positiveTest(page, '1', '1', '1', 'Это равносторонний треугольник.Вы ввели:A: 1; B: 1; C: 1')
        // });
    
        // test('Ravnobedrenny', async ({ page }) => {
        //     await positiveTest(page, '3', '3', '2', 'Это равнобедренный треугольник.Вы ввели:A: 3; B: 3; C: 2')
        // });
    
        // test('new test', async ({page}) => {
    
        //     pageModel.fillAll([1,2,3])
        // });
    })
})