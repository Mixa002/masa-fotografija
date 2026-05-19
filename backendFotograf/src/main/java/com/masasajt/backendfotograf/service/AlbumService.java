package com.masasajt.backendfotograf.service;


import com.masasajt.backendfotograf.dto.AlbumDTO;
import com.masasajt.backendfotograf.mapper.AlbumMapper;
import com.masasajt.backendfotograf.model.Album;
import com.masasajt.backendfotograf.model.Image;
import com.masasajt.backendfotograf.model.User;
import com.masasajt.backendfotograf.repository.AlbumRepository;
import com.masasajt.backendfotograf.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlbumService {
    private final AlbumRepository albumRepo;
    private final UserService userService;
    private final AlbumMapper albumMapper;
    private final ImageRepository imageRepo;
    private final CloudflareR2Service cloudflareR2Service;

    public List<AlbumDTO> getPublicAlbums(){
        List<Album> publicAlbums = albumRepo.findByIsPrivateFalse();
        return albumMapper.toAlbumDTOList(publicAlbums);
    }

    public List<AlbumDTO> getPrivateAlbumsForClient(String username){
        List<Album> privateAlbums = albumRepo.findByIsPrivateTrueAndClientUsername(username);
        return albumMapper.toAlbumDTOList(privateAlbums);
    }

    @Transactional
    public AlbumDTO createAlbum(String name, boolean isPrivate, String clientUsername){
        Album album = new Album();
        album.setName(name);
        album.setPrivate(isPrivate);

        if(isPrivate && clientUsername != null && !clientUsername.isBlank()){
            User client = userService.findByUsername(clientUsername);
            album.setClient(client);
        }

        Album savedAlbum = albumRepo.save(album);
        return albumMapper.toAlbumDTO(album);
    }

    @Transactional
    public AlbumDTO uploadAddImagesToAlbum(Long albumId, List<MultipartFile> files){
        Album album = albumRepo.findById(albumId)
                .orElseThrow(() -> new RuntimeException("Album nije pronadjen!"));

        for (MultipartFile file: files){
            if(!file.isEmpty()){
                try{
                    String imageURL = cloudflareR2Service.uploadImage(file);

                    Image image = new Image();
                    image.setUrl(imageURL);
                    image.setAlbum(album);

                    album.getImages().add(image);
                }catch (Exception e){
                    System.out.println("Greska pri uploadu pojedinacnog fajla: " + e);
                }
            }
        }

        Album updatedAlbum = albumRepo.save(album);
        return albumMapper.toAlbumDTO(updatedAlbum);
    }

    public AlbumDTO getAlbumById(Long id){
        Album album =  albumRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Album nije pronadjen!"));
        return albumMapper.toAlbumDTO(album);
    }
}
