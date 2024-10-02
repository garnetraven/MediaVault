package com.example.MediaVault.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.MediaVault.model.Media;

public interface MediaRepository extends JpaRepository<Media, Long> {
    Media findByName(String name);
}
