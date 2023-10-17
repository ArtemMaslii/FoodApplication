package com.example.practice.DTOs;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class MenuCardDTO {

    @NotEmpty(message = "Image shouldn't be empty")
    @Size(min = 2, max = 1000, message = "Alternative image should be between 2 and 1000 characters")
    private String img;

    @NotEmpty(message = "Alternative image shouldn't be empty")
    @Size(min = 1, max = 100, message = "Alternative image should be between 1 and 100 characters")
    private String altImg;

    @NotEmpty(message = "Title shouldn't be empty")
    @Size(min = 6, max = 100, message = "Title should be between 6 and 100 characters")
    private String title;

    @NotEmpty(message = "Description shouldn't be empty")
    @Size(min = 10, max = 1000, message = "Description should be between 6 and 100 characters")
    private String description;

    @NotNull
    @Min(0)
    private double price;

    public MenuCardDTO() {
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
