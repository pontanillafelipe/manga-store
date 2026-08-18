package com.mangastore.service;

import com.mangastore.model.User;
import com.mangastore.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            BCryptPasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(User user) {

        System.out.println("========== REGISTER ==========");
        System.out.println("EMAIL: " + user.getEmail());
        System.out.println("PASSWORD ORIGINAL: " + user.getPassword());

        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            throw new RuntimeException("El correo ya está registrado");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        System.out.println("PASSWORD ENCRIPTADA: " + user.getPassword());

        user.setRole("USER");

        return userRepository.save(user);
    }

    public User login(String email, String password) {

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return user;
    }
}
