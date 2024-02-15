package site.gongnomok.global.entity.enumerate;

import java.util.Arrays;

public enum AttackSpeed {
    VERY_SLOW,
    SLOW,
    NORMAL,
    FAST,
    VERY_FAST;

    public static AttackSpeed stringToAttackSpeed(String data) {
        return Arrays.stream(values())
                .filter((value) -> {
                    return value.name().equals(data);
                })
                .findAny()
                .orElseThrow(RuntimeException::new);
    }
}
