package com.example.MediaVault.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.example.MediaVault.repository.MediaRepository;
import com.example.MediaVault.model.Media;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class MediaService {
    private static final Logger logger = LoggerFactory.getLogger(MediaService.class);

    @Autowired
    private MediaRepository mediaRepository;

    public List<Media> getAllMedia() {
      List<Media> mediaList = mediaRepository.findAll();
      for (Media media : mediaList) {
        logger.info("Media: id={}, name={}, mediaType={}, imageUrl={}", 
        media.getId(), media.getName(), media.getMediaType(), media.getImageUrl());
      }
      return mediaList;
    }

     public Media createMedia(Media media) {
        // Add validation and business logic here
        return mediaRepository.save(media);
    }  

    public boolean deleteMedia(Long id) {
        if (mediaRepository.existsById(id)) {
            mediaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Media updateMedia(Long id, Media mediaUpdate) {
        Optional<Media> mediaOptional = mediaRepository.findById(id);
        if (mediaOptional.isPresent()) {
            Media media = mediaOptional.get();
            media.setName(mediaUpdate.getName());
            media.setMediaType(mediaUpdate.getMediaType());
            media.setImageUrl(mediaUpdate.getImageUrl());
            return mediaRepository.save(media);
        }
        return null;
    }
}
