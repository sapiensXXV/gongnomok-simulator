package site.gongnomok.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthCheckResponse {

    private final String role;
}
