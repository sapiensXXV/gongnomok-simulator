package site.gongnomok.member.dto;

import lombok.*;

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
