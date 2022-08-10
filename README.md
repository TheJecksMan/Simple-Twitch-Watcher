# Twitch-Watcher

## Features

- 💎 Automatic collection of twitch drops!
- 🔒 Does not require your login and password, everything is safe
- 📱 Auto detect OS
- 😴 Mute stream
- 🎥 Automatically lowest stream quality (160p)
- 😎 Custom configuration
- ⌚ Viewing time setting
- 👻 Easy to install


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

- `timeout_load_page` - 

- `base_url` - base path to twitch (no need to change!).

- `game_urn` - path to game category.

- `filter_streams` - sorted list by streamer popularity and drops enable (not recommended to change).

- `auth_token` - token from your cookie.

- `time_view_stream` - stream view time. Directly affects the frequency of checking rewards.
## Disclaimer

This code is for educational and research purposes only. Do not attempt to violate the law with anything contained here.
I will not be responsible for any illegal actions. Reproduction and copy is authorised, provided the source is acknowledged.
