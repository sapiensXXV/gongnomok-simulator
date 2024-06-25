package site.gongnomok.core.banword;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import site.gongnomok.core.banword.provider.BanWordProvider;

import java.util.List;


/**
 * @author Jaehoon So
 * @version 1.0.0
 */
@SpringBootTest
class ListBanWordStorageTest {

    BanWordStorage banWordStorage;

    @BeforeEach
    void init() {
        banWordStorage = new ListBanWordStorage(new TestBanWordProvider());
    }

    @Test
    @DisplayName("금칙어 초기화")
    public void initBanWordByProvider() {
        
    }

    @Test
    @DisplayName("리스트로 금칙어 등록")
    public void registerBanWordsWithList() {
//        banWordStorage.registerBanWords();
    }

    @Test
    @DisplayName("문자열 배열로 금칙어 등록")
    public void registerBanWordsWithArray() {

    }

    @Test
    @DisplayName("단일 단어 금칙어 추가등록")
    public void addSingleBanWord() {

    }

    @Test
    @DisplayName("리스트로 금칙어 추가 등록")
    public void addBanWordsWithList() {

    }

    @Test
    @DisplayName("문자열 배열로 금칙어 추가 등록")
    public void addBanWordsWithArray() {

    }

    public static class TestBanWordProvider implements BanWordProvider {
        @Override
        public List<String> provideBanWords() {
            return List.of("금칙어1", "금칙어2", "금칙어3", "금칙어4");
        }
    }

}