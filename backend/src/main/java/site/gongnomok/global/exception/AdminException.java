package site.gongnomok.global.exception;


import lombok.Getter;

@Getter
public class AdminException extends RuntimeException {

    private final int code;
    private final String message;

    public AdminException(ExceptionCode exceptionCode) {
        this.code = exceptionCode.getCode();
        this.message = exceptionCode.getMessage();
    }
}
