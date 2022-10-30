package ru.kata.spring.boot_security.demo.dao;


import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

public interface UserDao {
    List<User> index();
    User show(Long id);
    void save(User user);
    void update(User newUser);
    void delete(Long id);

    User getUserByUsername(String username);
}
