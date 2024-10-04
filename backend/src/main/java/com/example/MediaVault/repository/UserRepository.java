package com.example.MediaVault.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.MediaVault.model.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    
    User findByUsername(String username);
    
    boolean existsByUsername(String username);
    
    List<User> findByUsernameContaining(String username);
    
    List<User> findTop10ByOrderByCreatedAtDesc();
    
    @Query("SELECT u FROM User u WHERE u.username = :username AND u.password = :password")
    User findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);
    
    long countByUsernameContaining(String username);
}
