package site.gongnomok.common.enhanceditem.dto;

import site.gongnomok.common.exception.CategoryException;
import site.gongnomok.common.exception.ExceptionCode;

import java.util.Arrays;

public enum ValidationCategory {

    HAT(7, 9), // 모자
    GLOVES(5, 9), // 장갑
    SHOES(5, 9), // 신발
    OVERALL(10, 9), // 전신
    TOP(7, 9), // 상의
    BOTTOM(7, 9), // 하의
    SHIELD(7, 9), // 방패
    EARRING(5, 9), // 귀고리
    CAPE(5, 9), // 망토
    ONE_HANDED_SWORD(7, 11), // 한손검
    TWO_HANDED_SWORD(7, 11), // 두손검
    ONE_HANDED_AXE(7, 11), // 한손도끼
    TWO_HANDED_AXE(7, 11), // 두손도끼
    ONE_HANDED_BLUNT(7, 11), // 한손둔기
    TWO_HANDED_BLUNT(7, 11), // 두손둔기
    SPEAR(7, 11), // 창
    POLEARM(7, 11), // 폴암
    BOW(7, 9), // 활
    CROSSBOW(7, 9), // 석궁
    CLAW(7, 9), // 아대
    DAGGER(7, 9), // 단검
    WAND(7, 9), // 완드
    STAFF(7, 9); // 스태프

    private final int upgradableCount;
    private final int singleUpgradableValue;

    ValidationCategory(int upgradableCount, int singleUpgradableValue) {
        this.upgradableCount = upgradableCount;
        this.singleUpgradableValue = singleUpgradableValue;
    }

    public int getUpgradableCount() {
        return upgradableCount;
    }

    public static ValidationCategory findWithName(String name) {
        return Arrays
            .stream(values())
            .filter(value -> value.name().equals(name))
            .findAny()
            .orElseThrow(() -> new CategoryException(ExceptionCode.NOT_FOUND_CATEGORY_NAME));
    }
}
