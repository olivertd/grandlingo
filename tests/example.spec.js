// @ts-check
const { test, expect } = require('@playwright/test');

test('Right answer', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  let input = await page.locator('.card-body input');

  await input.fill('como');
  await page.keyboard.press('Enter');

  let percentageText = await page.locator('.green-text').textContent();

  await expect(percentageText).toEqual('100.0 %');
});

test('Right answer on second try', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  let input = await page.locator('.card-body input');

  await input.fill('hur');
  await page.keyboard.press('Enter');
  
  await input.fill('como');
  await page.keyboard.press('Enter');

  let percentageText = await page.locator('.yellow-text').textContent();

  await expect(percentageText).toEqual('100.0 %');
});

test('One first time guess and one second time guess', async ({ page }) => {
  await page.goto('http://localhost:8080/');

  let input = await page.locator('.card-body input');

  await input.fill('hur');
  await page.keyboard.press('Enter');
  
  await input.fill('como');
  await page.keyboard.press('Enter');

  await input.fill('i');
  await page.keyboard.press('Enter');

  let percentageTextGreen = await page.locator('.green-text').textContent();
  await expect(percentageTextGreen).toEqual('50.0 %');

  let percentageTextYellow = await page.locator('.yellow-text').textContent();
  await expect(percentageTextYellow).toEqual('50.0 %');
});

test('Wrong or no answer notification', async ({ page }) => {
  await page.goto('http://localhost:8080/');


  await page.click('.quiz-card button');

  const notification = await page.$('.notification');

  expect(notification).not.toBeNull();
});
