package site.gongnomok.auth.domain;


import lombok.Getter;

import static site.gongnomok.auth.domain.Authority.*;

@Getter
public class Accessor {

    private final Long memberId;
    private final Authority authority;

    private Accessor(Long memberId, Authority authority) {
        this.memberId = memberId;
        this.authority = authority;
    }

    public static Accessor guest() {
        return new Accessor(0L, GUEST);
    }

    public static Accessor member(final Long memberId) {
        return new Accessor(memberId, MEMBER);
    }

    public static Accessor admin(final Long memberId) {
        return new Accessor(memberId, ADMIN);
    }

    public static Accessor master(final Long memberId) {
        return new Accessor(memberId, MASTER);
    }

    public boolean isMember() {
        return MEMBER.equals(authority);
    }

    public boolean isAdmin() {
        return ADMIN.equals(authority);
    }

    public boolean isMaster() {
        return MASTER.equals(authority);
    }

}
