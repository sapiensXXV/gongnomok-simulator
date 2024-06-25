package site.gongnomok.core.banword;

import java.util.List;

/**
 * 금칙어 목록을 메모리 내에 List로 관리하는 클래스
 * {@link BanWordFilter}의 구현체에서 사용할 수 있다. <br>
 * {@link BanWordConfiguration} 에서 빈으로 등록할 수 있습니다.
 * @author Jaehoon So
 * @version 1.0.0
 */
public class ListBanWordStorage implements BanWordStorage {

    private final List<String> banWords;

    public ListBanWordStorage() {
        this.banWords = fetchBanWords();
    }

    /**
     * 데이터베이스에 등록된 금칙어 목록을 가져온다.
     */
    private List<String> fetchBanWords() {
        return List.of();
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

    private void replaceWords(List<String> words) {
        banWords.clear();
        banWords.addAll(words);
    }
}
