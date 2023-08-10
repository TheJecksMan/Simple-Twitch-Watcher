# Simple-Twitch-Watcher

I would like to present to you my very simple tool for collecting twitch drops automatically. But it's not written in my main programming language, so there might be some bugs.

## Features

- 🔒 Does not require your login and password, everything is safe
- 📱 Auto detect OS
- 😴 Auto Mute stream
- 🎥 Automatically lowest stream quality (160p)
- 😎 Custom configuration
- ⌚ Viewing time setting
- 👻 Easy to install

## How to install?

**Windows**
1. Download or clone the repository.
2. [Install](https://nodejs.org/en/) Node.js.
3. Install Chromuim, also works with Chrome (standard path is `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`).
4. Specify the path to Chrome or Chromuim.
5. Get an auth-token via a cookie.
6. Go to the folder with the repository and in the terminal write: `npm install`.
7. To run, write `node main.js` in the terminal.


**Linux**
1. Download or clone the repository.
2. [Install](https://nodejs.org/en/) Node.js.
3. [Install](https://losst.ru/ustanovka-chromium-ubuntu-16-04) Chromuim, also works with Chrome (default path is `/snap/bin/chromium`) 
4. Get the path `whereis chromium` to it.
5. Get an auth-token via a cookie.
6. Go to the folder with the repository and in the terminal write: `npm install`
7. To run, write in the terminal `node main.js`

## Config description

```json
{
    "browser_path": "/snap/bin/chromium",
    "browser_show": false,
    "timeout_load_page": 0, 

    "base_url": "https://www.twitch.tv/",
    "game_urn": "directory/game/Rust",
    "filter_streams": "?sort=VIEWER_COUNT&tl=c2542d6d-cd10-4532-919b-3d19f30a768b",


    "auth_token": "",
    "time_view_stream": 20
}
```

- `browser_path` - path to browser.

- `show_browser` - turns on browser display.

- `timeout_load_page` - setting timeout for page load, change to larger value if you are having problems with it.

- `base_url` - base path to twitch (no need to change!).

- `game_urn` - path to game category.

- `filter_streams` - sorted list by streamer popularity and drops enable (not recommended to change).

- `auth_token` - token from your cookie.

- `time_view_stream` - stream view time in minutes. Directly affects the frequency of checking rewards.

## Disclaimer

This code is for educational and research purposes only. Do not attempt to break the law with anything contained here.
I will not be held responsible for any illegal activities. Reproduction and copying is described in the license in this repository
