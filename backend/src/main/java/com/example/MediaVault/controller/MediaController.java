package com.example.MediaVault.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.example.MediaVault.service.MediaService;
import com.example.MediaVault.service.SampleDataService;
import com.example.MediaVault.model.Media;
import java.util.List;

@RestController
@RequestMapping("/api")

public class MediaController {

    @Autowired
    private MediaService mediaService;

    @Autowired
    private SampleDataService sampleDataService; // Add to different controller?    

    @GetMapping("/media")
    public List<Media> getAllMediaTypes() {
        return mediaService.getAllMedia();
    }

    @PostMapping("/media")
    public Media createMedia(@RequestBody Media media) {
        return mediaService.createMedia(media);
    }

    @PostMapping("/sample-data")
    public ResponseEntity<String> addSampleData() {
      sampleDataService.addSampleData();
      return ResponseEntity.ok("Sample data added successfully");
    }
}
