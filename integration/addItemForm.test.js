// const puppeteer = require("puppeteer");

// const { toMatchImageSnapshot } = require("jest-image-snapshot");

// expect.extend({ toMatchImageSnapshot });

// describe("addItemForm", () => {
//     let browser;
//     let page;

//     beforeAll(async () => {
//         browser = await puppeteer.launch({ headless: true, 
//             // executablePath: '/System/Volumes/Data/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' 
//     });
//         page = await browser.newPage();
//     });

//     afterAll(async () => {
//         await browser.close();
//     });

//     //jest.setTimeout(10000);

//     it("base example, visually looks correct", async () => {
//         await page.goto(
//             "http://localhost:6006/?path=/story/additemform-component--add-item-form-base-example"
//         );

//         await page.waitForTimeout(500);

//         const image = await page.screenshot();
//         expect(image).toMatchImageSnapshot({
//             customDiffConfig: { threshold: 0.1 },
//             failureThreshold: 0.01, 
//             failureThresholdType: 'percent'
//         });
//     });
// });

const puppeteer = require('puppeteer');

describe('Минимальный тест Puppeteer', () => {
    it('должен запустить браузер', async () => {
        const browser = await puppeteer.launch();
        expect(browser).toBeDefined();
        await browser.close();
    });
});
