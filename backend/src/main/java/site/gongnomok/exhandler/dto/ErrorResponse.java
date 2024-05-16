package site.gongnomok.exhandler.dto;


import lombok.Getter;

@Getter
public final class ErrorResponse {

    private final int code;
    private final String message;

    private ErrorResponse(
        final int code,
        final String message
    ) {
        this.code = code;
        this.message = message;
    }

    public static ErrorResponse of(
        final int code,
        final String message
    ) {
        return new ErrorResponse(code, message);
    }

}
