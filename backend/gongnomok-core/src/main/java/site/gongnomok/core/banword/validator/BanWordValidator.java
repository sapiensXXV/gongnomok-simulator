package site.gongnomok.core.banword.validator;

/**
 * 금칙어가 문장에 존재하는지 검사하는 책임을 가지는 인터페이스
 * @author Jaehoon So
 * @version 1.0.0
 */
public interface BanWordValidator {

    public boolean containsBannedWord(String sentence);
}
