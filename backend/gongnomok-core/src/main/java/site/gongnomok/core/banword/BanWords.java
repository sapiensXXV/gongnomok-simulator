package site.gongnomok.core.banword;

import java.util.Collections;
import java.util.List;

public class BanWords {

    private final List<String> list;

    private BanWords(List<String> list) {
        this.list = list;
    }

    public static BanWords with(List<String> list) {
        return new BanWords(list);
    }

    public static BanWords empty() {
        return new BanWords(List.of());
    }

    public List<String> getList() {
        return Collections.unmodifiableList(list);
    }

}
