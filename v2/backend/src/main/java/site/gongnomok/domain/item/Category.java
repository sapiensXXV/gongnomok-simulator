package site.gongnomok.domain.item;

public enum Category {
    HAT, // 모자
    GLOVES, // 장갑
    SHOES, // 신발
    OVERALL, // 전신
    TOP, // 상의
    BOTTOM, // 하의
    SHIELD, // 방패
    EARRING, // 귀고리
    CAPE; // 망토

    public static String makeString(Category category) {
        return category.name().toLowerCase();
    }

}
