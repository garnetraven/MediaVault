package com.example.MediaVault.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.example.MediaVault.repository.MediaRepository;
import com.example.MediaVault.model.Media;

@Service
public class MediaService {
    @Autowired
    private MediaRepository mediaRepository;

    public List<Media> getAllMedia() {
      return mediaRepository.findAll();
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
            media.setImageUrl(mediaUpdate.getImageUrl());
            return mediaRepository.save(media);
        }
        return null;
    }
}
