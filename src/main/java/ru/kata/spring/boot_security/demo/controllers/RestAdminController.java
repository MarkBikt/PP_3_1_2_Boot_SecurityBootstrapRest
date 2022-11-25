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
import ru.kata.spring.boot_security.demo.util.UserErrorResponse;
import ru.kata.spring.boot_security.demo.util.UserNotCreateOrUpdatedException;
import ru.kata.spring.boot_security.demo.util.UserNotDeleteException;
import ru.kata.spring.boot_security.demo.util.UserNotFoundException;
import ru.kata.spring.boot_security.demo.validator.UserValidator;


import javax.validation.Valid;
import java.util.List;


@RestController
@RequestMapping
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
    @GetMapping("/admin/auth")
    public User authUser(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return userService.showInfoUser(user.getId());
    }
    @GetMapping("/admin/findOne")
    public User findOne(Long id) {
        return userService.show(id);
    }

    @PostMapping("/admin/save")
    public ResponseEntity<HttpStatus> save(@RequestBody @Valid User user) {
        /*if (bindingResult.hasErrors()) {
            StringBuilder errorMsg = new StringBuilder();
            List<FieldError> errors = bindingResult.getFieldErrors();
            for (FieldError error : errors) {
                errorMsg.append(error.getField())
                        .append(" - ")
                        .append(error.getDefaultMessage())
                        .append(";");
            }
            throw new UserNotCreateOrUpdatedException(errorMsg.toString());
        }*/
        user.setPassword(encoder.encode(user.getPassword()));
        userService.save(user);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping("/admin/delete")
    public ResponseEntity<HttpStatus> delete(@RequestBody User user) {
        userService.delete(user.getId());
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @ExceptionHandler
    private ResponseEntity<UserErrorResponse> handleException(UserNotFoundException e) {
        UserErrorResponse response = new UserErrorResponse(
                "User with this id wasn't found!",
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler
    private ResponseEntity<UserErrorResponse> handleException(UserNotCreateOrUpdatedException e) {
        UserErrorResponse response = new UserErrorResponse(
                e.getMessage(),
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler
    private ResponseEntity<UserErrorResponse> handleException(UserNotDeleteException e) {
        UserErrorResponse response = new UserErrorResponse(
                e.getMessage(),
                System.currentTimeMillis()
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
