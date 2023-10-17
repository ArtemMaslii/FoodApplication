package com.example.practice.services;

import com.example.practice.models.User;
import com.example.practice.repositories.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
public class UsersService {

    private final UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Transactional
    public void register(User user) {
        usersRepository.save(user);
    }

    public Optional<User> getByPhoneNumber(String phoneNumber) {
        return usersRepository.findByPhone(phoneNumber);
    }
}
