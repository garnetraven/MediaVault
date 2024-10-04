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
        // Log the error
        logger.error("Error fetching media: ", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
      }
    }

    @PostMapping("/media")
    public ResponseEntity<Media> createMedia(@RequestBody Media media) {
      Media createdMedia = mediaService.createMedia(media);
      return ResponseEntity.ok(createdMedia);
  }
}
