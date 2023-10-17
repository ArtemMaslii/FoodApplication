package com.example.practice.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "UserJS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @JsonIgnore
    private int id;

    @Column(name = "name")
    @NotEmpty(message = "Name couldn't be empty")
    @Size(min = 2, max = 50, message = "Name should contain between 2 and 50 characters")
    private String name;

    @Column(name = "phone")
    @NotEmpty(message = "Phone number couldn't be empty")
    @Size(min = 12, max = 13, message = "Phone number should contain 13 characters")
    private String phone;

    public User() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
