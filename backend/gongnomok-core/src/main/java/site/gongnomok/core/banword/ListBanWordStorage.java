package site.gongnomok.core.banword;

import jakarta.annotation.PostConstruct;
import site.gongnomok.core.banword.conf.BanWordConfiguration;
import site.gongnomok.core.banword.provider.BanWordProvider;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 금칙어 목록을 메모리 내에 List로 관리하는 클래스<br>
 * {@link BanWordFilter}의 구현체에서 사용할 수 있다<br>
 * {@link BanWordConfiguration} 에서 빈으로 등록할 수 있습니다.
 * @author Jaehoon So
 * @version 1.0.0
 */
public class ListBanWordStorage implements BanWordStorage {

    private final List<String> banWords;
    private final BanWordProvider wordProvider;

    public ListBanWordStorage(BanWordProvider wordProvider) {
        this.wordProvider = wordProvider;
        this.banWords = new ArrayList<>();
    }

    @PostConstruct
    public void init() {
        List<String> words = wordProvider.provideBanWords();
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
        banWords.add(word);
    }

    @Override
    public void addBanWords(String[] words) {
        List<String> newWords = List.of(words);
        banWords.addAll(newWords);
    }

    @Override
    public void addBanWords(List<String> words) {
        banWords.addAll(words);
    }

    @Override
    public void fetchBanWords() {

    }

    private void replaceWords(List<String> words) {
        banWords.clear();
        banWords.addAll(words);
    }

    public List<String> getBanWords() {
        return Collections.unmodifiableList(banWords);
    }
}
