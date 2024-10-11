package com.example.MediaVault.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.MediaVault.model.Media;
import com.example.MediaVault.model.User;

import java.util.List;

public interface MediaRepository extends JpaRepository<Media, Long> {
  List<Media> findByUser(User user);
  Media findByName(String name);
}
