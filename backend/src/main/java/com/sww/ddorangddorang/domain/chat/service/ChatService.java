package com.sww.ddorangddorang.domain.chat.service;

import com.sww.ddorangddorang.domain.chat.dto.ChatMessagePostReq;
import com.sww.ddorangddorang.domain.chat.dto.ChatMessageRes;
import com.sww.ddorangddorang.domain.chat.dto.ChatRes;
import com.sww.ddorangddorang.domain.chat.dto.ChatroomRes;
import com.sww.ddorangddorang.domain.chat.dto.GetChatRes;
import com.sww.ddorangddorang.domain.chat.dto.SendChatPostReq;
import java.util.List;

public interface ChatService {

    ChatroomRes getChatroom(Long userId);

    List<ChatMessageRes> getChatMessageList(Long chatRoomId, Long userId);

    void postChatMessage(ChatMessagePostReq chatMessagePostReq, Long userId);

    List<GetChatRes> getChat(Long userId);

    List<ChatRes> getAllChatList(Long userId, Boolean isManito);

    void sendChat(Long userId, SendChatPostReq sendChatPostReq);

}
