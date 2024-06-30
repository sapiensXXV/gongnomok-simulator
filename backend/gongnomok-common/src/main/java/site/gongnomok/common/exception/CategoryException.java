package site.gongnomok.common.exception;


import lombok.Getter;

@Getter
public class CategoryException extends RuntimeException{
    private final int code;
    private final String message;

    public CategoryException(ExceptionCode exceptionCode) {
        this.code = exceptionCode.getCode();
        this.message = exceptionCode.getMessage();
    }
}
