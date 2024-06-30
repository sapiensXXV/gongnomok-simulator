package site.gongnomok.data.item.domain;

import java.util.Arrays;

public enum AttackSpeed {
    NONE,
    VERY_SLOW,
    SLOW,
    NORMAL,
    FAST,
    VERY_FAST;

    public static AttackSpeed from(String data) {
        if (data == null) return NONE;
        return Arrays.stream(values())
                .filter((value) -> {
                    return value.name().equals(data);
                })
                .findAny()
                .orElseThrow(RuntimeException::new);
    }
}
