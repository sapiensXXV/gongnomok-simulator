package site.gongnomok.global.exception;


import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ExceptionCode {

    NOT_FOUND_MEMBER_ID(1000, "요청한 ID에 해당하는 사용자가 존재하지 않습니다."),
    NOT_FOUND_ITEM_ID(1001, "요청한 ID에 해당하는 아이템이 존재하지 않습니다."),
    NOT_FOUND_ENHANCED_ID(1002, "요청한 ID에 해당하는 도전기록이 존재하지 않습니다."),
    NOT_FOUND_COMMENT_ID(1003, "요청한 ID에 해당하는 댓글이 존재하지 않습니다."),
    NOT_FOUND_CATEGORY_NAME(1005, "요청한 이름에 해당하는 카테고리가 존재하지 않습니다."),

    INVALID_USER_NAME(2000, "존재하지 않는 사용자 입니다."),
    INVALID_PASSWORD(2001, "비밀번호가 일치하지 않습니다.");

    private final int code;
    private final String message;

}
