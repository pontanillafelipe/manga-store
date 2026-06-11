package com.mangastore.service;

import com.mangastore.model.User;
import com.mangastore.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(User user) {
        user.setRole("USER");
        return userRepository.save(user);
    }

    public User login(String email, String password) {

    Optional<User> userOpt = userRepository.findByEmail(email);

    if (userOpt.isEmpty()) {
        throw new RuntimeException("Usuario no encontrado");
    }

    User user = userOpt.get();

    if (user.getPassword() == null || !user.getPassword().equals(password)) {
        throw new RuntimeException("Contraseña incorrecta");
    }

    return user;
}
}