package site.gongnomok.common.exception;


import lombok.Getter;

@Getter
public class CommentException extends RuntimeException {

    private final int code;
    private final String message;

    public CommentException(ExceptionCode exceptionCode) {
        this.code = exceptionCode.getCode();
        this.message = exceptionCode.getMessage();
    }
}
