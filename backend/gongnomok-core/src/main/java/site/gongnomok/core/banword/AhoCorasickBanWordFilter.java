package site.gongnomok.core.banword;

import org.springframework.stereotype.Service;

@Service
public class AhoCorasickBanWordFilter implements BanWordFilter {
    @Override
    public boolean checkContainBanWord(String sentence) {
        return false;
    }
}
