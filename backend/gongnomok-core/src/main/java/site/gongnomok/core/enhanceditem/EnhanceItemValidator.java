package site.gongnomok.core.enhanceditem;

import org.springframework.stereotype.Service;
import site.gongnomok.common.enhanceditem.dto.request.EnhanceSuccessDto;
import site.gongnomok.common.enhanceditem.dto.request.ItemEnhanceServiceRequest;
import site.gongnomok.common.exception.EnhancedItemException;
import site.gongnomok.data.enhanceditem.domain.EnhanceScroll;

import static site.gongnomok.common.exception.ExceptionCode.INVALID_ENHANCED_SCORE_REQUEST;
import static site.gongnomok.common.exception.ExceptionCode.INVALID_ENHANCED_SUCCESS_REQUEST;

@Service
public class EnhanceItemValidator {

    public void validateRequest(final ItemEnhanceServiceRequest request) {
        validateSuccessCount(request.getSuccess());
        validateScore(request.getSuccess(), request.getScroll(), request.getUpgradable());
    }

    private void validateSuccessCount(final EnhanceSuccessDto success) {
        final int ten = success.getTen();
        final int sixty = success.getSixty();
        final int hundred = success.getHundred();

        final int total = ten + sixty + hundred;
        if (total > 10) {
            throw new EnhancedItemException(INVALID_ENHANCED_SUCCESS_REQUEST);
        }
    }

    private void validateScore(
        final EnhanceSuccessDto success,
        final String scrollName,
        final int upgradable
    ) {
        EnhanceScroll scroll = EnhanceScroll.from(scrollName);
        final int maximumScore = scroll.getMaximumScore(upgradable);
        final int actualScore = EnhanceScroll.calculateScore(success, scrollName);
        if (actualScore > maximumScore) {
            throw new EnhancedItemException(INVALID_ENHANCED_SCORE_REQUEST);
        }
    }
}
