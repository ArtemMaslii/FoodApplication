package com.example.practice.DTOs;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class UserDTO {

    @NotEmpty(message = "Name couldn't be empty")
    @Size(min = 2, max = 50, message = "Name should contain between 2 and 50 characters")
    private String name;

    @NotEmpty(message = "Phone number couldn't be empty")
    @Size(min=12, max = 13, message = "Phone number should contain 13 characters")
    private String phone;

    public UserDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}
