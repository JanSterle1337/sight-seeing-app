package com.castles.Utility;

import org.springframework.stereotype.Component;

@Component
public class DegreeConverter {

    public double convertDegreesToFloatDegree(String value) {
        //45°49'48"

        value = value.substring(0, value.length()-1);

        if (value.charAt(2) == '°') {
            System.out.println("kroglica");
        }

        if ((int) value.charAt(4) == 39) {
            System.out.println("crtica");
        }

        String[] parts = value.split("[°′″]");

        /*int degrees = Integer.parseInt(value.substring(0, 2));
        int minutes = Integer.parseInt(value.substring(3, 5));*/
        //int seconds = Integer.parseInt(degree[2]);
        int degrees = Integer.parseInt(parts[0]);
        int minutes = Integer.parseInt(parts[1]);

        if (parts.length == 3) {
            double seconds = Double.parseDouble(parts[2]);
            System.out.printf("CONVERTED: %s - %s - %f \n", degrees, minutes, seconds);
            return degrees + ((minutes * 60)+seconds) / (60 * 60);
        } else {
            System.out.printf("CONVERTED: %s - %s  \n", degrees, minutes);
            return degrees + (minutes * 60) / (60 * 60);
        }


    }
}
