package com.castles.Service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;

import org.openqa.selenium.devtools.v112.cast.Cast;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassRelativeResourceLoader;
import org.springframework.stereotype.Service;

import com.castles.Entity.Castle;
import com.castles.Repository.CastleRepository;

@Service
public class CastleExcelService {

    private final CastleRepository repository;

    @Autowired
    public CastleExcelService(CastleRepository castleRepository) {
        this.repository = castleRepository;
    }

    public void importCsv() {

        ArrayList<Castle> castles = new ArrayList<>();

        try {
            Scanner sc = new Scanner(new File("C:\\Users\\janst\\FRI\\MSI\\sight-seeing-app\\backend\\src\\main\\java\\com\\castles\\Data\\castles.csv"));
            
            String neki = sc.nextLine();

            long id = 1;
            while (sc.hasNextLine()) {

                String line = sc.nextLine();

                String[] splittedLine = line.split(",");

                
                
                Castle castle = new Castle(id,splittedLine[4], splittedLine[5], splittedLine[3], Double.parseDouble(splittedLine[1]), Double.parseDouble(splittedLine[2]), splittedLine[6]);
                this.repository.save(castle);
                System.out.println(splittedLine[0] + " " + splittedLine[1] + " " + splittedLine[2] + " "+ splittedLine[3] + " " + splittedLine[4] + " "+ splittedLine[5] + " "+ splittedLine[6]);
                id++;
                }
                /*String latitude = sc.next();
                String longitude = sc.next();
                String municipality = sc.next();
                String name = sc.next();
                String town = sc.next();
                String website_link = sc.next(); */

                //System.out.println(id + " " + latitude + " " + longitude + " "+ municipality + " " + name + " "+ town + " "+ website_link);
        
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
