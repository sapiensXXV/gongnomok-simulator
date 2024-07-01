package site.gongnomok.core.banword;

import org.springframework.data.domain.Pageable;
import site.gongnomok.common.banword.dto.response.BanWordResponse;
import site.gongnomok.common.exception.BanWordException;

/**
 * <h2>금칙어 서비스 인터페이스</h2>
 * 금칙어 관리를 위한 서비스 인터페이스 입니다.<br>
 * 이 인터페이스는 금칙어 목록 조회, 추가 및 삭제 기능을 제공합니다.
 * @author Jaehoon So
 * @version 1.0.0
 */
public interface BanWordService {

    /**
     * 현재 등록된 금칙어 목록을 페이징하여 조회합니다.
     *
     * @return 금칙어 목록이 포함된 BanWordResponse 객체
     */
    public BanWordResponse fetchBanWordList(Pageable pageable);

    /**
     * 새로운 금칙어를 목록에 추가합니다.
     *
     * @param word 추가할 금칙어 문자열
     * @throws BanWordException 이미 존재하는 금칙어를 추가하려 할 경우
     */
    public void addBanWord(String word);


    /**
     * 지정된 id의 금칙어를 목록에서 삭제합니다.
     *
     * @param wordId 삭제할 금칙어의 고유 id
     * @throws BanWordException 존재하지 않는 ID를 지정한 경우
     */
    public void deleteBanWord(Long wordId);

}
