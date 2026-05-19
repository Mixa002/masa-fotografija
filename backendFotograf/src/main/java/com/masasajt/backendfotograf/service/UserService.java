package com.masasajt.backendfotograf.service;


import com.masasajt.backendfotograf.dto.UserDTO;
import com.masasajt.backendfotograf.mapper.UserMapper;
import com.masasajt.backendfotograf.model.User;
import com.masasajt.backendfotograf.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepo;
    private final UserMapper userMapper;

    public List<UserDTO> getAllUsers(){
        List<User> users = userRepo.findAll();
        return userMapper.toUserDTOList(users);
    }

    public User findByUsername(String username){
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Korisnik sa tim korisnickim imenom ne postoji"));
    }
}
