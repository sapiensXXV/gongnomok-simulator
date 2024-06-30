package site.gongnomok.common.exception;


import lombok.Getter;

@Getter
public class ScrollException extends RuntimeException {
    private final int code;
    private final String message;

    public ScrollException(final ExceptionCode exceptionCode) {
        this.code = exceptionCode.getCode();
        this.message = exceptionCode.getMessage();
    }
}
