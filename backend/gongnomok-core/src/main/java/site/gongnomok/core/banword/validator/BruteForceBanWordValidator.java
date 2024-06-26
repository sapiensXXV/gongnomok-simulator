package site.gongnomok.core.banword.validator;


import org.springframework.stereotype.Component;

@Component
public class BruteForceBanWordValidator implements BanWordValidator {
    @Override
    public boolean containsBannedWord(String sentence) {
        return false;
    }
}
