package site.gongnomok.common.member.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import site.gongnomok.common.member.dto.MemberLoginServiceDto;

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
