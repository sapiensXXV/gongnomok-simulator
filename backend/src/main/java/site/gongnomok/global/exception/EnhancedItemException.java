package site.gongnomok.global.exception;


import lombok.Getter;

@Getter
public class EnhancedItemException extends RuntimeException {

    private final int code;
    private final String message;

    public EnhancedItemException(ExceptionCode exceptionCode) {
        this.code = exceptionCode.getCode();
        this.message = exceptionCode.getMessage();
    }
}
