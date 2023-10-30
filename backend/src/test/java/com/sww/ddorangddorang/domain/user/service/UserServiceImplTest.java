package com.sww.ddorangddorang.domain.user.service;

import static org.junit.jupiter.api.Assertions.*;

import java.nio.file.Paths;
import org.junit.jupiter.api.Test;

class UserServiceImplTest {

    @Test
    void detectFace() {
        UserServiceImpl.detectFace(Paths.get("./src/main/resources/static/example/input/face.JPG").toAbsolutePath().toString());
    }
}