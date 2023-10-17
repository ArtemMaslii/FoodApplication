package com.example.practice.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "menucard")
public class MenuCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonIgnore
    private int id;

    @NotEmpty(message = "Image shouldn't be empty")
    @Size(min = 2, max = 1000, message = "Alternative image should be between 2 and 1000 characters")
    @Column(name = "img")
    private String img;

    @NotEmpty(message = "Alternative image shouldn't be empty")
    @Size(min = 1, max = 100, message = "Alternative image should be between 1 and 100 characters")
    @Column(name = "alt_img")
    private String altImg;

    @NotEmpty(message = "Title shouldn't be empty")
    @Size(min = 6, max = 100, message = "Title should be between 6 and 100 characters")
    @Column(name = "title")
    private String title;

    @NotEmpty(message = "Description shouldn't be empty")
    @Size(min = 10, max = 1000, message = "Description should be between 6 and 100 characters")
    @Column(name = "description")
    private String description;

    @NotNull
    @Min(0)
    @Column(name = "price")
    private double price;

    public MenuCard() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getAltImg() {
        return altImg;
    }

    public void setAltImg(String altImg) {
        this.altImg = altImg;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
