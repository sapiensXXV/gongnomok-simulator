package site.gongnomok.core.banword.provider;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import site.gongnomok.data.banword.domain.BanWord;
import site.gongnomok.data.banword.domain.repository.BanWordRepository;

import java.util.List;

/**
 * @author Jaehoon So
 * @version 1.0.0
 */
@Component
@RequiredArgsConstructor
public class ListBanWordFetcher implements BanWordFetcher {

    private final BanWordRepository repository;

    @Override
    public List<String> fetchBanWords() {
        return repository.findAll()
            .stream()
            .map(BanWord::getWord)
            .toList();
    }
}
