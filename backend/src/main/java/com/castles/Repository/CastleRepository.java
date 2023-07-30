package com.castles.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.castles.Entity.Castle;

@Repository
public interface CastleRepository extends JpaRepository<Castle, Long> {
    
}
