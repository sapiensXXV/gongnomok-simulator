package site.gongnomok.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import site.gongnomok.member.domain.Member;


@AllArgsConstructor
@Getter
@Builder
@ToString
public class MemberDto {

    private Long memberId;
    private String role;
    private String id;
    private String name;

    public static MemberDto from(Member member) {
        return MemberDto.builder()
            .memberId(member.getMemberId())
            .role(member.getRole().name())
            .id(member.getId())
            .name(member.getName())
            .build();
    }

}
