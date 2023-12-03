package com.castles.Controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.castles.Entity.Castle;
import com.castles.Repository.CastleRepository;
import com.castles.Service.CastleExcelService;
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
    private CastleExcelService castleExcelService;

    public CastlesController(UserAgent userAgent, CastleService castleService ,CastleRepository repository, CastleExcelService castleExcelService) {
        this.userAgent = userAgent;
        this.castleRepository = repository;
        this.castleService = castleService;
        this.castleExcelService = castleExcelService;
    }

    @GetMapping("/")
    public String helloWorld() {
        return "hello world noobs";
    }

    @GetMapping("/scrape")
    public String scrapeData() {
    
        castleExcelService.importCsv();

        return "Baje da scrapamo";
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

    @DeleteMapping("/castles")
    @CrossOrigin(origins = "*")
    public ResponseEntity<Void> deleteCastles() {
         if (castleService.dropAll()) {
             return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); 
    }

}
