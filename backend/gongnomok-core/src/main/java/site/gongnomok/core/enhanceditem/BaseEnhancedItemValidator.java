package site.gongnomok.core.enhanceditem;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import site.gongnomok.common.enhanceditem.dto.request.EnhanceStatusDto;
import site.gongnomok.common.enhanceditem.dto.request.EnhanceSuccessDto;
import site.gongnomok.common.enhanceditem.dto.request.ItemEnhanceServiceRequest;
import site.gongnomok.common.exception.EnhancedItemException;
import site.gongnomok.common.exception.ExceptionCode;
import site.gongnomok.common.exception.ItemException;
import site.gongnomok.core.scroll.ItemStat;
import site.gongnomok.core.scroll.Scroll;
import site.gongnomok.data.item.domain.Item;
import site.gongnomok.data.item.domain.repository.ItemRepository;

import java.util.Map;

import static site.gongnomok.common.exception.ExceptionCode.INVALID_ENHANCED_SUCCESS_REQUEST;
import static site.gongnomok.core.scroll.ItemStat.*;

/**
 * 강화 아이템 요청을 검증하는 책임을 가지는 클래스
 *
 * @author Jaehoon So
 * @version 1.0.0
 */
@Service
@RequiredArgsConstructor
public class BaseEnhancedItemValidator implements EnhanceItemValidator {

    private final ItemRepository itemRepository;

    public void validateRequest(
        final Long itemId,
        final ItemEnhanceServiceRequest request
    ) {
        Item findItem = itemRepository.findById(itemId)
            .orElseThrow(() -> new ItemException(ExceptionCode.NOT_FOUND_ITEM_ID));
        
        validateSuccessCount(request.getSuccess(), findItem.getUpgradable()); // 성공횟수 검사
        validateStatus(request.getScroll(), request.getStatus(), request.getSuccess()); // 능력치 상태검사
    }


    /**
     * 강화 성공 횟수의 유효성을 검증합니다.
     * 10%, 60%, 100% 성공률의 총합이 10을 초과하면 안 됩니다.
     *
     * @param successDto 강화 성공 정보를 담고 있는 DTO
     * @throws EnhancedItemException 총 성공 횟수가 10을 초과하는 경우
     */
    private void validateSuccessCount(final EnhanceSuccessDto successDto, int itemUpgradable) {
        final int ten = successDto.getTen();
        final int sixty = successDto.getSixty();
        final int hundred = successDto.getHundred();

        final int sumOfScrollSuccess = ten + sixty + hundred;
        final int totalSuccessAtRequest = successDto.getTotal();
        if (sumOfScrollSuccess > itemUpgradable || totalSuccessAtRequest > itemUpgradable) {
            throw new EnhancedItemException(INVALID_ENHANCED_SUCCESS_REQUEST);
        }
    }
    
    private void validateStatus (
        final String scrollName,
        final EnhanceStatusDto status,
        final EnhanceSuccessDto success) {
        
        // 사용자가 사용한 주문서 정보를 바탕으로 실제 강화 내용과 일치하는지 검사한다.
        Map<Integer, Scroll> scrolls = Scroll.findScrollFrom(scrollName);
        
        // str 결과 계산
        if (!matchStatusValue(success, status, scrolls)) {
            throw new EnhancedItemException(ExceptionCode.INVALID_UPGRADED_STATUS); 
        }
    }
    
    private boolean matchStatusValue(
        final EnhanceSuccessDto success,
        final EnhanceStatusDto status,
        final Map<Integer, Scroll> scrolls
    ) {
        if (status.getStr() != calculateEnhanceStatus(success, STR, scrolls)) return false;
        if (status.getDex() != calculateEnhanceStatus(success, DEX, scrolls)) return false;
        if (status.getIntel() != calculateEnhanceStatus(success, INT, scrolls)) return false;
        if (status.getLuk() != calculateEnhanceStatus(success, LUK, scrolls)) return false;
        if (status.getPhyAtk() != calculateEnhanceStatus(success, PHY_ATK, scrolls)) return false;
        if (status.getPhyDef() != calculateEnhanceStatus(success, PHY_DEF, scrolls)) return false;
        if (status.getMgAtk() != calculateEnhanceStatus(success, MG_ATK, scrolls)) return false;
        if (status.getMgDef() != calculateEnhanceStatus(success, MG_DEF, scrolls)) return false;
        if (status.getMove() != calculateEnhanceStatus(success, MOVE, scrolls)) return false;
        if (status.getJump() != calculateEnhanceStatus(success, JUMP, scrolls)) return false;
        if (status.getAcc() != calculateEnhanceStatus(success, ACC, scrolls)) return false;
        if (status.getAvo() != calculateEnhanceStatus(success, AVO, scrolls)) return false;
        if (status.getHp() != calculateEnhanceStatus(success, HP, scrolls)) return false;
        if (status.getMp() != calculateEnhanceStatus(success, MP, scrolls)) return false;
        
        return true;
    }
    
    private int calculateEnhanceStatus(
        final EnhanceSuccessDto success,
        final ItemStat stat,
        final Map<Integer, Scroll> scrolls
        ) {
        Scroll tenPerScroll = scrolls.get(10);
        Scroll sixtyPerScroll = scrolls.get(60);
        Scroll hundredPerScroll = scrolls.get(100);

        return switch (stat) {
            case STR ->
                tenPerScroll.getStr() * success.getTen() + sixtyPerScroll.getStr() * success.getSixty() + hundredPerScroll.getStr() * success.getHundred();
            case DEX ->
                tenPerScroll.getDex() * success.getTen() + sixtyPerScroll.getDex() * success.getSixty() + hundredPerScroll.getDex() * success.getHundred();
            case INT ->
                tenPerScroll.getIntel() * success.getTen() + sixtyPerScroll.getIntel() * success.getSixty() + hundredPerScroll.getIntel() * success.getHundred();
            case LUK ->
                tenPerScroll.getLuk() * success.getTen() + sixtyPerScroll.getLuk() * success.getSixty() + hundredPerScroll.getLuk() * success.getHundred();
            case PHY_ATK ->
                tenPerScroll.getPhyAtk() * success.getTen() + sixtyPerScroll.getPhyAtk() * success.getSixty() + hundredPerScroll.getPhyAtk() * success.getHundred();
            case PHY_DEF ->
                tenPerScroll.getPhyDef() * success.getTen() + sixtyPerScroll.getPhyDef() * success.getSixty() + hundredPerScroll.getPhyDef() * success.getHundred();
            case MG_ATK ->
                tenPerScroll.getMgAtk() * success.getTen() + sixtyPerScroll.getMgAtk() * success.getSixty() + hundredPerScroll.getMgAtk() * success.getHundred();
            case MG_DEF ->
                tenPerScroll.getMgDef() * success.getTen() + sixtyPerScroll.getMgDef() * success.getSixty() + hundredPerScroll.getMgDef() * success.getHundred();
            case ACC ->
                tenPerScroll.getAcc() * success.getTen() + sixtyPerScroll.getAcc() * success.getSixty() + hundredPerScroll.getAcc() * success.getHundred();
            case AVO ->
                tenPerScroll.getAvo() * success.getTen() + sixtyPerScroll.getAvo() * success.getSixty() + hundredPerScroll.getAvo() * success.getHundred();
            case MOVE ->
                tenPerScroll.getMove() * success.getTen() + sixtyPerScroll.getMove() * success.getSixty() + hundredPerScroll.getMove() * success.getHundred();
            case JUMP ->
                tenPerScroll.getJump() * success.getTen() + sixtyPerScroll.getJump() * success.getSixty() + hundredPerScroll.getJump() * success.getHundred();
            case HP ->
                tenPerScroll.getHp() * success.getTen() + sixtyPerScroll.getHp() * success.getSixty() + hundredPerScroll.getHp() * success.getHundred();
            case MP ->
                tenPerScroll.getMp() * success.getTen() + sixtyPerScroll.getMp() * success.getSixty() + hundredPerScroll.getMp() * success.getHundred();
        };
    }
    
}