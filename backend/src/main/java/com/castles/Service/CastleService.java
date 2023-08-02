package com.castles.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.devtools.v112.cast.Cast;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.castles.Entity.Castle;
import com.castles.Repository.CastleRepository;
import com.castles.Utility.CastleScraper;
import com.castles.Utility.DegreeConverter;
import com.castles.Utility.WebDriverOptions;

@Service
public class CastleService {

    @Autowired
    private final CastleRepository castleRepository;
    private WebDriverOptions webDriverOptions;
    private DegreeConverter degreeConverter;
    private ArrayList<Castle> castles;

    public CastleService(CastleRepository castleRepository, WebDriverOptions webDriverOptions, DegreeConverter degreeConverter) {
        this.castleRepository = castleRepository;
        this.webDriverOptions = webDriverOptions;
        this.degreeConverter =  degreeConverter;
    }

    public List<Castle> scrapeCastles() {
        List<Castle> castles = new ArrayList<>();

        System.setProperty("webdriver.chrome.driver", "C:\\Program Files\\ChromeDriver\\chromedriver.exe");
        System.setProperty("webdriver.http.factory", "jdk-http-client");

        WebDriver webDriver = new ChromeDriver(webDriverOptions.getChromeOptions());
        WebDriver coordinatesWebDriver = new ChromeDriver(webDriverOptions.getChromeOptions());
        CastleScraper scraper = new CastleScraper();

        castles = scraper.scrapeWebsite(webDriver,coordinatesWebDriver, degreeConverter);

        //webDriver.quit();
        return castles;
    }

    public void addNewCastles(List<Castle> castles) {
        castleRepository.saveAll(castles);
    } 

    public List<Castle> getAllCastles() {
        return castleRepository.findAll();
    }

    public Castle getCastleById(Long castleId) {
        Optional<Castle> optionalCastle = castleRepository.findById(castleId);
        return optionalCastle.orElse(null);
    }

}
