package com.sww.ddorangddorang.global.common;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    /**
     * - 200 (성공)
     *     - 200 OK: 일반적인 요청 성공시 반환함.
     *     - 201 Created: POST 요청중 실제 특정 자원의 생성이 이루어졌을 때 반환함. (Login 같은 경우는 자원 생성이 아니므로 200 OK를 반환함.)
     *     - 204 No Content: Delete 요청이 성공되었을 때 반환함.
     * - 400 (실패)
     *     - 400 Bad Request: 유효성 검사 실패시 반환함.
     *     - 401 Unauthorized: 로그인, 회원 정보 수정, 회원 탈퇴 시도시 잘못된 비밀번호를 입력했을 때 반환함.
     *     - 403 Forbidden: 인증은 되었으나, 특정 API를 수행하기 위한 권한이 없을때 반환함. (보안 문제로 404와 통합 고려)
     *     - 404 Not Found: 해당 자원이 없을 경우 반환함.
     *     - 409 Conflict: 현 서버 상태에서 수행할수 없는 경우 반환함. 특정 메세지에 대한 신고 중복, 이미 다른 방에 참가중인데 또 다른 방에 참가를 시도… 와 같은 경우
     *     - 429 Too Many Requests: 특정 행위를 짧은 시간내에 너무 많이 반복했을 경우 반환함.
     */

    /* 400 BAD_REQUEST : 잘못된 요청 */
    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
    /* 404 NOT_FOUND : Resource를 찾을 수 없음 */
    /* 409 : CONFLICT : Resource의 현재 상태와 충돌. 보통 중복된 데이터 존재 */

    UN_AUTHENTICATED(HttpStatus.UNAUTHORIZED, "인증되지 않은 접근입니다."),

    UNAUTHORIZED_ROLE(HttpStatus.UNAUTHORIZED, "현재 유저 권한으로는 접근할 수 없는 리소스 요청입니다."),

    OUT_OF_POSSESSION(HttpStatus.UNAUTHORIZED, "해당 동작의 권한이 없습니다."),

    JWT_TOKEN_EXPIRED_EXCEPTION(HttpStatus.BAD_REQUEST, "만료된 JWT 토큰입니다."),

    INVAILD_JWT_TOKEN_EXCEPTION(HttpStatus.BAD_REQUEST, "유효하지 않은 Access Token입니다"),

    REFRESH_TOKEN_NOT_MATCHED(HttpStatus.BAD_REQUEST, "유효하지 않은 Refresh Token입니다."),

    PASSWORD_NOT_MATCHED(HttpStatus.BAD_REQUEST, "비밀번호가 일치하지 않습니다."),

    IMAGE_UPLOAD_FAIL(HttpStatus.BAD_REQUEST, "이미지 업로드를 실패했습니다."),

    ALREADY_PARTICIPATING_ROOM(HttpStatus.CONFLICT, "이미 참여하고 있는 방이 있습니다."),

    INVALID_PARAMETER_VALUE(HttpStatus.BAD_REQUEST, "입력한 데이터가 올바르지 않습니다."),

    ROOM_ALREADY_FULL(HttpStatus.CONFLICT, "해당 방은 이미 허용하는 최대 인원에 도달하였습니다."),

    ONLY_ADMIN_ALLOWED(HttpStatus.FORBIDDEN, "해당 요청은 게임을 시작하지 않은 관리자만 수행할 수 있습니다."),

    ONLY_USER_ALLOWED(HttpStatus.FORBIDDEN, "해당 요청은 게임이 시작되지 않은 일반 사용자만 수행할 수 있습니다."),

    ONLY_WAITING_STATE_ALLOWED(HttpStatus.FORBIDDEN, "해당 사용자가 방 입장을 대기하는 상태가 아닙니다."),

    DATA_NOT_IN_RANGE(HttpStatus.CONFLICT, "입력한 데이터가 적절한 범위 안에 있지 않습니다."),

    PLAYERS_NOT_ENOUGH(HttpStatus.CONFLICT, "현재 참여 인원 수가 설정한 최소 인원 수와 최대 인원 수의 범위에 없습니다."),

    NO_PARTICIPATING_ROOM(HttpStatus.FORBIDDEN, "참여 중인 방이 없습니다"),

    ROOM_NOT_FOUND(HttpStatus.NOT_FOUND, "방을 찾을 수 없습니다."),

    PARTICIPANT_NOT_FOUND(HttpStatus.NOT_FOUND, "사용자의 참여 정보를 찾을 수 없습니다."),

    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 유저를 찾을 수 없습니다."),

    USER_ALREADY_EXIST(HttpStatus.FORBIDDEN, "이미 존재하는 계정입니다."),

    MISSION_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 미션을 찾을 수 없습니다."),

    MISSION_PERFORM_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 미션 수행 정보를 찾을 수 없습니다."),

    NOTE_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 노트를 찾을 수 없습니다."),

    NOTE_ACCESS_DENIED(HttpStatus.FORBIDDEN, "해당 노트에 접근할 수 없습니다."),

    MISSION_NO_MORE(HttpStatus.NOT_FOUND, "더 이상 수행할 미션이 없습니다."),

    UNEXPECTED_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "알 수 없는 오류가 발생하였습니다."),

    /**
     * 서버 에러 (서버 장애 상황)
     */
    COMMON_SYSTEM_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "시스템 오류입니다. 잠시 후 다시 이용해주세요."),

    FILE_IO_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "파일 입출력 오류입니다.");

    private final HttpStatus httpStatus;
    private final String message;

    ErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
