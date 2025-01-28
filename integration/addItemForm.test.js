describe("addItemForm", () => {
    it("base example, visually looks correct", async () => {
        await page.goto("http://localhost:6006/iframe.html?path=/story/additemform-component--add-item-form-base-example");
        expect(image).toMatchImageSnapshot();
    });
});