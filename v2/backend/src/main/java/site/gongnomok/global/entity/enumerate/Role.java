package site.gongnomok.global.entity.enumerate;

public enum Role {
    USER,ADMIN;

    public String makeLowerString() {
        return this.toString().toLowerCase();
    }
}
