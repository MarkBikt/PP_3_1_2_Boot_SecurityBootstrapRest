package ru.kata.spring.boot_security.demo.util;

public class UserNotCreateOrUpdatedException extends RuntimeException {
    public UserNotCreateOrUpdatedException(String msg) {
        super(msg);
    }
}
