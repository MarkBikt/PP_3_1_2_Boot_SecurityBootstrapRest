package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserService;
import ru.kata.spring.boot_security.demo.util.PersonNotUpdatedException;
import ru.kata.spring.boot_security.demo.validator.UserValidator;


import javax.validation.Valid;
import java.util.List;


@RestController
public class RestAdminController {
    private final UserService userService;
    private final UserValidator userValidator;
    private final PasswordEncoder encoder;

    @Autowired
    public RestAdminController(UserService userService, UserValidator userValidator, PasswordEncoder encoder) {
        this.userService = userService;
        this.userValidator = userValidator;
        this.encoder = encoder;
    }


    @GetMapping("/admin/index")
    public List<User> index() {
        return userService.index();
    }

    @GetMapping("admin/new")
    public User newUser() {
        return new User();
    }
    @GetMapping("/admin/auth")
    public User authUser(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return userService.showInfoUser(user.getId());
    }

    @GetMapping("/admin/findOne")
    public User findOne(Long id) {
        return userService.show(id);
    }

    /*@PostMapping("/admin/save")
    public String create(@Valid User user, BindingResult bindingResult) {

        userValidator.validate(user, bindingResult);

        if (bindingResult.hasErrors()) {
            return "index";
        }

        user.setPassword(encoder.encode(user.getPassword()));
        userService.save(user);
        return "redirect:/admin";
    }

    @PostMapping("/admin")
    public ResponseEntity<HttpStatus> update(@Valid User user) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder();
            List<FieldError> errors = bindingResult.getFieldErrors();
            for (FieldError fieldError : errors) {
                errorMsg.append(fieldError.getField()).append(" - ").append(fieldError.getDefaultMessage()).append(";");
            }
            throw new PersonNotUpdatedException(errorMsg.toString());
        }

        user.setPassword(encoder.encode(user.getPassword()));
        userService.update(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }


    @DeleteMapping("admin/{id}")
    public String delete(@PathVariable("id") Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }*/
}
