package com.example.MediaVault.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.MediaVault.repository.UserRepository;
import com.example.MediaVault.repository.MediaRepository;
import com.example.MediaVault.model.User;
import com.example.MediaVault.model.Media;

import java.util.Arrays;

@Service
public class SampleDataService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MediaRepository mediaRepository;

    @Transactional
    public void addSampleData() {

        User john = new User("john_doe", "password123");
        User jane = new User("jane_doe", "password123");
        userRepository.saveAll(Arrays.asList(john, jane));

        Media movie = new Media("Movie");
        Media tvShow = new Media("TV Show");
        mediaRepository.saveAll(Arrays.asList(movie, tvShow));
    }
}
