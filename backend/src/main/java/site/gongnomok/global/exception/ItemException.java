package site.gongnomok.global.exception;


import lombok.Getter;

@Getter
public class ItemException extends RuntimeException {

    private final int code;
    private final String message;

    public ItemException(ExceptionCode exceptionCode) {
        this.code = exceptionCode.getCode();
        this.message = exceptionCode.getMessage();
    }
}
