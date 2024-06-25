package site.gongnomok.core.banword;

import java.util.List;

/**
 * 금칙어 정보 저장, 관리 인터페이스.
 * @author Jaehoon So
 * @version 1.0.0
 * @see site.gongnomok.core.banword.BanWordFilter
 */
public interface BanWordStorage {

    /**
     * 전달받은 문자열 리스트를 금지 단어로 등록한다. 기존에 있던 금칙어 목록을 덮어쓴다.
     * @param words 등록할 금칙어목록이 담긴 리스트
     */
    public void registerBanWords(List<String> words);

    /**
     * 문자열로 전달받은 단어 목록을 금칙어 목록으로 등록한다. 기존에 있던 금칙어 목록을 덮어쓴다.
     * @param words 등록할 금칙어목록이 담긴 문자열 배열
     */
    public void registerBanWords(String[] words);

    /**
     * 기존의 금칙어 목록에 새로운 단어를 등록한다.
     * @param word 새롭게 등록할 금칙어
     */
    public void addBanWord(String word);

    /**
     * 기존의 금칙어 목록에 새로운 단어 목록을 추가한다.
     * @param words 새롭게 등록할 금칙어 목록이 담긴 문자열 배열
     */
    public void addBanWords(String[] words);

    /**
     * 기존의 금칙어 목록에 새로운 단어 목록을 추가한다.
     * @param words 새롭게 등록할 금칙어 목록이 담긴 리스트
     */
    public void addBanWords(List<String> words);

}
