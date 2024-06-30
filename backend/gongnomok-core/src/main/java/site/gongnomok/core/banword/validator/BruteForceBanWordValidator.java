package site.gongnomok.core.banword.validator;


import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import site.gongnomok.core.banword.storage.BanWordStorage;

import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class BruteForceBanWordValidator implements BanWordValidator {

    private final BanWordStorage storage;

    @Override
    public boolean containsBanWord(String sentence) {
        List<String> banWords = storage.getBanWords();

        Optional<String> findBanWord = banWords.stream()
            .filter(sentence::contains)
            .findAny();

        return findBanWord.isPresent();
    }
}
