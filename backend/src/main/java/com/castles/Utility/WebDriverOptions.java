package com.castles.Utility;

import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
public class WebDriverOptions {

    private ChromeOptions chromeOptions;

    public WebDriverOptions() {
        chromeOptions = new ChromeOptions();
        this.setup();
    }

    public void setup() {
        this.chromeOptions.addArguments("Accept=text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding=gzip, deflate",
        "Accept-Language=en,sl;q=0.9,en-US;q=0.8",
        "Cache-Control=max-age=0",
        "Connection=keep-alive",
        "Cookie=ASPSESSIONIDACSQTQBT=BFCBCPIBKKIKJKFJJDLMBKHM",
        "Host=www.preseren.net",
        "Referer=https://www.google.com/",
        "Upgrade-Insecure-Requests=1",
        "User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36");
    }

    public ChromeOptions getChromeOptions() {
        return chromeOptions;
    }

}
