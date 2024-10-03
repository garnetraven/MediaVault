package com.example.MediaVault.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import com.example.MediaVault.repository.MediaRepository;
import com.example.MediaVault.model.Media;

@Service
public class MediaService {
    @Autowired
    private MediaRepository mediaRepository;

    public Media createMedia(Media media) {
        return mediaRepository.save(media);
    }

    public List<Media> getAllMedia() {
      return mediaRepository.findAll();
    }
}
