package ru.kata.spring.boot_security.demo.util;

public class UserNotDeleteException extends RuntimeException {
    public UserNotDeleteException(String message) {
        super(message);
    }
}
