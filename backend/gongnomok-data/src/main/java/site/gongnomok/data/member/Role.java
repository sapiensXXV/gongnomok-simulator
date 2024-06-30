package site.gongnomok.data.member;

public enum Role {
    GUEST,USER,ADMIN;

    public String makeLowerString() {
        return this.toString().toLowerCase();
    }
}
