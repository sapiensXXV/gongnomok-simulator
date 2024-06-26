package site.gongnomok.core.banword.validator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import site.gongnomok.core.banword.provider.BanWordFetcher;
import site.gongnomok.core.banword.storage.ListBanWordStorage;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@SpringBootTest
@ActiveProfiles("test")
class BruteForceBanWordValidatorTest {

    BanWordValidator validator;

    @BeforeEach
    void init() {
        TestBanWordFetcher fetcher = new TestBanWordFetcher();
        ListBanWordStorage storage = new ListBanWordStorage(fetcher);
        validator = new BruteForceBanWordValidator(storage);
    }
    
    @Test
    @DisplayName("금칙어가 포함되었을 때")
    void banWordIncluded() {
        String exampleSentence = "금칙어1이 포함된 문장입니다.";
        boolean result = validator.containsBannedWord(exampleSentence);
        assertThat(result).isTrue();
    }

    @Test
    @DisplayName("금칙어가 포함되지 않았을 때")
    void banWordNotIncluded() {
        String exampleSentence = "문제 없는 문장입니다.";
        boolean result = validator.containsBannedWord(exampleSentence);
        assertThat(result).isFalse();
    }
    
    static class TestBanWordFetcher implements BanWordFetcher {
        @Override
        public List<String> fetchBanWords() {
            return List.of("금칙어1", "금칙어2", "금칙어3", "금칙어4");
        }
    }

}