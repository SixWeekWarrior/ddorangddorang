package com.sww.ddorangddorang.global.util;

import com.sww.ddorangddorang.global.common.FileDto;
import com.sww.ddorangddorang.global.common.exception.ImageUploadFailException;
import java.io.IOException;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Component
public class FileUploader {

    private final S3UploaderUtil s3Uploader;

    public FileDto fileUpload(MultipartFile file, String subFolderName) {
        log.info("FileUploader_fileUpload_start: " + file + " " + subFolderName);

        try {
            String originalName = file.getOriginalFilename();
            // 파일 확장자 명
            String extension = originalName.substring( // 파일명에 .은 반드시 있으니 예외처리 X
                    originalName.lastIndexOf(".") + 1);

            // 랜덤한 파일 이름 생성
            String fileName = subFolderName + "/" + UUID.randomUUID() + "." + extension;

            // S3 파일 경로 설정
            String path = s3Uploader.upload(file, fileName);

            FileDto fileDto = FileDto.builder()
                    .fileName(fileName)
                    .originalName(file.getOriginalFilename())
                    .path(path)
                    .contentType(file.getContentType())
                    .build();

            log.info("FileUploader_fileUpload_end: " + fileDto);
            return fileDto;
        } catch (IllegalStateException e) {
            log.info("FileUploader_fileUpload_end: false");
            throw new ImageUploadFailException(); // 이미지 등록 실패 시 Exception
        }
    }
}