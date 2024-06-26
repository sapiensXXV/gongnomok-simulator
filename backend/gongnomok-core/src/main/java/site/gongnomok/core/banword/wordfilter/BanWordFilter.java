package site.gongnomok.core.banword.wordfilter;

import site.gongnomok.core.banword.storage.BanWordStorage;

/**
 * 금칙어 검사 인터페이스
 * @author Jaehoon So
 * @version 1.0.0
 * @see BanWordStorage
 */
public interface BanWordFilter {

    /**
     * 전달받은 문장이 금칙어를 포함하고 있는지 검사한다.
     * @param sentence 검사할 문장
     * @return 금칙어가 포함되어 있다면 true, 포함되어 있지 않다면 false를 반환한다.
     */
    public boolean checkContainBanWord(String sentence);

}
