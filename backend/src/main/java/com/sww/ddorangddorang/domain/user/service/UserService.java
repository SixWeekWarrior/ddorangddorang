package com.sww.ddorangddorang.domain.user.service;


import com.sww.ddorangddorang.domain.user.dto.HintDto;
import com.sww.ddorangddorang.domain.user.dto.UsersMoreinfoPutReq;
import com.sww.ddorangddorang.domain.user.dto.UsersSsafyinfoPutReq;
import com.sww.ddorangddorang.domain.user.dto.UsersTodayinfoPostReq;
import com.sww.ddorangddorang.domain.user.dto.UsersTokenInfo;
import com.sww.ddorangddorang.domain.user.entity.User;
import java.util.Optional;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    void signUp(User user) throws Exception;

    Optional<User> findByEmail(String email);

    void ssafyInfo(Long userId, UsersSsafyinfoPutReq usersSsafyinfoPutReq);

    void moreInfo(Long userId, UsersMoreinfoPutReq usersMoreinfoPutReq);

    void todayInfo(Long userId, UsersTodayinfoPostReq usersTodayinfoPostReq);

    void saveRefreshToken(UsersTokenInfo build);

    User getUserInfo(Long id);

    HintDto getHints(Long id);

    String upload(MultipartFile profile);

    HintDto getManitoHint(Long id);

    Long getUserState(Long userId);
}
