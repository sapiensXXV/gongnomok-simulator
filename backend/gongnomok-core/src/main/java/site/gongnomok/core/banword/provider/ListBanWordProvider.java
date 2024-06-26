package site.gongnomok.core.banword.provider;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import site.gongnomok.data.banword.domain.repository.BanWordRepository;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ListBanWordProvider implements BanWordProvider {

    private final BanWordRepository repository;

    @Override
    public List<String> provideBanWords() {
        return new ArrayList<>();
    }
}
