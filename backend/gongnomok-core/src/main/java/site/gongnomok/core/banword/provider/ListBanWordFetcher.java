package site.gongnomok.core.banword.provider;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import site.gongnomok.data.banword.domain.BanWord;
import site.gongnomok.data.banword.domain.repository.BanWordRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ListBanWordFetcher implements BanWordFetcher {

    private final BanWordRepository repository;

    @Override
    public List<String> provideBanWords() {
        return repository.findAll()
            .stream()
            .map(BanWord::getWord)
            .toList();
    }
}
