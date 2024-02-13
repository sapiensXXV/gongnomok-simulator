package site.gongnomok.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;


@AllArgsConstructor
@Getter
@Builder
public class MemberDto {

    private String role;
    private String id;
    private String name;

}
