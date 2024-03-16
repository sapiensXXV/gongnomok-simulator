package site.gongnomok.item.domain;

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

    public static String jobToString(Job job) {
        return job.name().toLowerCase();
    }
}
