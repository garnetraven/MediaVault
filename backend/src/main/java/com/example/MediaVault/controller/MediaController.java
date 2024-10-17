package com.example.MediaVault.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.MediaVault.service.MediaService;
import com.example.MediaVault.model.Media;
import org.springframework.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/media")
public class MediaController {

    private static final Logger logger = LoggerFactory.getLogger(MediaController.class);

    @Autowired
    private MediaService mediaService;

    @GetMapping("/user/{username}")
    public ResponseEntity<Page<Media>> getUserMedia (
        @PathVariable String username,
        @RequestParam(required = false) String mediaType,
        @PageableDefault(size = 8) Pageable pageable
    ) {
      try {
        Page<Media> mediaPage = mediaService.getMediaByUsername(username, mediaType, pageable);
        logger.info("Returning page {} of {} for user", mediaPage.getNumber(), mediaPage.getTotalPages(), username);
        return ResponseEntity.ok(mediaPage);
      } catch (Exception e) {
        logger.error("Error fetching media for user {}: ", username, e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
      }
    }

    @PostMapping("/user/{username}")
    public ResponseEntity<Media> createMedia(@PathVariable String username, @RequestBody Media media) {
      try {
        logger.info("Received media for user {}: {}", username, media.getName());
        Media createdMedia = mediaService.createMedia(username, media);
        return ResponseEntity.ok(createdMedia);
      } catch (Exception e) {
        logger.error("Error adding media for user {}: ", username, e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
      }
    }

  @DeleteMapping("/{id}/user/{username}")
  public ResponseEntity<Void> deleteMedia(@PathVariable Long id, @PathVariable String username) {
    try {
        boolean deleted = mediaService.deleteMedia(id, username);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        logger.error("Error deleting media with id {} for user {}: ", id, username, e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @PutMapping("/{id}/user/{username}")
  public ResponseEntity<Media> updateMediaName(@PathVariable Long id, @PathVariable String username, @RequestBody Media mediaUpdate) {
    try {
        Media updatedMedia = mediaService.updateMedia(id, username, mediaUpdate);
        if (updatedMedia != null) {
            return ResponseEntity.ok(updatedMedia);
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        logger.error("Error updating media name with id {} for user {}: ", id, username, e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
  }
}
