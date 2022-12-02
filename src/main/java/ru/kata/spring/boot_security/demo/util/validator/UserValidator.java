package ru.kata.spring.boot_security.demo.util.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.service.UserDetailServiceImpl;
import ru.kata.spring.boot_security.demo.service.UserService;


@Component
public class UserValidator implements Validator {

    private final UserService userService;
    private final UserDetailServiceImpl userDetailService;

    @Autowired
    public UserValidator(UserService userService, UserDetailServiceImpl userDetailService) {
        this.userService = userService;
        this.userDetailService = userDetailService;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return User.class.equals(clazz);
    }

    @Override
    public void validate(Object target, Errors errors) {
        User user = (User) target;
        if(user.getRoles().size() == 0) {
            errors.rejectValue("name", "", "Выберите хотябы одну роль");
        }
        try {
            userDetailService.loadUserByUsername(user.getEmail());
        } catch (Exception ignored) {
            return;
        }

        errors.rejectValue("email", "", "Человек с таким мылом существует");
    }
}
