package site.gongnomok.data.member;

import jakarta.persistence.*;
import lombok.*;
import site.gongnomok.common.member.dto.request.MemberDto;


@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@ToString
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;
    private String name;
    private String id;
    private String password;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    public MemberDto toDto() {
        return MemberDto.builder()
            .memberId(memberId)
            .role(role.name())
            .id(id)
            .name(name)
            .build();
    }

}
