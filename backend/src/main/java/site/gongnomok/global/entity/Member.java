package site.gongnomok.global.entity;

import jakarta.persistence.*;
import lombok.*;
import site.gongnomok.global.entity.enumerate.Role;


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

}
