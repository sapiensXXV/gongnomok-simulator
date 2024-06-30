package site.gongnomok.common.member.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class MemberLoginServiceDto {
    private String id;
    private String password;
}
