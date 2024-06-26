package site.gongnomok.core.banword.validator;


//@Component
public class AhoCorasickBanWordValidator implements BanWordValidator {
    @Override
    public boolean containsBannedWord(String sentence) {
        return false;
    }
}
