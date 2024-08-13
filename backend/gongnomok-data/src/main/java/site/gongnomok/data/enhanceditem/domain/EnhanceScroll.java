package site.gongnomok.data.enhanceditem.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.gongnomok.common.exception.ScrollException;

import java.util.Arrays;

import static site.gongnomok.common.exception.ExceptionCode.NOT_FOUND_SCROLL_NAME;

@Getter
@RequiredArgsConstructor
@Slf4j
public enum EnhanceScroll {

    TEN_PERCENT_SCROLL(1000),
    SIXTY_PERCENT_SCROLL(167),
    HUNDRED_PERCENT_SCROLL(100);
    
//    GLOVES_PHY_ATK(10, 6, 2),
//    GLOVES_SWIFT(10, 4, 2),
//    GLOVES_HEALTH(10, 4, 2),
//    HAT_SWIFT(10, 6, 2),
//    HAT_DEFENCE(10, 4, 2),
//    HAT_INTEL(10, 6, 2),
//    HAT_HEALTH(10, 4, 2),
//    OVERALL_SWIFT(10, 4, 2),
//    OVERALL_DEFENCE(10, 4, 2),
//    OVERALL_INTEL(10, 4, 2),
//    OVERALL_LUCKY(10, 4, 2),
//    OVERALL_STRENGTH(10, 6, 2),
//    TOP_DEFENCE(10, 4, 2),
//    TOP_HEALTH(10, 4, 2),
//    TOP_LUCKY(10, 6, 2),
//    TOP_STRENGTH(10, 6, 2),
//    BOTTOM_SWIFT(10, 6, 2),
//    BOTTOM_DEFENCE(10, 4, 2),
//    BOTTOM_JUMP(10, 4, 2),
//    BOTTOM_HEALTH(10, 4, 2),
//    SHOES_SWIFT(10, 4, 2),
//    SHOES_MOVE(10, 6, 2),
//    SHOES_JUMP(10, 4, 2),
//    ONE_HANDED_SWORD_PHY_ATK(10, 4, 2),
//    ONE_HANDED_SWORD_ACC(10, 6, 2),
//    ONE_HANDED_AXE_PHY_ATK(10, 4, 2),
//    ONE_HANDED_AXE_ACC(10, 6, 2),
//    ONE_HANDED_BLUNT_PHY_ATK(10, 4, 2),
//    ONE_HANDED_BLUNT_ACC(10, 6, 2),
//    TWO_HANDED_SWORD_PHY_ATK(10, 4, 2),
//    TWO_HANDED_SWORD_ACC(10, 6, 2),
//    TWO_HANDED_AXE_PHY_ATK(10, 4, 2),
//    TWO_HANDED_AXE_ACC(10, 6, 2),
//    TWO_HANDED_BLUNT_PHY_ATK(10, 4, 2),
//    TWO_HANDED_BLUNT_ACC(10, 6, 2),
//    SPEAR_PHY_ATK(10, 4, 2),
//    SPEAR_ACC(10, 6, 2),
//    POLEARM_PHY_ATK(10, 4, 2),
//    POLEARM_ACC(10, 6, 2),
//    CLAW_PHY_ATK(10, 4, 2),
//    DAGGER_PHY_ATK(10, 4, 2),
//    BOW_PHY_ATK(10, 4, 2),
//    CROSSBOW_PHY_ATK(10, 4, 2),
//    WAND_MG_ATK(10, 4, 2),
//    STAFF_MG_ATK(10, 4, 2),
//    EARRING_SWIFT(10, 6, 2),
//    EARRING_INTEL(10, 4, 2),
//    EARRING_LUCKY(10, 6, 2),
//    EARRING_HEALTH(10, 5, 2),
//    CAPE_MANA(10, 5, 2),
//    CAPE_SWIFT(10, 6, 2),
//    CAPE_INTEL(10, 6, 2),
//    CAPE_HEALTH(10, 5, 2),
//    CAPE_LUCKY(10, 6, 2),
//    CAPE_STRENGTH(10, 6, 2),
//    CAPE_MG_DEF(10, 6, 2),
//    CAPE_PHY_DEF(10, 6, 2),
//    SHIELD_DEFENCE(10, 4, 2),
//    SHIELD_HEALTH(10, 5, 2),
//    SHIELD_LUCKY(10, 6, 2),
//    SHIELD_STRENGTH(10, 6, 2);

//    private final int ten;
//    private final int sixty;
//    private final int hundred;
    
    private final int score;

    public static EnhanceScroll from(String name) {
        return Arrays.stream(EnhanceScroll.values())
            .filter((scroll) -> name.equals(scroll.name()))
            .findFirst()
            .orElseThrow(() -> new ScrollException(NOT_FOUND_SCROLL_NAME));
    }
    
    public static int calculateScore(int tenSucceed, int sixtySucceed, int hundredSucceed) {
        return TEN_PERCENT_SCROLL.getScore() * tenSucceed +
            SIXTY_PERCENT_SCROLL.getScore() * sixtySucceed +
            HUNDRED_PERCENT_SCROLL.getScore() * hundredSucceed;
    }
}
