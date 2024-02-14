package site.gongnomok.global.entity.enumerate;

import java.util.Arrays;

public enum Job {
    WARRIOR,BOWMAN,MAGICIAN,THIEF,COMMON;

    public static Job stringToJob(String data) {
        return Arrays.stream(values())
                .filter(status -> {
                    return status.name().equals(data);
                })
                .findAny()
                .orElseThrow(RuntimeException::new);
    }
}
