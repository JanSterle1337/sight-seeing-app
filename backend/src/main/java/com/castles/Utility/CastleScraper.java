package com.castles.Utility;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.castles.Entity.Castle;

public class CastleScraper {
    
    private String castleName = "";
    private String city = "";
    private String municipality = "";
    private String website_link = "";
    private String scraped_website = "https://sl.wikipedia.org/wiki/Seznam_gradov_v_Sloveniji";

    public List<Castle> scrapeWebsite(WebDriver driver, WebDriver coordinateWebDriver, DegreeConverter degreeConverter) {
        ArrayList<Castle> castles = new ArrayList<>();
        ArrayList<String> coordinates = new ArrayList<>();

        driver.get("https://sl.wikipedia.org/wiki/Seznam_gradov_v_Sloveniji");

        WebElement tableElement = driver.findElement(By.className("wikitable"));
        List<WebElement> rows = tableElement.findElements(By.tagName("tr"));

        for (int i = 2; i < rows.size(); i++) {
            WebElement row = rows.get(i);
            List<WebElement> columns = row.findElements(By.tagName("td"));

            int j = 0;

            castleName = "";
            city = "";
            municipality = "";
            website_link = "";

            for (WebElement column: columns) {
                if (column.getText().length() == 0) {
                    System.out.println("Je prazna");
                } else {
                    
                    if (j == 2) {
                        castleName = column.getText();
                        WebElement linkElement = column.findElement(By.tagName("a"));
                        String linkedWebsiteUrl = linkElement.getAttribute("href");
                        System.out.println("LINK: "+ linkedWebsiteUrl);

                        if (linkedWebsiteUrl.contains("action=edit&redlink=1")) {
                         System.out.println("Ni ok link");
                         break;
                        }

                        coordinates = scrapeCoordinates(linkedWebsiteUrl, coordinateWebDriver);
                        //driver.switchTo().window(currentWindowHandle);
                        website_link = linkedWebsiteUrl;
                    }

                    if (j == 3) {
                        city = column.getText();
                    }

                    if (j == 4) {
                        municipality = column.getText();
                    }
                   
                }
                 j++;
            }

            if (castleName.length() > 0 && city.length() > 0 && municipality.length() > 0) {

                if (!castleName.contains("grad")) {
                    castleName = "Grad " + castleName;
                }
                if (!(coordinates.get(0) == null || coordinates.get(1) == null)) {

                    System.out.println("Baje da so trenutne kordinate"+ coordinates.get(0));
                    double latitude = degreeConverter.convertDegreesToFloatDegree(coordinates.get(0));
                    double longitude = degreeConverter.convertDegreesToFloatDegree(coordinates.get(1));
                    Castle castle = new Castle(castleName, city, municipality, latitude, longitude,website_link);
                    castles.add(castle);
                }

            }
            System.out.println("Name: "+ castleName + " city: " + city + " municipality: "+ municipality);
            //Castle castle = new Castle(castleName, city, municipality, 46.0124, 16.0241);
            //castleRepository.save(castle);

        }

        return castles;

    }

    public ArrayList<String> scrapeCoordinates(String url, WebDriver driver) {

        ArrayList<String> coordinates = new ArrayList<>(Arrays.asList(null,null));

        System.out.println("Scrape specific castle's website for coordinates");
        driver.get(url);
        System.out.println("DRUGA");
   
        try {

        WebElement htmlLatitude = driver.findElement(By.className("latitude"));
        WebElement htmlLongitude = driver.findElement(By.className("longitude"));
        String latitude = htmlLatitude.getText();
        String longitude = htmlLongitude.getText();

        if (latitude.length() > 0 && longitude.length() > 0) {
            coordinates.set(0, latitude);
            coordinates.set(1, longitude);
        }

        System.out.printf("Kordinate: %s %s", coordinates.get(0), coordinates.get(1));

         } catch (Exception e) {
            System.out.println("NAPAKA NE NAJDEMO TEH HTML TAGGU");
            //e.printStackTrace();
         }

         return coordinates;
        
    }

}
