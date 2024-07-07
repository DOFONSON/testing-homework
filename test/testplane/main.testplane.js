import { ExampleStore } from '../../src/server/data';


const store = new ExampleStore();

describe("Проверки каталога", async function () {

    //Bug_id 1

    it("В каталоге у продуктов есть имя", async function ({ browser }) {
        await browser.url("http://localhost:3000/hw/store/catalog?bug_id=1");
        const productName = await browser.$(".ProductItem-Name");
        await productName.waitForExist();
        const nameText = await productName.getText();
        expect(nameText).not.toBe("");
    });


    // Bug_id 3

    // it('Проверка крректности отображения продукта на его странице после клика на него н странице каталога', async ({ browser }) => {
    //     await browser.url('http://localhost:3000/hw/store/catalog?bug_id=3');
    //     const productName = await browser.$('[data-testid="26"] .ProductItem-Name').getText(); 
    //     const link = await browser.$('[data-testid="26"] .card-link')
    //     await link.click();   
    //     await browser.url('http://localhost:3000/hw/store/catalog/26?bug_id=3');
    //     const name = await browser.$('.ProductDetails-Name').getText()
    //     console.log(productName, name);
    //     expect(productName).toEqual(name);
    // });
    
    
    

    // bug_id=9

    // it("Размер кнопки на странице товара не изменился", async function ({
    //     browser,
    //   }) {
    //     const mockProduct = `{"id":0,"name":"Prod","description":"[19:30:34 +0300] ✘ Проверки каталога Размер кнопки на странице товара не изменился [chrome:93fae090-ed5f-4d1f-8053-80c19fed03c9] - 9256ms","price":874,"color":"maroon","material":"Fresh"}`;
    //     const productMock = await browser.mock("http://localhost:3000/hw/store/api/products/0");
    //     await productMock.respond(mockProduct);
    
    //     await browser.url("http://localhost:3000/hw/store/catalog/0");
    //     await browser.assertView("catalogpage", ".Application", {
    //       ignoreElements: [
    //         ".ProductDetails-Name",
    //         ".ProductDetails-Description",
    //         ".ProductDetails-Color",
    //         ".ProductDetails-Price",
    //         ".ProductDetails-Material",
    //         ".navbar",
    //         ".CartBadge",
    //       ],
    //       compositeImage: true,
    //     });
    //   })






    // Bug_id 2, 5, 6, 7, 8, 10

    it("Добавилили товар в корзину, заполнили и отправили форму в корзине, появилась надпись об успехе", async function ({ browser }) {
        await browser.url("http://localhost:3000/hw/store/catalog/0?bug_id=2");
        const button = await browser.$(".ProductDetails-AddToCart");
        await button.waitForExist();
        await button.click();

        await browser.url("http://localhost:3000/hw/store/cart?bug_id=2");

        const nameInput = await browser.$(".Form-Field_type_name");
        await nameInput.waitForExist();
        await nameInput.setValue("noiqwbdoiqw");

        const phoneInput = await browser.$(".Form-Field_type_phone");
        await phoneInput.waitForExist();
        await phoneInput.setValue("78787877877878");

        const addressInput = await browser.$(".Form-Field_type_address");
        await addressInput.waitForExist();
        await addressInput.setValue("asdasd");

        const formButton = await browser.$(".Form-Submit");
        await formButton.waitForExist();
        await formButton.click();

        const success = await browser.$(".alert-success");
        await success.waitForExist({ timeout: 6000, timeoutMsg: "fail" });
        const isDisplayed = await success.isDisplayed();
        expect(isDisplayed).toBe(true);

        const cartNumber = await browser.$(".Cart-Number");
        await cartNumber.waitForExist();
        const cartNumberText = await cartNumber.getText();
        expect(cartNumberText).toBe("1");
    });

    
});