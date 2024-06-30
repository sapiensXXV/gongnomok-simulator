package site.gongnomok.core.banword.validator;


/**
 * @author Jaehoon So
 * @version 1.0.0
 * @date 2024-06-28
 */
public class AhoCorasickBanWordValidator implements BanWordValidator {
    @Override
    public boolean containsBanWord(String sentence) {
        return false;
    }
}
