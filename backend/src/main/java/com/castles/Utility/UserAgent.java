package com.castles.Utility;

import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.stereotype.Component;

@Component
public class UserAgent {
    public String getUserAgent() {

        WebDriver driver = new ChromeDriver();
        JavascriptExecutor jsExecutor = (JavascriptExecutor) driver;
        String userAgent = (String) jsExecutor.executeScript("return navigator.userAgent;");
        driver.quit();

        return userAgent;
    }
}
