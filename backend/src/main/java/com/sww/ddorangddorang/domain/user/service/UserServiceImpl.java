package com.sww.ddorangddorang.domain.user.service;

import com.sww.ddorangddorang.domain.user.dto.UsersSignupPostReq;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.opencv.core.Core;
import org.opencv.core.Mat;
import org.opencv.core.MatOfRect;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.objdetect.CascadeClassifier;
import org.opencv.objdetect.Objdetect;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void signUp(UsersSignupPostReq usersPostReq) throws Exception {

        if (userRepository.findByEmail(usersPostReq.getEmail()).isPresent()) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        // TODO: properties 추가
        User user = User.signup()
            .email(usersPostReq.getEmail())
            .password(usersPostReq.getPassword())
            .name(usersPostReq.getName())
            .role("ROLE_USER")
            .build();

        user.passwordEncode(passwordEncoder);
        userRepository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public static int detectFace(String sourceImagePath) {
        Mat loadedImage = loadImage(sourceImagePath);

        // store the faces we find
        MatOfRect facesDetected = new MatOfRect();

        // initialize the CascadeClassifier to do the recognition
        CascadeClassifier cascadeClassifier = new CascadeClassifier();
        int minFaceSize = Math.round(loadedImage.rows() * 0.1f);
        cascadeClassifier.load(
            Paths.get("./src/main/resources/static/classifier/haarcascade_frontalface_alt.xml").toAbsolutePath().toString());
        cascadeClassifier.detectMultiScale(loadedImage,
            facesDetected,
            1.1,
            3,
            Objdetect.CASCADE_SCALE_IMAGE,
            new Size(minFaceSize, minFaceSize),
            new Size()
        );

        String targetImagePath = Paths.get("./src/main/resources/static/example/result/result.jpg").toAbsolutePath().toString();

        // loop through the faces and save the result
        Rect[] facesArray = facesDetected.toArray();
        for(Rect face : facesArray) {
            Imgproc.rectangle(loadedImage, face.tl(), face.br(), new Scalar(0, 0, 255), 3);
        }
        saveImage(loadedImage, targetImagePath);

        return 0;
    }

    public static Mat loadImage(String imagePath) {
        return Imgcodecs.imread(imagePath);
    }

    public static void saveImage(Mat imageMatrix, String targetPath) {
        Imgcodecs.imwrite(targetPath, imageMatrix);
    }
}
