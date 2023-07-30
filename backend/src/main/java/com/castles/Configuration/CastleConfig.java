package com.castles.Configuration;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.castles.Entity.Castle;
import com.castles.Repository.CastleRepository;

@Configuration
public class CastleConfig {
    @Bean
    CommandLineRunner commandLineRunner(CastleRepository repository) {
        return args -> {
            //Castle sneznik = new Castle("Sneznik Castle", "Kozarisce", "Loska dolina", 45.0423, 14.0423);
            //Castle ljubljanski = new Castle("Ljubljana Castle", "Ljubljana", "Ljubljana", 46.0423, 15.0423);

            //repository.saveAll(List.of(sneznik, ljubljanski));
        };
    }
}
