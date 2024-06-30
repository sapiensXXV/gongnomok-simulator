package site.gongnomok.common.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;


@AllArgsConstructor
@Getter
@Builder
@ToString
public class MemberDto {

    private Long memberId;
    private String role;
    private String id;
    private String name;

}
