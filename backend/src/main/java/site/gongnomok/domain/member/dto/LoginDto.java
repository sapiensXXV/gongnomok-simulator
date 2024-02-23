package site.gongnomok.domain.member.dto;

import lombok.*;
import site.gongnomok.domain.member.service.dto.MemberLoginServiceDto;

@NoArgsConstructor
@Getter @Setter
@ToString
public class LoginDto {

    private String id;
    private String password;

    public MemberLoginServiceDto toServiceDto() {
        return MemberLoginServiceDto.builder()
            .id(id)
            .password(password)
            .build();
    }
}
