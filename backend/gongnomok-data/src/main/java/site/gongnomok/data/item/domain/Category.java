package site.gongnomok.data.item.domain;

import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;

@Slf4j
public enum Category {
    ALL, // 전체
    HAT, // 모자
    GLOVES, // 장갑
    SHOES, // 신발
    OVERALL, // 전신
    TOP, // 상의
    BOTTOM, // 하의
    SHIELD, // 방패
    EARRING, // 귀고리
    CAPE, // 망토
    ONE_HANDED_SWORD, // 한손검
    TWO_HANDED_SWORD, // 두손검
    ONE_HANDED_AXE, // 한손도끼
    TWO_HANDED_AXE, // 두손도끼
    ONE_HANDED_BLUNT, // 한손둔기
    TWO_HANDED_BLUNT, // 두손둔기
    SPEAR, // 창
    POLEARM, // 폴암
    BOW, // 활
    CROSSBOW, // 석궁
    CLAW, // 아대
    DAGGER, // 단검
    WAND, // 완드
    STAFF, // 스태프
    PENDANT; // 펜던트

    public static Category from(String data) {
        if (data == null || ALL.name().equals(data.toUpperCase())) return null;
        return Arrays.stream(values())
                .filter(value -> {
                    return value.name().equals(data);
                })
                .findAny()
                .orElseThrow(RuntimeException::new);
    }

}
