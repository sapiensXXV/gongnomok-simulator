package site.gongnomok.common.exception;

public class BanWordException extends RuntimeException {

    private final int code;
    private final String message;

    public BanWordException(ExceptionCode exceptionCode) {
        this.code = exceptionCode.getCode();
        this.message = exceptionCode.getMessage();
    }
}
