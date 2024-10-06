package com.example.MediaVault.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.MediaVault.service.MediaService;
import com.example.MediaVault.model.Media;
import org.springframework.http.HttpStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MediaController {

    private static final Logger logger = LoggerFactory.getLogger(MediaController.class);

    @Autowired
    private MediaService mediaService;

    @GetMapping("/media")
    public ResponseEntity<List<Media>> getAllMedia() {
      try {
        List<Media> mediaList = mediaService.getAllMedia();
        return ResponseEntity.ok(mediaList);
      } catch (Exception e) {
        logger.error("Error fetching media: ", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
      }
    }

    @PostMapping("/media")
    public ResponseEntity<Media> createMedia(@RequestBody Media media) {
      try {
        System.out.println("Received media: " + media.getName() + ", " + media.getImageUrl());
        Media createdMedia = mediaService.createMedia(media);
        return ResponseEntity.ok(createdMedia);
      } catch (Exception e) {
        logger.error("Error adding media: ", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
      }
  }

  @DeleteMapping("/media/{id}")
  public ResponseEntity<Void> deleteMedia(@PathVariable Long id) {
    try {
        boolean deleted = mediaService.deleteMedia(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        logger.error("Error deleting media with id {}: ", id, e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  @PutMapping("/media/{id}")
  public ResponseEntity<Media> updateMediaName(@PathVariable Long id, @RequestBody Media mediaUpdate) {
    try {
        Media updatedMedia = mediaService.updateMedia(id, mediaUpdate);
        if (updatedMedia != null) {
            return ResponseEntity.ok(updatedMedia);
        } else {
            return ResponseEntity.notFound().build();
        }
    } catch (Exception e) {
        logger.error("Error updating media name with id {}: ", id, e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}
}
