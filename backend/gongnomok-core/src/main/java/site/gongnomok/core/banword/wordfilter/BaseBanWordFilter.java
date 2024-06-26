package site.gongnomok.core.banword.wordfilter;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import site.gongnomok.core.banword.conf.BanWordConfiguration;
import site.gongnomok.core.banword.validator.BanWordValidator;

/**
 * String.contains 메서드를 사용해 문장내 금칙어가 포함되어 있는지 판단하는 클래스.
 * 등록된 금칙어의 수가 n개, 검사하고자 하는 문자의 글자 수가 m개 일 때 O(mn)의 시간복잡도를 가진다.<br>
 * {@link BanWordConfiguration}에서 빈으로 등록할 수 있습니다.
 * @author Jaehoon So
 * @version 1.0.0
 */

@Service
@RequiredArgsConstructor
public class BaseBanWordFilter implements BanWordFilter {

    private final BanWordValidator validator;

    @Override
    public boolean checkContainBanWord(String sentence) {
        if (!StringUtils.hasText(sentence)) {
            throw new IllegalArgumentException("빈 문자열은 금칙어 검사를 수행할 수 없습니다.");
        }

        return validator.containsBannedWord(sentence);
    }
}
