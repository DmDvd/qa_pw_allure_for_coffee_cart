import { test } from '../../../_fixtures/fixtures';
import { COFFEE_NAMES } from '../../../../src/constants';
import * as allure from 'allure-js-commons';

test('Cart updated correctly after clicking minus for drinks', async ({
  cartPage,
  menuPage,
}) => {
  await menuPage.open();

  await allure.epic(`'CoffeeCart' Customer site`);
  await allure.feature('Cart');
  await allure.story('After the quantity is reduced,' 
    + 'the cart should be updated correctly');

  await allure.parentSuite('UI Tests');
  await allure.suite('Cart functionality');
  await allure.subSuite('Decrease drink quantity in cart');
      
  await allure.severity('critical');

  await menuPage.clickCoffeeCup(COFFEE_NAMES.cappuccino);
  await menuPage.clickCoffeeCup(COFFEE_NAMES.espresso);

  await menuPage.clickCartLink();
  await cartPage.waitForLoading();

  await cartPage.assertCoffeeItemIsVisible(COFFEE_NAMES.espresso);

  await cartPage.clickCoffeeListItemRemoveOneButton(COFFEE_NAMES.espresso);

  await cartPage.assertCoffeeItemIsHidden(COFFEE_NAMES.espresso);
  await cartPage.assertCoffeeItemIsVisible(COFFEE_NAMES.cappuccino);

  await cartPage.clickCoffeeListItemRemoveOneButton(COFFEE_NAMES.cappuccino);

  await cartPage.assertCoffeeItemIsHidden(COFFEE_NAMES.cappuccino);
  await cartPage.assertNoCoffeeMessageIsVisible();
});
