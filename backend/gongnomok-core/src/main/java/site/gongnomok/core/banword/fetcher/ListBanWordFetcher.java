package site.gongnomok.core.banword.fetcher;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import site.gongnomok.data.banword.domain.BanWord;
import site.gongnomok.data.banword.domain.repository.BanWordRepository;

import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * @author Jaehoon So
 * @version 1.0.0
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class ListBanWordFetcher implements BanWordFetcher {

    private final BanWordRepository repository;

    @Override
    @Scheduled(
        fixedDelayString = "${gongnomok.banword.polling.refreshMinutes}",
        timeUnit = TimeUnit.MINUTES)

    public List<String> fetchBanWords() {

        log.info("fetchBanWords 메서드 실행");

        List<String> list = repository.findAll()
            .stream()
            .map(BanWord::getWord)
            .toList();
        log.info("금칙어 목록모음: {}", String.join(",", list));
        return list;
    }

}
