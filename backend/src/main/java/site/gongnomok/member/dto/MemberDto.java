package site.gongnomok.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;


@AllArgsConstructor
@Getter
@Builder
@ToString
public class MemberDto {

    private String role;
    private String id;
    private String name;

}
