package site.gongnomok.api.exhandler.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public final class ErrorResponse {

    private final int code;
    private final String message;

}
