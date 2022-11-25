package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.validator.UserValidator;

import javax.validation.Valid;

@Controller
@RequestMapping
public class UserController {
    private final UserService userService;
    private final UserValidator userValidator;
    private final PasswordEncoder encoder;
    @Autowired
    public UserController(UserService userService, UserValidator userValidator, PasswordEncoder encoder) {
        this.userService = userService;
        this.userValidator = userValidator;
        this.encoder = encoder;
    }

    @GetMapping("/user")
    public String showInfoUser() {
        return "user";
    }

    @GetMapping("/admin")
    public String index() {
        return "index";
    }

}
