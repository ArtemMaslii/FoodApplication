package com.example.practice.util.validators;

import com.example.practice.models.User;
import com.example.practice.services.UsersService;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UsersValidator implements Validator {

    private final UsersService usersService;

    public UsersValidator(UsersService usersService) {
        this.usersService = usersService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;

        if (this.usersService.getByPhoneNumber(user.getPhone()).isPresent()) {
            errors.rejectValue("phone", "", "Such phone number has been used!");
        }
    }
}
