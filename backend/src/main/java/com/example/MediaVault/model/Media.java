package com.example.MediaVault.model;

import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.*;

@Entity
@Getter
@Setter
@Table(name = "media")
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    public Media() {}

    public Media(String name) {
      this.name = name;
    }

    public Media(String name, String imageUrl) {
      this.name = name;
      this.imageUrl = imageUrl;
    }
}
