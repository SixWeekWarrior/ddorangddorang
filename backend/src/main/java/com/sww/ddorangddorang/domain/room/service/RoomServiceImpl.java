package com.sww.ddorangddorang.domain.room.service;

import com.sww.ddorangddorang.domain.participant.entity.Participant;
import com.sww.ddorangddorang.domain.participant.entity.Prefix;
import com.sww.ddorangddorang.domain.participant.entity.Suffix;
import com.sww.ddorangddorang.domain.participant.exception.ParticipantNotFoundException;
import com.sww.ddorangddorang.domain.participant.repository.ParticipantRepository;
import com.sww.ddorangddorang.domain.participant.repository.PrefixRepository;
import com.sww.ddorangddorang.domain.participant.repository.SuffixRepository;
import com.sww.ddorangddorang.domain.room.dto.JoinRoomReq;
import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
import com.sww.ddorangddorang.domain.room.dto.ShowUsersRes;
import com.sww.ddorangddorang.domain.room.entity.Room;
import com.sww.ddorangddorang.domain.room.exception.AlreadyParticipatingRoomException;
import com.sww.ddorangddorang.domain.room.exception.DataNotInRangeException;
import com.sww.ddorangddorang.domain.room.exception.InvalidParameterValueException;
import com.sww.ddorangddorang.domain.room.exception.NoParticipatingRoomException;
import com.sww.ddorangddorang.domain.room.exception.OnlyAdminAllowedException;
import com.sww.ddorangddorang.domain.room.exception.OnlyUserAllowedException;
import com.sww.ddorangddorang.domain.room.exception.OnlyWaitingStateAllowedException;
import com.sww.ddorangddorang.domain.room.exception.PlayersNotEnoughException;
import com.sww.ddorangddorang.domain.room.exception.RoomAlreadyFullException;
import com.sww.ddorangddorang.domain.room.exception.RoomNotFoundException;
import com.sww.ddorangddorang.domain.room.repository.RoomRepository;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import com.sww.ddorangddorang.global.util.RedisUtil;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class RoomServiceImpl implements RoomService {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final ParticipantRepository participantRepository;
    private final PrefixRepository prefixRepository;
    private final SuffixRepository suffixRepository;
    private final RedisUtil redisUtil;

    @Transactional
    public Integer createRoom(Long userId, RoomInfoReq roomInfoReq) {
        //사용자가 현재 참여중인 방이 있는지
        //선택하지 않은 옵션
        //정상
        log.info("RoomServiceImpl_createRoom start");
        User user = userRepository.getReferenceById(userId);

        if (user.getStatus() != 1L) {
            log.info("RoomServiceImpl_createRoom end");
            throw new AlreadyParticipatingRoomException();
        }

        if (roomInfoReq.getMinMember() < 1
            || roomInfoReq.getMinMember() > roomInfoReq.getMaxMember()) {
            log.info("RoomServiceImpl_createRoom end");
            throw new InvalidParameterValueException();
        }

        Integer accessCode = generateAccessCode();
        log.info("accessCode = " + accessCode);

        user.updateStatus(2L);
        Room room = Room.builder()
            .admin(user)
            .accessCode(accessCode)
            .minMember(roomInfoReq.getMinMember())
            .maxMember(roomInfoReq.getMaxMember())
            .duration(roomInfoReq.getDuration())
            .build();
        roomRepository.save(room);

        Participant participant = Participant.builder()
            .user(user)
            .build();
        participantRepository.save(participant);

        log.info("RoomServiceImpl_createRoom end: " + room.getAccessCode());
        return room.getAccessCode();
    }

    @Transactional
    public Integer generateAccessCode() {
        log.info("RoomServiceImpl_generateAccessCode start");
        Integer accessCode = redisUtil.getAccessCode();

        if (accessCode == -1) {
            Boolean[] accessCodeStatusList = new Boolean[10000];
            List<Room> roomList = roomRepository.findAllByStartedAtIsNullAndDeletedAtIsNull();

            for (Room room : roomList) {
                accessCodeStatusList[room.getAccessCode()] = true;
            }

            accessCode = redisUtil.initAccessCode(accessCodeStatusList);
        }

        log.info("RoomServiceImpl_generateAccessCode end: " + accessCode);
        return accessCode;
    }

    @Transactional
    public void joinRoom(Long userId, Integer accessCode) {
        log.info("RoomServiceImpl_joinRoom start");
        User user = userRepository.getReferenceById(userId);

        if (user.getStatus() != 1L) {
            log.info("RoomServiceImpl_joinRoom end");
            throw new AlreadyParticipatingRoomException();
        }

        Room room = roomRepository.findByAccessCodeAndStartedAtIsNullAndDeletedAtIsNull(accessCode)
            .orElseThrow(RoomNotFoundException::new);

        if (room.getHeadCount() >= room.getMaxMember()) {
            log.info("RoomServiceImpl_joinRoom end");
            throw new RoomAlreadyFullException();
        }

        user.updateRoom(room);
        user.updateStatus(5L);

        //TODO: 알림 기능 추가 시 관리자에게 알림을 보내는 로직이 추가되면 좋을 것 같음
        log.info("RoomServiceImpl_joinRoom end");
    }

    @Transactional
    public void updateRoom(Long userId, RoomInfoReq roomInfoReq) {
        log.info("RoomServiceImpl_updateRoom start");
        User user = userRepository.getReferenceById(userId);

        if (user.getStatus() != 2L) {
            log.info("RoomServiceImpl_updateRoom end");
            throw new OnlyAdminAllowedException();
        }

        if (roomInfoReq.getMinMember() < 1
            || roomInfoReq.getMinMember() > roomInfoReq.getMaxMember()) {
            log.info("RoomServiceImpl_updateRoom end");
            throw new InvalidParameterValueException();
        }

        Room room = roomRepository.findByAdminAndStartedAtIsNullAndDeletedAtIsNull(user)
            .orElseThrow(RoomNotFoundException::new);

        Integer currentCount = room.getHeadCount();
        //현재 인원보다 최소 인원이 많거나, 현재 인원보다 최대 인원이 적은 경우: false 반환
        if (roomInfoReq.getMinMember() < currentCount
            || currentCount > roomInfoReq.getMaxMember()) {
            log.info("RoomServiceImpl_updateRoom end");
            throw new DataNotInRangeException();
        }

        room.updateRoomInfo(roomInfoReq);

        log.info("RoomServiceImpl_updateRoom end");
    }

    @Transactional
    public void deleteGame(Long userId) {
        log.info("RoomServiceImpl_deleteGame start");
        User admin = userRepository.getReferenceById(userId);

        if (admin.getStatus() != 2L) {
            log.info("RoomServiceImpl_deleteGame end");
            throw new OnlyAdminAllowedException();
        }

        Room room = admin.getRoom();
        List<User> userList = userRepository.findAllByRoom(room);

        for (User user : userList) {
            user.withdrawRoom();
        }

        room.deleteRoom();
        redisUtil.putAccessCode(room.getAccessCode());

        log.info("RoomServiceImpl_deleteGame end");
    }

    @Transactional
    public void withdrawalRoom(Long userId) {
        log.info("RoomServiceImpl_withdrawalRoom start");

        User user = userRepository.getReferenceById(userId);

        if (user.getStatus() != 3L && user.getStatus() != 5L) {
            log.info("RoomServiceImpl_withdrawalRoom end");
            throw new OnlyUserAllowedException();
        }

        if (user.getStatus() == 3L) {
            Participant participant = participantRepository.findByUserAndGameCount(user,
                user.getGameCount()).orElseThrow(ParticipantNotFoundException::new);
            participant.deleteParticipant();
        } else {
            user.updateRoom(null);
            user.updateStatus(1L);
        }

        log.info("RoomServiceImpl_withdrawalRoom end");
    }


    //TODO: 미션 부여는 아직 안 됨
    @Transactional
    public void startGame(Room room) {
        log.info("RoomServiceImpl_startGame start");
        List<Participant> participantList = participantRepository.findAllByRoomAndDeletedAtIsNull(
            room);

        Map<Integer, Participant> indexToParticipant = new HashMap<>();
        Map<Participant, Integer> participantToIndex = new HashMap<>();
        Integer count = 0;
        Integer size = participantList.size() + 1;
        List<Participant> maleList = new ArrayList<>();
        List<Participant> femaleList = new ArrayList<>();
        List<Participant>[] wishManitoList = new List[size];
        Integer[] matchedManito = new Integer[size];
        Boolean[] searched = new Boolean[size];

        for (int i = 0; i < participantList.size(); ++i) {
            Participant participant = participantList.get(i);

            indexToParticipant.put(i + 1, participant);
            participantToIndex.put(participant, i + 1);

            //우선 이성끼리 매칭
            if (participant.getUser().getGender()) {
                maleList.add(participant);
            } else {
                femaleList.add(participant);
            }
        }

        for (int i = 1; i < size; ++i) {
            Participant participant = indexToParticipant.get(i);

            //추후 차단 로직 구현 시 여기서 차단한 사용자는 간선에서 뺴기
            if (participant.getUser().getGender()) {
                wishManitoList[i] = List.copyOf(femaleList);
            } else {
                wishManitoList[i] = List.copyOf(maleList);
            }

            Collections.shuffle(wishManitoList[i]);
        }

        for (int i = 1; i < size; ++i) {
            Arrays.fill(searched, false);
            matchManito(i, searched, matchedManito, wishManitoList[i], participantToIndex);
        }

        Boolean[] matched = new Boolean[size];

        for (int i = 1; i < size; ++i) {
            if (matchedManito[i] > 0) {
                matched[matchedManito[i]] = true;
                ++count;
            }
        }

        List<Participant> unmatchedList = new ArrayList<>();
        //매칭이 되지 않은 회원끼리는 성별과 관계 없이 매칭
        for (int i = 1; i < size; ++i) {
            if (!matched[i]) {
                unmatchedList.add(indexToParticipant.get(i));
            }
        }

        for (int i = 1; i < size; ++i) {
            if (!matched[i]) {
                Participant me = indexToParticipant.get(i);
                wishManitoList[i] = new ArrayList<>();

                //추후 차단한 사용자는 배제하는 로직 추가
                //Set을 활용하면 좋을 것 같음
                for (Participant participant : unmatchedList) {
                    if (!participant.equals(me)) {
                        wishManitoList[i].add(participant);
                    }
                }

                Collections.shuffle(wishManitoList[i]);
            }
        }

        for (int i = 1; i < size; ++i) {
            if (!matched[i]) {
                Arrays.fill(searched, false);
                matchManito(i, searched, matchedManito, wishManitoList[i], participantToIndex);
            }
        }

        count = 0;
        for (int i = 1; i < size; ++i) {
            if (matchedManito[i] > 0) {
                matched[matchedManito[i]] = true;
                ++count;
                Participant manito = indexToParticipant.get(matchedManito[i]);
                Participant maniti = indexToParticipant.get(i);

                manito.matchManiti(maniti);
                maniti.matchManito(manito);
            }
        }

        List<Prefix> prefixList = prefixRepository.findAll();
        List<Suffix> suffixList = suffixRepository.findAll();
        Integer prefixListSize = prefixList.isEmpty() ? 0 : prefixList.size();
        Integer suffixListSize = suffixList.isEmpty() ? 0 : suffixList.size();
        Boolean[][] nicknameUsage = new Boolean[prefixListSize][suffixListSize];

        for (Participant participant : participantList) {
            if (participant.getManito() != null) {
                Integer prefixSelected = -1;
                Integer suffixSelected = -1;

                do {
                    Integer randomNumber = (int) (Math.random() * prefixListSize * suffixListSize);
                    prefixSelected = randomNumber / suffixListSize;
                    suffixSelected = randomNumber % suffixListSize;
                } while (!nicknameUsage[prefixSelected][suffixSelected]);

                participant.allocateNickname(
                    prefixList.get(prefixSelected) + " " + suffixList.get(suffixSelected));
//                해당 사용자들은 게임을 시작한 상태로 변경
                participant.getUser().updateStatus(4L);
            } else {
//                이 사용자들은 매칭이 되지 않은 관계로 강퇴
                participant.deleteParticipant();
            }
        }

        room.updateHeadCount(count);
        room.startGame();
        redisUtil.putAccessCode(room.getAccessCode());
        log.info("RoomServiceImpl_startGame end: " + count + " participants started a game");
    }

    private Boolean matchManito(Integer current, Boolean[] searched, Integer[] matchedManito,
        List<Participant> wishManitoList, Map<Participant, Integer> participantToIndex) {
        for (Participant participant : wishManitoList) {
            Integer next = participantToIndex.get(participant);

            if (!searched[next]) {
                searched[next] = true;

                if (matchedManito[next] == 0) {
                    matchedManito[next] = current;
                    return true;
                } else if (
                    matchManito(next, searched, matchedManito, wishManitoList, participantToIndex)
                        && matchedManito[current] != next) {
                    matchedManito[next] = current;
                    return true;
                }
            }
        }

        return false;
    }

    public List<ShowUsersRes> showUsers(Long userId) {
        log.info("RoomServiceImpl_showUsers start");

        User user = userRepository.getReferenceById(userId);
        List<ShowUsersRes> showUsersResList = new ArrayList<>();

        if (user.getStatus() == 1L) {
            log.info("RoomServiceImpl_showUsers end");
            throw new NoParticipatingRoomException();
        }
        Room room = user.getRoom();

        if (room == null) {
            log.info("RoomServiceImpl_showUsers end");
            throw new RoomNotFoundException();
        }

        List<User> userList = userRepository.findAllByRoom(room);

        for (User registedUser : userList) {
            Long status = registedUser.getStatus();

            if (status >= 2L && status <= 4L) {
                ShowUsersRes showUsersRes = ShowUsersRes.builder()
                    .name(registedUser.getName())
                    .generation(registedUser.getGeneration())
                    .classes(registedUser.getGeneration())
                    .profileImage(registedUser.getProfileImage())
                    .build();

                showUsersResList.add(showUsersRes);
            }
        }

        log.info("RoomServiceImpl_showUsers end");
        return showUsersResList;
    }

    @Transactional
    public Boolean responseJoinRoom(Long userId, JoinRoomReq joinRoomReq) {
        log.info("RoomServiceImpl_responseJoinRoom start");
        User admin = userRepository.getReferenceById(userId);
        User requestUser = userRepository.getReferenceById(joinRoomReq.getUserId());

        if (requestUser.getStatus() != 5L) {
            log.info("RoomServiceImpl_responseJoinRoom end");
            throw new OnlyWaitingStateAllowedException();
        }
        Room room = requestUser.getRoom();

        if (room == null) {
            log.info("RoomServiceImpl_responseJoinRoom end");
            throw new RoomNotFoundException();
        }

        if (!room.getAdmin().equals(admin)) {
            log.info("RoomServiceImpl_responseJoinRoom end");
            throw new OnlyAdminAllowedException();
        }

        if (!joinRoomReq.getAccepted()) {
            requestUser.updateRoom(null);
            requestUser.updateStatus(1L);
            log.info("RoomServiceImpl_responseJoinRoom end");
            return false;
        } else if (room.getMaxMember() <= room.getHeadCount()) {
            requestUser.updateRoom(null);
            requestUser.updateStatus(1L);
            log.info("RoomServiceImpl_responseJoinRoom end");
            throw new RoomAlreadyFullException();
        }

        requestUser.updateStatus(3L);
        room.joinMember();

        Participant participant = Participant.builder()
            .user(requestUser)
            .build();
        participantRepository.save(participant);

        log.info("RoomServiceImpl_responseToJoinRoom end");
        return true;
    }

    @Transactional
    public Boolean checkAndRunIfRoomShouldStart(Long userId) {
        log.info("RoomServiceImpl_checkAndRunIfRoomShouldStart start");
        User user = userRepository.getReferenceById(userId);

        Room room = user.getRoom();

        if (room.getHeadCount() == room.getMaxMember()) {
            startGame(room);
            log.info("RoomServiceImpl_checkAndRunIfRoomShouldStart end");
            return true;
        }

        log.info("RoomServiceImpl_checkAndRunIfRoomShouldStart end");
        return false;
    }

    @Transactional
    public Boolean checkAndStartGame(Long userId) {
        log.info("RoomServiceImpl_checkAndStartGame start");
        User user = userRepository.getReferenceById(userId);

        Room room = user.getRoom();

        if (!user.equals(room.getAdmin())) {
            log.info("RoomServiceImpl_checkAndStartGame end");
            throw new OnlyAdminAllowedException();
        }

        if (room.getMinMember() <= room.getHeadCount()
            && room.getHeadCount() <= room.getMaxMember()) {
            startGame(room);
            log.info("RoomServiceImpl_checkAndStartGame end");
            return true;
        }

        log.info("RoomServiceImpl_checkAndStartGame end: invalid play condition");
        throw new PlayersNotEnoughException();
    }
}
