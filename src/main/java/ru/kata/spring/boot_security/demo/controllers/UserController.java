package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping
public class UserController {
    @GetMapping("/user")
    public String showInfoUser() {
        return "user";
    }

    @GetMapping("/admin")
    public String index() {
        return "index";
    }
}
