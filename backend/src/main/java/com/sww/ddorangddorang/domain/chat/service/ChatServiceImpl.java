package com.sww.ddorangddorang.domain.chat.service;

import com.sww.ddorangddorang.domain.chat.dto.ChatMessagePostReq;
import com.sww.ddorangddorang.domain.chat.dto.ChatMessageRes;
import com.sww.ddorangddorang.domain.chat.dto.ChatRes;
import com.sww.ddorangddorang.domain.chat.dto.ChatroomRes;
import com.sww.ddorangddorang.domain.chat.dto.GetChatRes;
import com.sww.ddorangddorang.domain.chat.dto.SendChatPostReq;
import com.sww.ddorangddorang.domain.chat.entity.Chat;
import com.sww.ddorangddorang.domain.chat.entity.ChatMessage;
import com.sww.ddorangddorang.domain.chat.repository.ChatMessageRepository;
import com.sww.ddorangddorang.domain.chat.repository.ChatRepository;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import com.sww.ddorangddorang.domain.participant.exception.ParticipantNotFoundException;
import com.sww.ddorangddorang.domain.participant.repository.ParticipantRepository;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.exception.UserNotFoundException;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Transactional
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;
//    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;

    @Transactional
    public List<GetChatRes> getChat(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Participant participant = participantRepository.findByUserAndGameCount(user,
            user.getGameCount()).orElseThrow(
            ParticipantNotFoundException::new);
        List<GetChatRes> getChatResList = new LinkedList<>();
        List<Chat> asManito = chatRepository.findAllByManitoAndDeletedAtIsNotNull(participant);
        List<Chat> asManiti = chatRepository.findAllByManitiAndDeletedAtIsNotNull(participant);

        GetChatRes manitoChat = GetChatRes.builder().isFromManito(true)
            .lastContent((asManito == null || asManito.isEmpty()) ? null : asManito.get(asManito.size() - 1).getContent())
            .build();
        GetChatRes manitiChat = GetChatRes.builder().isFromManito(false)
            .lastContent((asManiti == null || asManiti.isEmpty()) ? null : asManiti.get(asManiti.size() - 1).getContent())
            .build();

        if ((asManito == null || asManito.isEmpty()) && (asManiti == null || asManiti.isEmpty())) {
            getChatResList.add(manitoChat);
            getChatResList.add(manitiChat);
        } else if (asManito == null || asManito.isEmpty()) {
            getChatResList.add(manitiChat);
            getChatResList.add(manitoChat);
        } else if (asManiti == null || asManiti.isEmpty()) {
            getChatResList.add(manitoChat);
            getChatResList.add(manitiChat);
        } else {
            if (asManito.get(asManito.size() - 1).getCreatedAt()
                .isBefore(asManiti.get(asManiti.size() - 1).getCreatedAt())) {
                getChatResList.add(manitiChat);
                getChatResList.add(manitoChat);
            } else {
                getChatResList.add(manitoChat);
                getChatResList.add(manitiChat);
            }
        }

        return getChatResList;
    }

    @Transactional
    public List<ChatRes> getAllChatList(Long userId, Boolean isManito) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Participant participant = participantRepository.findByUserAndGameCount(user,
            user.getGameCount()).orElseThrow(ParticipantNotFoundException::new);

        List<Chat> chatList;

        if (isManito) {
            chatList = chatRepository.findAllByManitoAndDeletedAtIsNotNull(participant);
        } else {
            chatList = chatRepository.findAllByManitiAndDeletedAtIsNotNull(participant);
        }

        List<ChatRes> chatResList = new LinkedList<>();
        for (Chat chat : chatList) {
            ChatRes chatRes = ChatRes.builder()
                .isSentByMe(isManito ? chat.getIsSentByManito() : !chat.getIsSentByManito())
                .content(chat.getContent()).build();
            chatResList.add(chatRes);
        }

        return chatResList;
    }

    @Transactional
    public void sendChat(Long userId, SendChatPostReq sendChatPostReq) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);
        Participant participant = participantRepository.findByUserAndGameCount(user,
            user.getGameCount()).orElseThrow(ParticipantNotFoundException::new);

        Chat chat = Chat.builder().participant(participant)
            .isSentByManito(!sendChatPostReq.getIsSentToManito())
            .content(sendChatPostReq.getContent()).build();
        chatRepository.save(chat);
    }

    public ChatroomRes getChatroom(Long userId) {
//        Participant participant = getParticipant(userId);
//
//        Participant manito = participant.getManito();
//        Participant maniti = participant.getManiti();
//
//        Chat manitoChat = chatRepository.findByManito(participant)
//            .orElse(Chat.builder().manito(participant).maniti(maniti).build());
//
//        chatRepository.save(manitoChat);
//
//        Chat manitiChat = chatRepository.findByManiti(participant)
//            .orElse(Chat.builder().manito(manito).maniti(participant).build());
//
//        chatRepository.save(manitiChat);
//
//        return ChatroomRes.builder().manitiChatRoomId(manitiChat.getId()).manitoChatRoomId(
//            manitoChat.getId()).build();
        return null;
    }

    public List<ChatMessageRes> getChatMessageList(Long chatRoomId, Long userId) {
//        Participant participant = getParticipant(userId);
//
//        Chat chat = chatRepository.findById(chatRoomId).orElseThrow(UserNotFoundException::new);
//
//        if (!chat.getManito().equals(participant) && !chat.getManiti().equals(participant)) {
//            throw new UserNotFoundException();
//        }
//
//        List<ChatMessage> chatMessages = chatMessageRepository.findByChat(chat);
//        return ChatMessageRes.listOf(chatMessages, participant.getId());
        return null;
    }

    public void postChatMessage(ChatMessagePostReq chatMessagePostReq, Long userId) {
//        Participant participant = getParticipant(userId);
//
//        Chat chat = chatRepository.findById(chatMessagePostReq.getChatRoomId())
//            .orElseThrow(UserNotFoundException::new);
//
//        if (!chat.getManito().equals(participant) && !chat.getManiti().equals(participant)) {
//            throw new UserNotFoundException();
//        }
//
//        ChatMessage chatMessage = ChatMessage.builder().chat(chat).sender(participant).content(
//            chatMessagePostReq.getContent()).build();
//
//        chatMessageRepository.save(chatMessage);
    }

    private Participant getParticipant(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        return participantRepository.findByUserAndGameCount(user,
            user.getGameCount()).orElseThrow(UserNotFoundException::new);
    }
}
