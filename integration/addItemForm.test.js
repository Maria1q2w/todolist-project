const puppeteer = require("puppeteer-core");

// const { toMatchImageSnapshot } = require("jest-image-snapshot");

// expect.extend({ toMatchImageSnapshot });

describe("addItemForm", () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: true, executablePath: '/System/Volumes/Data/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    jest.setTimeout(10000);

    it("base example, visually looks correct", async () => {
        await page.goto(
            "http://localhost:6006/?path=/story/additemform-component--add-item-form-base-example"
        );

        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot({
            failureThreshold: 0.01, // Допустимая погрешность (1% различий)
            failureThresholdType: 'percent' // Тип порога: в процентах
        });
        
    });
});

