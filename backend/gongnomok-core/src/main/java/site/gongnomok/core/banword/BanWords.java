package site.gongnomok.core.banword;

import lombok.Getter;

import java.util.Collections;
import java.util.List;

@Getter
public class BanWords {

    private final List<String> list;

    private BanWords(List<String> list) {
        this.list = list;
    }

    public static BanWords with(List<String> list) {
        return new BanWords(Collections.unmodifiableList(list));
    }

    public static BanWords empty() {
        return new BanWords(Collections.unmodifiableList(List.of()));
    }
}
