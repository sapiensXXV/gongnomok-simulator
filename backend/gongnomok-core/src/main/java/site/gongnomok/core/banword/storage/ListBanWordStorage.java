package site.gongnomok.core.banword.storage;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;
import site.gongnomok.core.banword.wordfilter.BanWordFilter;
import site.gongnomok.core.banword.BanWords;
import site.gongnomok.core.banword.conf.BanWordConfiguration;
import site.gongnomok.core.banword.provider.BanWordFetcher;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

/**
 * 금칙어 목록을 메모리 내에 List로 관리하는 클래스<br>
 * {@link BanWordFilter}의 구현체에서 사용할 수 있다<br>
 * {@link BanWordConfiguration} 에서 빈으로 등록할 수 있습니다.
 * @author Jaehoon So
 * @version 1.0.0
 */
@Component
public class ListBanWordStorage implements BanWordStorage {

    private BanWords banWords;
    private final BanWordFetcher wordProvider;

    public ListBanWordStorage(BanWordFetcher wordProvider) {
        this.wordProvider = wordProvider;
        this.banWords = BanWords.with(wordProvider.fetchBanWords());
    }

    @PostConstruct
    public void init() {
        List<String> words = wordProvider.fetchBanWords();
        registerBanWords(words);
    }

    @Override
    public void registerBanWords(List<String> words) {
        replaceWords(words);
    }

    @Override
    public void registerBanWords(String[] words) {
        List<String> newWords = List.of(words);
        replaceWords(newWords);
    }

    @Override
    public void addBanWord(String word) {
        List<String> addedList = Stream.concat(banWords.getList().stream(), Stream.of(word)).toList();
        banWords = BanWords.with(addedList);
    }

    @Override
    public void addBanWords(List<String> words) {
        List<String> addedList = Stream.concat(banWords.getList().stream(), words.stream()).toList();
        banWords = BanWords.with(addedList);
    }

    @Override
    public void addBanWords(String[] words) {
        List<String> addedList = Stream.concat(banWords.getList().stream(), Arrays.stream(words)).toList();
        banWords = BanWords.with(addedList);
    }

    @Override
    public List<String> getBanWords() {
        return banWords.getList();
    }

    private void replaceWords(List<String> words) {
        this.banWords = BanWords.with(words);
    }

}
