package com.sww.ddorangddorang.domain.chat.service;

import com.sww.ddorangddorang.domain.chat.dto.ChatMessagePostReq;
import com.sww.ddorangddorang.domain.chat.dto.ChatMessageRes;
import com.sww.ddorangddorang.domain.chat.dto.ChatroomRes;
import java.util.List;

public interface ChatService {

    ChatroomRes getChatroom(Long userId);

    List<ChatMessageRes> getChatMessageList(Long chatRoomId, Long userId);

    void postChatMessage(ChatMessagePostReq chatMessagePostReq, Long userId);

}
