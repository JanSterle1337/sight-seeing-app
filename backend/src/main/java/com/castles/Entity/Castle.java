package com.castles.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

@Entity
@Table(name="castle")
public class Castle {
    @Id
    @SequenceGenerator(
        name="castle_sequence",
        sequenceName = "castle_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "castle_sequence"
    )
    private long id;
    private String name;
    private String town;
    private String municipality;
    private String website_link;
    private Double latitude;
    private Double longitude;
    
    public Castle() {
    }

    public Castle(long id,String name, String town, String municipality, String link) {
        this.name = name;
        this.town = town;
        this.municipality = municipality;
        this.website_link = link;
    }

    public Castle(long id, String name, String town, String municipality, Double latitude, Double longitude, String link) {
        this.name = name;
        this.town = town;
        this.municipality = municipality;
        this.latitude = latitude;
        this.longitude = longitude;
        this.website_link = link;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTown() {
        return town;
    }

    public void setTown(String town) {
        this.town = town;
    }

    public String getMunicipality() {
        return municipality;
    }

    public void setMunicipality(String municipality) {
        this.municipality = municipality;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getWebsite_link() {
        return website_link;
    }

    public void setWebsite_link(String website_link) {
        this.website_link = website_link;
    }


    
    
}
