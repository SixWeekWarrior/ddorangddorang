package com.sww.ddorangddorang.domain.room.service;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.mission.service.MissionPerformService;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import com.sww.ddorangddorang.domain.participant.entity.Prefix;
import com.sww.ddorangddorang.domain.participant.entity.Suffix;
import com.sww.ddorangddorang.domain.participant.exception.ParticipantNotFoundException;
import com.sww.ddorangddorang.domain.participant.repository.ParticipantRepository;
import com.sww.ddorangddorang.domain.participant.repository.PrefixRepository;
import com.sww.ddorangddorang.domain.participant.repository.SuffixRepository;
import com.sww.ddorangddorang.domain.room.dto.EndDayInfoRes;
import com.sww.ddorangddorang.domain.room.dto.JoinRoomReq;
import com.sww.ddorangddorang.domain.room.dto.RoomGetRes;
import com.sww.ddorangddorang.domain.room.dto.RoomInfoReq;
import com.sww.ddorangddorang.domain.room.dto.ShowUsersRes;
import com.sww.ddorangddorang.domain.room.dto.WaitingListRes;
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
import com.sww.ddorangddorang.domain.user.exception.UserNotFoundException;
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
    private final MissionPerformService missionPerformService;

    @Transactional
    public Integer createRoom(RoomInfoReq roomInfoReq, AuthenticatedUser authenticatedUser) {
        //사용자가 현재 참여중인 방이 있는지
        //선택하지 않은 옵션
        //정상
        log.info("RoomServiceImpl_createRoom start");
        log.info("id: {}", authenticatedUser.getId());
        User user = findUserById(authenticatedUser.getId());

        // TODO: user.getStatus()가 null이라서 에러 터져서 임시 수정함 MasterCode의 합의가 필요함
        if (user.getStatus() != null && !user.getStatus().equals(1L)) {
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

        log.info("user = {}, accessCode = {}, ", user, accessCode);
        log.info("minMember: {}, maxMember: {}, duration: {}", roomInfoReq.getMinMember(),
            roomInfoReq.getMaxMember(), roomInfoReq.getDuration());

        Room room = Room.builder()
            .admin(user)
            .accessCode(accessCode)
            .minMember(roomInfoReq.getMinMember())
            .maxMember(roomInfoReq.getMaxMember())
            .duration(roomInfoReq.getDuration())
            .build();

        roomRepository.save(room);

        // TODO: 이거 없으면  room_id null들어가서 에러터짐 일단 수정하고 컨펌받기
        user.updateRoom(room);

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

        if (accessCode.equals(-1)) {
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
    public void joinRoom(Integer accessCode, AuthenticatedUser authenticatedUser) {
        log.info("RoomServiceImpl_joinRoom start");
        log.info("id: {}", authenticatedUser.getId());
        User user = findUserById(authenticatedUser.getId());

        // TODO: 초창기에 null값이라 nullPointerException 터짐에 유의, 임시적으로 수정함
        if (user.getStatus() != null && !user.getStatus().equals(1L)) {
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

    // 어드민 유저의 방 정보 수정 요청
    @Transactional
    public void updateRoom(RoomInfoReq roomInfoReq, AuthenticatedUser authenticatedUser) {
        log.info("RoomServiceImpl_updateRoom start");
        log.info("id: {}", authenticatedUser.getId());
        User user = findUserById(authenticatedUser.getId());

        if (!user.getStatus().equals(2L)) {
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
    public void deleteGame(AuthenticatedUser authenticatedUser) {
        log.info("RoomServiceImpl_deleteGame start");
        log.info("id: {}", authenticatedUser.getId());
        User admin = findUserById(authenticatedUser.getId());

        if (!admin.getStatus().equals(2L)) {
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
    public void withdrawalRoom(AuthenticatedUser authenticatedUser) {
        log.info("RoomServiceImpl_withdrawalRoom start");
        log.info("id: {}", authenticatedUser.getId());
        User user = findUserById(authenticatedUser.getId());

        if (!user.getStatus().equals(3L) && !user.getStatus().equals(5L)) {
            log.info("RoomServiceImpl_withdrawalRoom end");
            throw new OnlyUserAllowedException();
        }

        if (user.getStatus().equals(3L)) {
            Participant participant = participantRepository.findByUserAndGameCount(user,
                user.getGameCount()).orElseThrow(ParticipantNotFoundException::new);
            participant.deleteParticipant();
        } else {
            user.updateRoom(null);
            user.updateStatus(1L);
        }

        log.info("RoomServiceImpl_withdrawalRoom end");
    }


    // TODO: 미션 부여는 아직 안 됨
    // 미션 부여 코드 한 줄 추가했습니다
    @Transactional
    public void startGame(Room room) {
        log.info("RoomServiceImpl_startGame start");
        List<Participant> participantList = participantRepository.findAllByRoomAndDeletedAtIsNull(
            room);

        Map<Integer, Participant> indexToParticipant = new HashMap<>();
        Map<Participant, Integer> participantToIndex = new HashMap<>();
        Integer count = 0;
        Integer size = participantList.size() + 1;

        log.info("size: {}", size); // 사이즈 자체는 정상임

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

            List<Participant> tmp = new ArrayList<>(wishManitoList[i]);
            Collections.shuffle(tmp);
            wishManitoList[i] = tmp;
        }

        Arrays.fill(matchedManito, 0);
        for (int i = 1; i < size; ++i) {
            Arrays.fill(searched, false);
            matchManito(i, searched, matchedManito, wishManitoList[i], participantToIndex);
        }

        Boolean[] manitoMatched = new Boolean[size];
        Boolean[] manitiMatched = new Boolean[size];
        Arrays.fill(manitoMatched, false);
        Arrays.fill(manitiMatched, false);

        for (int i = 1; i < size; ++i) {
            if (matchedManito[i] > 0) {
                manitoMatched[matchedManito[i]] = true;
                manitiMatched[i] = true;
            }
        }

        List<Participant> unmatchedManitoList = new ArrayList<>();
        List<Participant> unmatchedManitiList = new ArrayList<>();
        log.info("initial match");
        //마니또가 매칭이 되지 않은 회원끼리는 성별과 관계 없이 매칭
        for (int i = 1; i < size; ++i) {
            if (!manitoMatched[i]) {
                unmatchedManitoList.add(indexToParticipant.get(i));
            }
            if (!manitiMatched[matchedManito[i]]) {
                unmatchedManitiList.add(indexToParticipant.get(matchedManito[i]));
            }
        }

        for (int i = 1; i < size; ++i) {
            if (!manitoMatched[i]) {
                Participant me = indexToParticipant.get(i);
                wishManitoList[i] = new ArrayList<>();

                //추후 차단한 사용자는 배제하는 로직 추가
                //Set을 활용하면 좋을 것 같음
                for (Participant participant : unmatchedManitiList) {
                    if (participant != null && !me.equals(participant)) {
                        wishManitoList[i].add(participant);
                    }
                }

                Collections.shuffle(wishManitoList[i]);
            }
        }

        for (int i = 1; i < size; ++i) {
            if (!manitoMatched[i]) {
                Arrays.fill(searched, false);
                matchManito(i, searched, matchedManito, wishManitoList[i], participantToIndex);
            }
        }

        for (int i = 1; i < size; ++i) {
            if (matchedManito[i] > 0) {
                manitoMatched[matchedManito[i]] = true;
                manitiMatched[i] = true;
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
                } while (nicknameUsage[prefixSelected][suffixSelected] != null);

                nicknameUsage[prefixSelected][suffixSelected] = true;
                participant.allocateNickname(
                    prefixList.get(prefixSelected).getAdjective() + " " + suffixList.get(
                        suffixSelected).getAnimal());
//                해당 사용자들은 게임을 시작한 상태로 변경
                participant.getUser().updateStatus(4L);
                log.info(
                    participant.getManito().getUser().getName() + " -> " + participant.getUser()
                        .getName());
            } else {
//                이 사용자들은 매칭이 되지 않은 관계로 강퇴
                participant.deleteParticipant();
            }
        }

        room.updateHeadCount(count);
        room.startGame();
//        missionPerformService.startGameAndAssignMission(room);
        redisUtil.putAccessCode(room.getAccessCode());
        log.info("RoomServiceImpl_startGame end: " + count + " participants started a game");
    }

    private Boolean matchManito(Integer current, Boolean[] searched, Integer[] matchedManito,
        List<Participant> wishManitoList, Map<Participant, Integer> participantToIndex) {
        for (Participant participant : wishManitoList) {
            Integer next = participantToIndex.getOrDefault(participant, -1);

            log.info("next: {}", next);

            if (next.equals(-1)) {
                return false;
            }

            if (!searched[next]) {
                searched[next] = true;

                log.info("matchedManito[next]: {}", matchedManito[next]); // null뜸 왜?

                // TODO: 여기 에러 터짐
                if (matchedManito[next].equals(0)) {
                    matchedManito[next] = current;
                    return true;
                } else if (
                    matchManito(next, searched, matchedManito, wishManitoList, participantToIndex)
                        && !matchedManito[current].equals(next)) {
                    matchedManito[next] = current;
                    return true;
                }
            }
        }

        return false;
    }

    public List<ShowUsersRes> showUsers(AuthenticatedUser authenticatedUser) {
        log.info("RoomServiceImpl_showUsers start");
        log.info("id: {}", authenticatedUser.getId());

        User user = findUserById(authenticatedUser.getId());
        List<ShowUsersRes> showUsersResList = new ArrayList<>();

        if (user.getStatus().equals(1L)) {
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
    public Boolean responseJoinRoom(List<JoinRoomReq> joinRoomReqList,
        AuthenticatedUser authenticatedUser) {
        log.info("RoomServiceImpl_responseJoinRoom start");
        log.info("id: {}", authenticatedUser.getId());
        User admin = findUserById(authenticatedUser.getId());

        List<Long> idList = new ArrayList<Long>();
        for (JoinRoomReq joinRoomReq : joinRoomReqList) {
            idList.add(joinRoomReq.getUserId());
        }

        List<User> requestUserList = userRepository.findAllById(idList);
//        User requestUser = findUserById(joinRoomReq.getUserId());

        for (User requestUser : requestUserList) {
            if (!requestUser.getStatus().equals(5L)) {
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

            // TODO: We do not allow refuse yet
//        if (!joinRoomReq.getAccepted()) {
//            requestUser.updateRoom(null);
//            requestUser.updateStatus(1L);
//            log.info("RoomServiceImpl_responseJoinRoom end");
//            return false;
//        } else
            if (room.getMaxMember() <= room.getHeadCount()) {
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
        }

        log.info("RoomServiceImpl_responseToJoinRoom end");
        return true;
    }

    @Transactional
    public Boolean checkAndRunIfRoomShouldStart(AuthenticatedUser authenticatedUser) {
        log.info("RoomServiceImpl_checkAndRunIfRoomShouldStart start");
        log.info("id: {}", authenticatedUser.getId());
        User user = findUserById(authenticatedUser.getId());

        Room room = user.getRoom();

        if (room.getHeadCount().equals(room.getMaxMember())) {
            startGame(room);
            log.info("RoomServiceImpl_checkAndRunIfRoomShouldStart end");
            return true;
        }

        log.info("RoomServiceImpl_checkAndRunIfRoomShouldStart end");
        return false;
    }

    @Transactional
    public Boolean checkAndStartGame(AuthenticatedUser authenticatedUser) {
        log.info("RoomServiceImpl_checkAndStartGame start");
        log.info("id: {}", authenticatedUser.getId());

        User user = findUserById(authenticatedUser.getId());

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

    @Transactional
    public RoomGetRes getRoom(Long id) {
        RoomGetRes roomGetRes = RoomGetRes.toDto(
            userRepository.findById(id).orElseThrow(UserNotFoundException::new).getRoom());
        log.info("RoomService_getRoom: {}", roomGetRes);
        return roomGetRes;
    }

    @Transactional
    public List<WaitingListRes> getWaitingList(Long userId) {
        User admin = findUserById(userId);
        Room room = admin.getRoom();
        List<User> userList = userRepository.findAllByRoomAndStatus(room, 5L);
        return WaitingListRes.listOf(userList);
    }

    //    @Transactional
//    public
    private User findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(UserNotFoundException::new);
    }

    @Transactional
    public EndDayInfoRes getEndDayInfo(Long userId) {
        User user = findUserById(userId);

        if (!user.getStatus().equals(4L)) {
            return EndDayInfoRes.noRoom().build();
        }

        Room room = user.getRoom();

        if (room == null) {
            return EndDayInfoRes.noRoom().build();
        }

        return EndDayInfoRes.builder()
            .startDate(room.getStartedAt())
            .endDate(room.getStartedAt().plusDays(room.getDuration())).build();
    }
}
