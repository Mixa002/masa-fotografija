package com.masasajt.backendfotograf.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectAclRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
public class CloudflareR2Service {
    private final S3Client s3Client;
    private final String bucketName;
    private final String publicURL;

    public CloudflareR2Service(S3Client s3Client,
                               @Value("${cloudflare.r2.bucket-name}") String bucketName,
                               @Value("${cloudflare.r2.public-url}") String publicURL){
        this.s3Client = s3Client;
        this.bucketName = bucketName;
        this.publicURL = publicURL;
    }


    public String uploadImage(MultipartFile file){
        if(file.isEmpty()){
            throw new IllegalArgumentException("Fajl ne moze da bude prazan!");
        }
        String originalFileName = file.getOriginalFilename();
        String extension = originalFileName != null && originalFileName.contains(".")
                ? originalFileName.substring(originalFileName.lastIndexOf(".")) : "";

        String uniqueFileName = UUID.randomUUID().toString() + extension;

        try{
            PutObjectRequest putObjectRequest = PutObjectRequest.builder().bucket(bucketName)
                    .key(uniqueFileName).contentType(file.getContentType()).build();

            s3Client.putObject(putObjectRequest,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            return publicURL + "/" + uniqueFileName;
        }catch (IOException e){
            throw new RuntimeException("Greska pri ucitavanju ulaznog fajla: " + e);
        } catch (Exception e) {
            throw new RuntimeException("Greska pri uploadu na Cloudflare R2: " + e);
        }
    }
}
