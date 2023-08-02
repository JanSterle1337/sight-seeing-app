package com.castles.Controller;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.castles.Entity.Castle;
import com.castles.Repository.CastleRepository;
import com.castles.Service.CastleService;
import com.castles.Utility.UserAgent;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class CastlesController {

    @Autowired
    private UserAgent userAgent;
    private CastleRepository castleRepository;
    private CastleService castleService;

    public CastlesController(UserAgent userAgent, CastleService castleService ,CastleRepository repository) {
        this.userAgent = userAgent;
        this.castleRepository = repository;
        this.castleService = castleService;
    }

    @GetMapping("/")
    public String helloWorld() {
        return "hello world noobs";
    }

    @GetMapping("/scrape")
    public String scrapeData() {
    
        List<Castle> castles = castleService.scrapeCastles();
        
        for (int i = 0; i < castles.size(); i++) {
            Castle castle = castles.get(i);
            System.out.printf("%s %s %s %s \n", castle.getName(), castle.getTown(), castle.getMunicipality(), castle.getWebsite_link());
        }

        castleService.addNewCastles(castles);

        return "scraped and saved";
    }

    @GetMapping("/castles")
    public List<Castle> getCastles() {
        return castleService.getAllCastles();
    } 

    @GetMapping("/castles/{castleId}")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Castle> getSpecificCastle(@PathVariable Long castleId) {
        Castle castle = castleService.getCastleById(castleId);

        if (castle != null) {
            return ResponseEntity.ok(castle);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

}
