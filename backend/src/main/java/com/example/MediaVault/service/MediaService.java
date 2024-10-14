package com.example.MediaVault.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import com.example.MediaVault.repository.MediaRepository;
import com.example.MediaVault.repository.UserRepository;
import com.example.MediaVault.model.Media;
import com.example.MediaVault.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

@Service
public class MediaService {
    private static final Logger logger = LoggerFactory.getLogger(MediaService.class);

    @Autowired
    private MediaRepository mediaRepository;

    @Autowired
    private UserRepository userRepository;

    public Page<Media> getMediaByUsername(String username, Pageable pageable) {
      User user = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
      return mediaRepository.findByUser(user, pageable);
    }

    public Media createMedia(String username, Media media) {
        Optional<User> optionalUser = userRepository.findByUsername(username);
        if (optionalUser.isPresent()) {
          User user = optionalUser.get();
          media.setUser(user);
        return mediaRepository.save(media);
        }
        logger.warn("Unable to create media. User not found: {}", username);
        return null;
    }  

    public boolean deleteMedia(Long id, String username) {
        Optional<Media> mediaOptional = mediaRepository.findById(id);
        if (mediaOptional.isPresent()) {
            Media media = mediaOptional.get();
            if (media.getUser().getUsername().equals(username)) {
                mediaRepository.delete(media);
                return true;
            }
        }
        return false;
    }

    public Media updateMedia(Long id, String username, Media mediaUpdate) {
        Optional<Media> mediaOptional = mediaRepository.findById(id);
        if (mediaOptional.isPresent()) {
            Media media = mediaOptional.get();
            if (media.getUser().getUsername().equals(username)) {
                media.setName(mediaUpdate.getName());
                media.setMediaType(mediaUpdate.getMediaType());
                media.setImageUrl(mediaUpdate.getImageUrl());
                return mediaRepository.save(media);
            }
        }
        return null;
    }
}
