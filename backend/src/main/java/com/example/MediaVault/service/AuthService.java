package com.example.MediaVault.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import com.example.MediaVault.repository.UserRepository;
import com.example.MediaVault.model.User;


@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;

    public boolean authenticate(String username, String password) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.isPresent() && user.get().getPassword().equals(password);
    }

    public User register(String username, String password) {
      if (userRepository.existsByUsername(username)) {
        throw new RuntimeException("Username already exists");
      }

      User newUser = new User(username, password);
      return userRepository.save(newUser);
    }
}
