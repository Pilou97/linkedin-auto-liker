const puppeteer = require('puppeteer');

// The username of the linkeding account
const USERNAME = process.env.LINKEDIN_USERNAME;
if(!USERNAME) {
  console.error("Missing username")
  process.exit(1);
}

// The password of the linkedin account
const PASSWORD = process.env.LINKEDIN_PASSWORD;
if(!PASSWORD){
  console.error("Missing PASSWORDs")
  process.exit(1);
}

// The url of the posts to like
const ALL_POST_URL = process.env.ALL_POST_URL;
if(!ALL_POST_URL){
  console.error("Missing ALL_POST_URL")
  process.exit(1);
}

// The company name to like
const COMPANY_NAME = process.env.COMPANY_NAME;
if(!COMPANY_NAME){
  console.error("Missing COMPANY_NAME")
  process.exit(1);
}

// The interval of time where the function will be executed (like one time each TIME_INTERVAL)
const TIME_INTERVAL = Number.parseInt(process.env.TIME_INTERVAL) || 900;

/**
 * Login into linkedin
 * Goes in the posts page
 * Like the first posts of the page
 * Close the windows
 */
const autoLiker = async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({
      width: 1080,
      height: 720,
    });

    await page.goto('https://www.linkedin.com/checkpoint/rm/sign-in-another-account?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin')
    await page.waitForNetworkIdle();
    
    try {
      await page.$eval('input[id=username]', (element, username) => element.value=username, USERNAME);
    } catch(error) {
      await page.$eval('input[id=email-or-phone]', (element, username) => element.value=username, USERNAME);
    }


    await page.$eval('input[id=password]', (element, password) => element.value=password, PASSWORD);
    await page.click('button[type="submit"]');
    await page.waitForNetworkIdle();

    await page.goto(ALL_POST_URL, {waitUntil: "networkidle2"})
    try {
      await page.click(`button[aria-label="Aimer le post de ${COMPANY_NAME}"]`);
      console.log("New post liked")
    } catch(err) {
      console.log("No new post")
    }

    await browser.close();
  }

// Auto like every 15 minutes
console.log("Auto liker started");
// Execute the function a first time
autoLiker();
// Execute the function in the given interval
// TODO: improve, do not use interval but a "chain" of setTimeout
setInterval(autoLiker, TIME_INTERVAL * 1000);