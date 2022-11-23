package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
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
    @Autowired
    public UserController(UserService userService, UserValidator userValidator) {
        this.userService = userService;
        this.userValidator = userValidator;
    }

    @GetMapping("/user")
    public String showInfoUser() {
        return "user";
    }

    @GetMapping("/admin")
    public String index() {
        return "index";
    }

    @PutMapping("/admin/save")
    public String save(@RequestBody User user) {
        userService.save(user);
        return "redirect:/admin";
    }

}
