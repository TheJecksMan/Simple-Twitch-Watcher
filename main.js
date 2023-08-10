const os = require("os");
const puppeteer = require("puppeteer-core");
const tool = require("./modules/tool.js");

const config = require("./config.json");

const chanel_link = '//a[@tabindex="-1" and contains(@class, "tw-link")]';
const live_time = '//span[@class="live-time"]';
const nsfw_button = '//button[@data-a-target="content-classification-gate-overlay-start-watching-button"]';

main();

async function main() {
    console.clear();
    console.log(
        "▀█▀ █░█░█ █ ▀█▀ █▀▀ █░█   █░█░█ ▄▀█ ▀█▀ █▀▀ █░█ █▀▀ █▀█\n" +
        "░█░ ▀▄▀▄▀ █ ░█░ █▄▄ █▀█   ▀▄▀▄▀ █▀█ ░█░ █▄▄ █▀█ ██▄ █▀▄ v.1.3.0\n"
    );

    let { browser, page } = await create_browser();
    let browser_version = await browser.version();
    console.log(`Current version browser: ${browser_version}`);
    while (true) {
        try {
            await views_stream(page);
        }
        catch (e) {
            if (e instanceof puppeteer.TimeoutError) {
                // repeat views
                await views_stream(page);
            } else {
                await browser.close();
            }
        }
    }
}

async function create_browser() {
    // Browser shell launch options
    let browserConfig = {
        headless: !config.browser_show,
        executablePath: config.browser_path,
        args: [
            "--disable-accelerated-2d-canvas",
            "--disable-gpu",
            "--no-first-run",
            "--disable-extensions",
        ],
    };

    // Obtaining information about the operating system for personal configuration
    const osPlatform = os.platform();
    console.log(`🎃 OS detect: ${osPlatform}`);

    let browser = null;
    if (osPlatform == "win32") {
        browser = await puppeteer.launch(browserConfig);
    } else {
        browserConfig.args.push("--no-sandbox");
        browserConfig.args.push("--disable-dev-shm-usage");
        browser = await puppeteer.launch(browserConfig);
    }
    console.log("📱 Launching browser..");

    const page = await browser.newPage();
    await page.goto(config.base_url, {
        waitUntil: "networkidle0",
    });

    await page.setViewport({ width: 1280, height: 720 })
    await page.evaluate(() => {
        localStorage.setItem('video-muted', '{"default":true}')
        localStorage.setItem('video-quality', '{"default":"160p30"}')
    })

    // Setting up cookies for logging into an account using a token
    console.log("🔧 Setting auth token..");
    cookie = await set_cookies();
    await page.setCookie(...cookie);
    await page.reload();

    await tool.check_login(page);

    console.log("✅ Successful setting!");
    console.log("---------");

    return {
        browser,
        page,
    };
}

async function views_stream(page) {
    await page.goto(config.base_url + config.game_urn + config.filter_streams, {
        waitUntil: "networkidle2",
        timeout: config.timeout_load_page * 1000,
    });

    // Getting a List of Streamers
    let list_streamers = await get_streamers(page);

    let rand = Math.floor(Math.random() * list_streamers.length);
    let rand_stream = list_streamers[rand];

    console.log(`🎥 Find stream: https://www.twitch.tv/${rand_stream}`);
    await page.goto(`https://www.twitch.tv/${rand_stream}`, {
        waitUntil: ["networkidle2", "domcontentloaded"],
        timeout: config.timeout_load_page * 1000,
    });

    console.log("📄 Stream setting..");
    // Stream preset
    await tool.click_element(0, nsfw_button, page);

    let time_stream = await tool.read_element(live_time, page, "text");

    console.log(`⌚ Stream time: ${time_stream}`);
    console.log(`💤 Views ${config.time_view_stream} minute(s)`);

    await page.waitForTimeout(config.time_view_stream * 60000);
    // Drops check
    console.log("[Reload..]");
    console.log("👻 Check claim twitch drops..");
}

async function get_streamers(page) {
    console.log("🔎 Getting a list of active streamers..");

    await page.waitForXPath(chanel_link);
    let streamers = await page.$x(chanel_link);
    let list_streamers = [];

    for (let streamer of streamers) {
        let attr = await page.evaluate((el) => el.getAttribute("href"), streamer);
        list_streamers.push(attr.split("/")[1]);
    }

    return list_streamers;
}

async function set_cookies() {
    const cookie = [
        {
            domain: ".twitch.tv",
            value: config.auth_token,
            name: "auth-token",
            path: "/",
            secure: true,
            session: false,
            hostOnly: false,
            httpOnly: false,
        },
    ];
    return cookie;
}
