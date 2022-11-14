package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.validator.UserValidator;


import javax.validation.Valid;


@Controller
public class AdminController {
    private final UserService userService;
    private final UserValidator userValidator;
    private final PasswordEncoder encoder;

    @Autowired
    public AdminController(UserService userService, UserValidator userValidator, PasswordEncoder encoder) {
        this.userService = userService;
        this.userValidator = userValidator;
        this.encoder = encoder;
    }


    @GetMapping("/admin")
    public String index(Model model,
                        Authentication authentication) {
        model.addAttribute("users", userService.index());
        User user = (User) authentication.getPrincipal();
        model.addAttribute("userA", userService.showInfoUser(user.getId()));
        model.addAttribute("userC", new User());
        return "index";
    }

    @PostMapping("/admin")
    public String create(@ModelAttribute("userC") @Valid User user, BindingResult bindingResult) {

        userValidator.validate(user, bindingResult);

        if (bindingResult.hasErrors()) {
            return "index";
        }

        user.setPassword(encoder.encode(user.getPassword()));
        userService.save(user);
        return "redirect:/admin";
    }

    @PatchMapping("/admin/{id}")
    public String update(@ModelAttribute("user") @Valid User user,
                         BindingResult bindingResult) {
        userValidator.validate(user, bindingResult);

        if (bindingResult.hasErrors()) {
            return "index";
        }

        userService.update(user);
        return "redirect:/admin";
    }

    @DeleteMapping("admin/{id}")
    public String delete(@PathVariable("id") Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }
}
