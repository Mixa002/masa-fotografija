package com.masasajt.backendfotograf.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlbumDTO {
    private Long id;
    private String name;
    private LocalDateTime date;
    private boolean isPrivate;
    private String coverImageURL;
    private List<ImageDTO> images;
    private String clientUsername;
}
