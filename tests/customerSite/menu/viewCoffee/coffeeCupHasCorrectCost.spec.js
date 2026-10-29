import { test } from '../../../_fixtures/fixtures';
import { priceFormatStr } from '../../../../src/common/helpers/priceFormatters';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../../../src/constants';
import * as allure from 'allure-js-commons';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffee, price }) => {
  test(`The ${coffee} cup has correct cost`, async ({ menuPage }) => {
    await allure.epic(`'CoffeeCart' Customer site`);
    await allure.feature('Menu');
    await allure.story('Coffee should have the right price');

    await allure.parentSuite('UI Tests');
    await allure.suite('Menu & Cart');
    await allure.subSuite('Correct cost of coffee');
               
    await allure.severity('critical'); 

    const priceStr = priceFormatStr(price);

    await menuPage.open();

    await menuPage.assertCoffeeCupCostHasValue(coffee, priceStr);
  });
});
