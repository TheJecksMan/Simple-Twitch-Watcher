async function check_login(page) {
  const cookies = await page.cookies();
  for (let cookie of cookies) {
    if (cookie.name == "twilight-user") {
      console.log("✅ Logged in!");
      return;
    }
  }
  console.log("❌ Login failed!");
  console.log("⚡ Check the token..");
  process.exit();
}

async function click_element(index, xpath, page) {
  try {
    await page.waitForXPath(xpath);
    var element = await page.$x(xpath);
  } catch (error) {
    return;
  }
  if (index == 0) {
    await element[0].click();
  } else if (index == -1) {
    await element[element.length - 1].click();
  }
}

async function read_element(xpath, page, type) {
  await page.waitForXPath(xpath);
  var el_time = await page.$x(xpath);
  var value = null;
  if (type == "text") {
    value = await page.evaluate((el) => el.textContent, el_time[0]);
  } else if (type == "style") {
    value = await page.evaluate((el) => el.getAttribute("style"), el_time[0]);
  }

  return value;
}

module.exports = { click_element, read_element, check_login };
