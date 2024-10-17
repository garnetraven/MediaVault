package com.example.MediaVault.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import com.example.MediaVault.model.Media;
import com.example.MediaVault.model.User;

public interface MediaRepository extends JpaRepository<Media, Long> {
  Page<Media> findByUser(User user, Pageable pageable);
  Page<Media> findByUserAndMediaType(User user, String mediaType, Pageable pageable);
}
