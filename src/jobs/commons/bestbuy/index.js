module.exports.getBestBuyPrice = async (page) => {
  const prices = (await page.$x("//*[starts-with(@id, 'widget-')]/div/div/div[3]"))[0]
  const textPrice = (await page.evaluate(el => {
    return el.textContent;
  }, prices));
  const response = parseFloat(textPrice.replace('$', '').replace(',', ''))
  return response ? response : 0
}
module.exports.getBestBuyName = async (page) => {
  const articlePath = (await page.$x('//*[@id="sku-title"]/h1'))[0];
  const nameByPath = await page.evaluate(el => {
    return el.textContent;
  }, articlePath);
  return nameByPath.trim();
}