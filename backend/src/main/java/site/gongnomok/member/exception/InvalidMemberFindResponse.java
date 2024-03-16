package site.gongnomok.member.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InvalidMemberFindResponse {
    private String message;
}
