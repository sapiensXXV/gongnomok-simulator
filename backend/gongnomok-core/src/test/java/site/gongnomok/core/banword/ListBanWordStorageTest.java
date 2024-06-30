package site.gongnomok.core.banword;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import site.gongnomok.core.banword.fetcher.BanWordFetcher;
import site.gongnomok.core.banword.storage.BanWordStorage;
import site.gongnomok.core.banword.storage.ListBanWordStorage;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


/**
 * @author Jaehoon So
 * @version 1.0.0
 */
//@SpringBootTest
class ListBanWordStorageTest {

    BanWordStorage banWordStorage;

    @BeforeEach
    void init() {
        banWordStorage = new ListBanWordStorage(new TestBanWordFetcher());
    }

    @Test
    @DisplayName("금칙어 초기화")
    public void initBanWordByProvider() {
        assertThat(banWordStorage.getBanWords())
            .isNotEmpty()
            .containsSequence("금칙어1", "금칙어2", "금칙어3", "금칙어4");
    }

    @Test
    @DisplayName("리스트로 금칙어 등록")
    public void registerBanWordsWithList() {
        List<String> newBanWords = List.of("새로운 금칙어1", "새로운 금칙어2");
        banWordStorage.registerBanWords(newBanWords);
        assertThat(banWordStorage.getBanWords())
            .isNotEmpty()
            .containsSequence("새로운 금칙어1", "새로운 금칙어2");
    }

    @Test
    @DisplayName("문자열 배열로 금칙어 등록")
    public void registerBanWordsWithArray() {
        String[] newBanWords = new String[]{"새로운 금칙어1", "새로운 금칙어2"};
        banWordStorage.registerBanWords(newBanWords);
        assertThat(banWordStorage.getBanWords())
            .isNotEmpty()
            .containsSequence("새로운 금칙어1", "새로운 금칙어2");
    }

    @Test
    @DisplayName("단일 단어 금칙어 추가등록")
    public void addSingleBanWord() {
        banWordStorage.addBanWord("새로운 금칙어1");
        banWordStorage.addBanWord("새로운 금칙어2");
        assertThat(banWordStorage.getBanWords())
            .isNotEmpty()
            .containsSequence("금칙어1", "금칙어2", "금칙어3", "금칙어4", "새로운 금칙어1", "새로운 금칙어2");

    }

    @Test
    @DisplayName("리스트로 금칙어 추가 등록")
    public void addBanWordsWithList() {
        List<String> addBanWords = List.of("새로운 금칙어1", "새로운 금칙어2");
        banWordStorage.addBanWords(addBanWords);
        assertThat(banWordStorage.getBanWords())
            .isNotEmpty()
            .containsSequence("금칙어1", "금칙어2", "금칙어3", "금칙어4", "새로운 금칙어1", "새로운 금칙어2");
    }

    @Test
    @DisplayName("문자열 배열로 금칙어 추가 등록")
    public void addBanWordsWithArray() {
        String[] addBanWords = new String[]{ "새로운 금칙어1", "새로운 금칙어2" };
        banWordStorage.addBanWords(addBanWords);
        assertThat(banWordStorage.getBanWords())
            .isNotEmpty()
            .containsSequence("금칙어1", "금칙어2", "금칙어3", "금칙어4", "새로운 금칙어1", "새로운 금칙어2");
    }

    public static class TestBanWordFetcher implements BanWordFetcher {
        @Override
        public List<String> fetchBanWords() {
            return List.of("금칙어1", "금칙어2", "금칙어3", "금칙어4");
        }
    }

}