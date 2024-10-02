package com.example.MediaVault.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.MediaVault.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
