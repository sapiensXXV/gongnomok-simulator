package site.gongnomok.common.exception;


import lombok.Getter;

@Getter
public class IncludeBanWordException extends RuntimeException {
    private final int code;
    private final String message;

    public IncludeBanWordException(ExceptionCode exceptionCode) {
        this.code = exceptionCode.getCode();
        this.message = exceptionCode.getMessage();
    }
}
