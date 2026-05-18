package com.masasajt.backendfotograf.config;

import com.masasajt.backendfotograf.model.Role;
import com.masasajt.backendfotograf.model.User;
import com.masasajt.backendfotograf.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    // Spring automatski ubacuje repo i encoder koji smo definisali u SecurityConfig
    public DataInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Proveravamo da li admin već postoji u bazi, da ne bismo duplirali podatke pri svakom restartu
        if (userRepository.findByUsername("natasa").isEmpty()) {

            // Pravimo novog korisnika koristeći Lombokov Builder
            User user = User.builder()
                    .username("natasa")
                    // Šifru obavezno propuštamo kroz passwordEncoder pre čuvanja u bazu
                    .password(passwordEncoder.encode("natasa"))
                    .email("natasa@gmail.com")
                    .role(Role.USER)
                    .build();

            // Čuvamo admina u bazu podataka
            userRepository.save(user);

            System.out.println("🚀 [DataInitializer] Početni USER korisnik je uspešno kreiran u bazi podataka!");
        } else {
            System.out.println("ℹ️ [DataInitializer] USER korisnik već postoji u bazi. Preskačem kreiranje.");
        }
    }
}