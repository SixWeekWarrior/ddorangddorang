package com.sww.ddorangddorang.domain.user.service;

import com.sww.ddorangddorang.domain.mission.entity.Mission;
import com.sww.ddorangddorang.domain.mission.entity.MissionPerform;
import com.sww.ddorangddorang.domain.mission.repository.MissionPerformRepository;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import com.sww.ddorangddorang.domain.participant.repository.ParticipantRepository;
import com.sww.ddorangddorang.domain.room.entity.Room;
import com.sww.ddorangddorang.domain.user.dto.HintDto;
import com.sww.ddorangddorang.domain.user.dto.UsersGetRes;
import com.sww.ddorangddorang.domain.user.dto.UsersHomeInfoGetRes;
import com.sww.ddorangddorang.domain.user.dto.UsersMoreinfoPutReq;
import com.sww.ddorangddorang.domain.user.dto.UsersSsafyinfoPutReq;
import com.sww.ddorangddorang.domain.user.dto.UsersTodayinfoPostReq;
import com.sww.ddorangddorang.domain.user.dto.UsersTokenInfo;
import com.sww.ddorangddorang.domain.user.entity.Hint;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.exception.UserAlreadyExistException;
import com.sww.ddorangddorang.domain.user.exception.UserNotFoundException;
import com.sww.ddorangddorang.domain.user.exception.UserNotParticipateGameException;
import com.sww.ddorangddorang.domain.user.repository.HintRepository;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import com.sww.ddorangddorang.global.common.FileDto;
import com.sww.ddorangddorang.global.common.exception.UnexpectedException;
import com.sww.ddorangddorang.global.util.FileUploader;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final HintRepository hintRepository;
    private final FileUploader fileUploader;
    private final ParticipantRepository participantRepository;
    private final MissionPerformRepository missionPerformRepository;

    public void signUp(User user) throws Exception {
        if (userRepository.findByEmailAndProviderType(user.getEmail(), user.getProviderType())
            .isPresent()) {
            throw new UserAlreadyExistException(user);
        }

        userRepository.save(user);
    }

    @Transactional
    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    public void todayInfo(Long userId, UsersTodayinfoPostReq usersTodayinfoPostReq) {
        log.info("UserService_todayInfo start: {}", usersTodayinfoPostReq);
        User user = userRepository.getReferenceById(userId);

        List<Hint> hintList = new ArrayList<Hint>();
        if (usersTodayinfoPostReq.getColor() != null) {
            hintList.add(Hint.builder()
                .user(user)
                .masterCode(1_001L)
                .content(usersTodayinfoPostReq.getColor())
                .build());
        }

        if (usersTodayinfoPostReq.getMood() != null) {
            hintList.add(Hint.builder()
                .user(user)
                .masterCode(1_002L)
                .content(usersTodayinfoPostReq.getMood())
                .build());
        }

        for (Hint hint : hintList) {
            Optional<Hint> optionalHint = hintRepository.findByUserAndMasterCode(user,
                hint.getMasterCode());
            if (optionalHint.isEmpty()) {
                log.info("UserService_save new hint: {}", hint);
                hintRepository.save(hint);
            } else {
                optionalHint.orElseThrow(UnexpectedException::new).updateContent(hint.getContent());
                log.info("UserService_update hint: {}", optionalHint);
            }
        }
        log.info("UserService_todayInfo end");
    }

    public void ssafyInfo(Long userId, UsersSsafyinfoPutReq usersSsafyinfoPutReq) {
        User user = userRepository.getReferenceById(userId);
        user.updateSsafyInfo(usersSsafyinfoPutReq);
    }

    public void moreInfo(Long userId, UsersMoreinfoPutReq usersMoreinfoPutReq) {
        User user = userRepository.getReferenceById(userId);
        user.updateMoreInfo(usersMoreinfoPutReq);
    }

    public void saveRefreshToken(UsersTokenInfo usersTokenInfo) {
        User user = userRepository.findByEmail(usersTokenInfo.getEmail())
            .orElseThrow(UserNotFoundException::new);

        user.updateRefreshToken(usersTokenInfo.getRefreshToken());
    }

    @Transactional
    public UsersGetRes getUserInfo(Long id) {
        return UsersGetRes.userToDto(
            userRepository.findById(id).orElseThrow(UserNotFoundException::new),
            getUserHint(userRepository.findById(id).orElseThrow(UserNotFoundException::new)));
    }

    @Transactional
    @Override
    public HintDto getHints(Long id) {
        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        return getUserHint(user);
    }

    @Transactional
    @Override
    public void upload(Long id, MultipartFile profile) {
        FileDto fileDto = fileUploader.fileUpload(profile, "profile");
        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);
        user.updateProfileImage(fileDto.getPath());
    }

    @Transactional
    public HintDto getManitoHint(Long id) {
        User user = userRepository.findById(id).orElseThrow(UserNotFoundException::new);

        if (user.getStatus() != 4L) {
            throw new UserNotParticipateGameException();
        }

        Participant participant = participantRepository.findByUserAndGameCount(user,
                user.getGameCount())
            .orElseThrow(UserNotParticipateGameException::new);

        User manito = participant.getManito().getUser();

        return getUserHint(manito);
    }

    private HintDto getUserHint(User user) {
        String color = "";
        String mood = "";

        Optional<Hint> colorHint = hintRepository.findByUserAndMasterCode(user, 1_001L);

        if (colorHint.isPresent()) {
            color = colorHint.orElseThrow(UnexpectedException::new).getContent();
        }

        Optional<Hint> moodHint = hintRepository.findByUserAndMasterCode(user, 1_002L);

        if (moodHint.isPresent()) {
            mood = moodHint.orElseThrow(UnexpectedException::new).getContent();
        }

        return HintDto.builder()
            .color(color)
            .mood(mood)
            .build();
    }

    @Transactional
    public Long getUserState(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        return user.getStatus();
    }

    @Transactional
    public UsersHomeInfoGetRes getHomeInfo(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        if (!user.getStatus().equals(4L)) {
//            return UsersHomeInfoGetRes.noGame().build();
            return UsersHomeInfoGetRes.builder().build();
        }
        Room room = user.getRoom();

        if (room == null || room.isEnded())
            return UsersHomeInfoGetRes.builder().build();

        Optional<Participant> participant = participantRepository.findByUserAndGameCount(user,
            user.getGameCount());

        if (!participant.isPresent())
            return UsersHomeInfoGetRes.builder().build();

        String color = null;
        String mood = null;
        Long dday = null;
        Boolean isMissionDone = null;
        String missionTitle = null;
        Long missionId = null;
        Long missionPerformId = null;
        Participant manito = participant.get().getManito();

        if(manito == null)
            return UsersHomeInfoGetRes.builder().build();

        User manitoUser = manito.getUser();

        Optional<Hint> colorHint = hintRepository.findByUserAndMasterCode(manitoUser, 1_001L);
        if (colorHint.isPresent()) {
            color = colorHint.orElseThrow(UnexpectedException::new).getContent();
        }

        Optional<Hint> moodHint = hintRepository.findByUserAndMasterCode(manitoUser, 1_002L);
        if (moodHint.isPresent()) {
            mood = moodHint.orElseThrow(UnexpectedException::new).getContent();
        }

        dday = ChronoUnit.DAYS.between(LocalDateTime.now(),
            room.getStartedAt().plusDays(room.getDuration())) + 1;

        List<MissionPerform> missionPerformList = missionPerformRepository.findAllByPlayerAndDiscardFalse(participant.get());

        if(!missionPerformList.isEmpty()) {
            missionPerformList.sort(Comparator.comparing(MissionPerform::getReceivedAt).reversed());
            MissionPerform missionPerform = missionPerformList.get(0);
            isMissionDone = missionPerform.isCompleted();
            Mission mission = missionPerform.getMission();
            missionTitle = mission.getTitle();
            missionId = mission.getId();
            missionPerformId = missionPerform.getId();
        }

        return UsersHomeInfoGetRes.builder()
            .color(color)
            .mood(mood)
            .dday(dday)
            .isMissionDone(isMissionDone)
            .missionTitle(missionTitle)
            .missionId(missionId)
            .missionPerformId(missionPerformId)
            .build();
    }
}
