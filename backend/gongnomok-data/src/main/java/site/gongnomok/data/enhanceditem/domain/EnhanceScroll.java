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
    GLOVES_PHY_ATK,
    GLOVES_SWIFT,
    GLOVES_HEALTH,
    
    HAT_SWIFT,
    HAT_DEFENCE,
    HAT_INTEL,
    HAT_HEALTH,
    
    OVERALL_SWIFT,
    OVERALL_DEFENCE,
    OVERALL_INTEL,
    OVERALL_LUCKY,
    OVERALL_STRENGTH,
    
    TOP_DEFENCE,
    TOP_HEALTH,
    TOP_LUCKY,
    TOP_STRENGTH,
    
    BOTTOM_SWIFT,
    BOTTOM_DEFENCE,
    BOTTOM_JUMP,
    BOTTOM_HEALTH,
    
    SHOES_SWIFT,
    SHOES_MOVE,
    SHOES_JUMP,
    
    ONE_HANDED_SWORD_PHY_ATK,
    ONE_HANDED_SWORD_ACC,
    ONE_HANDED_AXE_PHY_ATK,
    ONE_HANDED_AXE_ACC,
    ONE_HANDED_BLUNT_PHY_ATK,
    ONE_HANDED_BLUNT_ACC,
    TWO_HANDED_SWORD_PHY_ATK,
    TWO_HANDED_SWORD_ACC,
    TWO_HANDED_AXE_PHY_ATK,
    TWO_HANDED_AXE_ACC,
    TWO_HANDED_BLUNT_PHY_ATK,
    TWO_HANDED_BLUNT_ACC,
    SPEAR_PHY_ATK,
    SPEAR_ACC,
    POLEARM_PHY_ATK,
    POLEARM_ACC,
    
    CLAW_PHY_ATK,
    DAGGER_PHY_ATK,
    
    BOW_PHY_ATK,
    CROSSBOW_PHY_ATK,
    
    WAND_MG_ATK,
    STAFF_MG_ATK,
    
    EARRING_SWIFT,
    EARRING_INTEL,
    EARRING_LUCKY,
    EARRING_HEALTH,
    
    CAPE_MANA,
    CAPE_SWIFT,
    CAPE_INTEL,
    CAPE_HEALTH,
    CAPE_LUCKY,
    CAPE_STRENGTH,
    CAPE_MG_DEF,
    CAPE_PHY_DEF,
    
    SHIELD_DEFENCE,
    SHIELD_HEALTH,
    SHIELD_LUCKY,
    SHIELD_STRENGTH;

    public static EnhanceScroll from(String name) {
//        log.info("scroll-name: {}", name);
        return Arrays.stream(EnhanceScroll.values())
            .filter((scroll) -> name.equals(scroll.name()))
            .findFirst()
            .orElseThrow(() -> new ScrollException(NOT_FOUND_SCROLL_NAME));
    }
}
