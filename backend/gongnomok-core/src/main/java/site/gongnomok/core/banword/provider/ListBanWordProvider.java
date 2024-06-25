package site.gongnomok.core.banword.provider;

import java.util.ArrayList;
import java.util.List;

public class ListBanWordProvider implements BanWordProvider {
    @Override
    public List<String> provideBanWords() {
        return new ArrayList<>();
    }
}
