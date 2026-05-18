package com.masasajt.backendfotograf.controller;


import com.masasajt.backendfotograf.dto.AuthResponseDTO;
import com.masasajt.backendfotograf.dto.LoginRequestDTO;
import com.masasajt.backendfotograf.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService){
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO loginRequest){
        AuthResponseDTO response = authService.login(loginRequest);
        return ResponseEntity.ok(response);
    }
}
