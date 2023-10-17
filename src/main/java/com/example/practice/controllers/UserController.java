package com.example.practice.controllers;

import com.example.practice.DTOs.UserDTO;
import com.example.practice.models.User;
import com.example.practice.services.UsersService;
import com.example.practice.util.errorResponse.UserErrorResponse;
import com.example.practice.util.exceptions.UserException;
import com.example.practice.util.validators.UsersValidator;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import static com.example.practice.util.ErrorsUtil.returnErrorToClient;


@Controller
@RequestMapping({"/food"})
public class UserController {

    private final UsersService usersService;

    private final UsersValidator usersValidator;

    private final ModelMapper mapper;

    @Autowired
    public UserController(UsersService usersService, UsersValidator usersValidator, ModelMapper mapper) {
        this.usersService = usersService;
        this.usersValidator = usersValidator;
        this.mapper = mapper;
    }


    @GetMapping
    public String index() {
        return "index";
    }

    @PostMapping("/registration")
    public ResponseEntity<HttpStatus> create(@RequestBody @Valid UserDTO userDTO,
                                             BindingResult bindingResult) {
        User user = convertToUser(userDTO);

        usersValidator.validate(user, bindingResult);

        if (bindingResult.hasErrors()) {
            returnErrorToClient(bindingResult);
        }

        usersService.register(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @ExceptionHandler
    private ResponseEntity<UserErrorResponse> handlerException(UserException userException) {
        UserErrorResponse userErrorResponse = new UserErrorResponse(
            userException.getMessage(),
            System.currentTimeMillis()
        );

        return new ResponseEntity<>(userErrorResponse, HttpStatus.BAD_REQUEST);
    }

    private User convertToUser(UserDTO userDTO) {
        return mapper.map(userDTO, User.class);
    }
}
