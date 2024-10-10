package com.example.MediaVault.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.MediaVault.repository.UserRepository;
import com.example.MediaVault.model.User;
import java.util.NoSuchElementException;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getCurrentUser(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
    }

    public User updateUserProfile(String username, User updatedUser) {
        User user = getCurrentUser(username);
        user.setUsername(updatedUser.getUsername());
        return userRepository.save(user);
    }

    public void updatePassword(String username, String currentPassword, String newPassword) {
        User user = getCurrentUser(username);
        if (currentPassword.equals(user.getPassword())) {
            user.setPassword(newPassword);
            userRepository.save(user);
        } else {
            throw new IllegalArgumentException("Current password is incorrect");
        }
    }
}
