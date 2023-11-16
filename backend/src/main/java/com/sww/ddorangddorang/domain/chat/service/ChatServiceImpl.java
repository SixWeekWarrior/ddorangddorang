package com.sww.ddorangddorang.domain.chat.service;

import com.sww.ddorangddorang.domain.chat.dto.ChatMessagePostReq;
import com.sww.ddorangddorang.domain.chat.dto.ChatMessageRes;
import com.sww.ddorangddorang.domain.chat.dto.ChatroomRes;
import com.sww.ddorangddorang.domain.chat.dto.GetChatRes;
import com.sww.ddorangddorang.domain.chat.entity.Chat;
import com.sww.ddorangddorang.domain.chat.entity.ChatMessage;
import com.sww.ddorangddorang.domain.chat.repository.ChatMessageRepository;
import com.sww.ddorangddorang.domain.chat.repository.ChatRepository;
import com.sww.ddorangddorang.domain.participant.entity.Participant;
import com.sww.ddorangddorang.domain.participant.repository.ParticipantRepository;
import com.sww.ddorangddorang.domain.user.entity.User;
import com.sww.ddorangddorang.domain.user.exception.UserNotFoundException;
import com.sww.ddorangddorang.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
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
    private final ChatMessageRepository chatMessageRepository;
    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;

    public List<GetChatRes> getChat(Long userId) {
        List<GetChatRes> getChatResList=new LinkedList<>();

        return null;
    }

    public ChatroomRes getChatroom(Long userId) {
        Participant participant = getParticipant(userId);

        Participant manito = participant.getManito();
        Participant maniti = participant.getManiti();

        Chat manitoChat = chatRepository.findByManito(participant)
            .orElse(Chat.builder().manito(participant).maniti(maniti).build());

        chatRepository.save(manitoChat);

        Chat manitiChat = chatRepository.findByManiti(participant)
            .orElse(Chat.builder().manito(manito).maniti(participant).build());

        chatRepository.save(manitiChat);

        return ChatroomRes.builder().manitiChatRoomId(manitiChat.getId()).manitoChatRoomId(
            manitoChat.getId()).build();
    }

    public List<ChatMessageRes> getChatMessageList(Long chatRoomId, Long userId) {
        Participant participant = getParticipant(userId);

        Chat chat = chatRepository.findById(chatRoomId).orElseThrow(UserNotFoundException::new);

        if (!chat.getManito().equals(participant) && !chat.getManiti().equals(participant)) {
            throw new UserNotFoundException();
        }

        List<ChatMessage> chatMessages = chatMessageRepository.findByChat(chat);
        return ChatMessageRes.listOf(chatMessages, participant.getId());
    }

    public void postChatMessage(ChatMessagePostReq chatMessagePostReq, Long userId) {
        Participant participant = getParticipant(userId);

        Chat chat = chatRepository.findById(chatMessagePostReq.getChatRoomId())
            .orElseThrow(UserNotFoundException::new);

        if (!chat.getManito().equals(participant) && !chat.getManiti().equals(participant)) {
            throw new UserNotFoundException();
        }

        ChatMessage chatMessage = ChatMessage.builder().chat(chat).sender(participant).content(
            chatMessagePostReq.getContent()).build();

        chatMessageRepository.save(chatMessage);
    }

    private Participant getParticipant(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(UserNotFoundException::new);

        return participantRepository.findByUserAndGameCount(user,
            user.getGameCount()).orElseThrow(UserNotFoundException::new);
    }
}
