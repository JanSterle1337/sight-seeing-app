package com.castles;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableAutoConfiguration
@SpringBootApplication
public class CastleApplication {

	public static void main(String[] args) {
		SpringApplication.run(CastleApplication.class, args);
	}

}
