package site.gongnomok.member.domain;

public enum Role {
    USER,ADMIN;

    public String makeLowerString() {
        return this.toString().toLowerCase();
    }
}
