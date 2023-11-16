package com.sww.ddorangddorang.domain.chat.api;

import com.sww.ddorangddorang.auth.dto.AuthenticatedUser;
import com.sww.ddorangddorang.domain.chat.dto.ChatMessagePostReq;
import com.sww.ddorangddorang.domain.chat.dto.ChatMessageRes;
import com.sww.ddorangddorang.domain.chat.dto.ChatRes;
import com.sww.ddorangddorang.domain.chat.dto.ChatroomRes;
import com.sww.ddorangddorang.domain.chat.dto.GetChatRes;
import com.sww.ddorangddorang.domain.chat.dto.SendChatPostReq;
import com.sww.ddorangddorang.domain.chat.service.ChatService;
import com.sww.ddorangddorang.global.common.CommonResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatApi {

    private final ChatService chatService;
    private final String SUCCESS = "SUCCESS";

    @GetMapping
    public CommonResponse<List<GetChatRes>> getChat(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("ChapApi_getChat start");
        List<GetChatRes> getChatResList = chatService.getChat(authenticatedUser.getId());
        log.info("ChapApi_getChat end");
        return CommonResponse.success(getChatResList);
    }

    @GetMapping("/manito")
    public CommonResponse<List<ChatRes>> chatListWithManito(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("ChatApi_chatListWithManito start");
        List<ChatRes> chatResList = chatService.getAllChatList(authenticatedUser.getId(), false);
        log.info("ChatApi_chatListWithManito end");
        return CommonResponse.success(chatResList);
    }

    @GetMapping("/maniti")
    public CommonResponse<List<ChatRes>> chatListWithManiti(
        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
        log.info("ChatApi_chatListWithManiti start");
        List<ChatRes> chatResList = chatService.getAllChatList(authenticatedUser.getId(), true);
        log.info("ChatApi_chatListWithManiti end");
        return CommonResponse.success(chatResList);
    }

    @PostMapping
    public CommonResponse<String> sendChat(@AuthenticationPrincipal AuthenticatedUser authenticatedUser, @RequestBody
        SendChatPostReq sendChatPostReq) {
        log.info("ChatApi_sendChat start");
        chatService.sendChat(authenticatedUser.getId(), sendChatPostReq);
        log.info("ChatApi_sendChat end");
        return CommonResponse.success(SUCCESS);
    }
//    @GetMapping
//    public CommonResponse<ChatroomRes> getChatroom(
//        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
//        log.info("getChatroom Controller 진입");
//        return CommonResponse.success(chatService.getChatroom(authenticatedUser.getId()));
//    }
//
//    @GetMapping("/{chatRoomId}/messages")
//    public CommonResponse<List<ChatMessageRes>> getChatMessageList(@PathVariable Long chatRoomId,
//        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
//        log.info("getChatMessageList Controller 진입");
//        return CommonResponse.success(
//            chatService.getChatMessageList(chatRoomId, authenticatedUser.getId()));
//    }
//
//    @PostMapping
//    public CommonResponse<String> postChatMessage(
//        @RequestBody ChatMessagePostReq chatMessagePostReq,
//        @AuthenticationPrincipal AuthenticatedUser authenticatedUser) {
//        log.info("postChatMessage Controller 진입");
//        chatService.postChatMessage(chatMessagePostReq, authenticatedUser.getId());
//        return CommonResponse.success("SUCCESS");
//    }

}
