package site.gongnomok.core.banword;

public class AhoCorasickBanWordFilter implements BanWordFilter {
    @Override
    public boolean checkContainBanWord(String sentence) {
        return false;
    }
}
