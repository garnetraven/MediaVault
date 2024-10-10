package com.example.MediaVault.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.MediaVault.service.UserService;
import com.example.MediaVault.model.User;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/profile/{username}")
    public ResponseEntity<User> getCurrentUser(@PathVariable String username) {
        User user = userService.getCurrentUser(username);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile/{username}")
    public ResponseEntity<User> updateUserProfile(@PathVariable String username, @RequestBody User updatedUser) {
        User user = userService.updateUserProfile(username, updatedUser);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/change-password/{username}")
    public ResponseEntity<?> changePassword(@PathVariable String username, @RequestBody PasswordChangeRequest request) {
        userService.updatePassword(username, request.getCurrentPassword(), request.getNewPassword());
        return ResponseEntity.ok().build();
    }
}

class PasswordChangeRequest {
    private String currentPassword;
    private String newPassword;
    
    public String getCurrentPassword() {
        return currentPassword;
    }

    public void setCurrentPassword(String currentPassword) {
        this.currentPassword = currentPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
