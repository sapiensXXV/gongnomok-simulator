package site.gongnomok.common.global.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class ExceptionResponse {
    private final String message;
    
    public static ExceptionResponse message(String message) {
        return new ExceptionResponse(message);
    }
}
