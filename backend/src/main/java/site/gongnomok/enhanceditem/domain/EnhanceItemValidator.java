package site.gongnomok.enhanceditem.domain;

import org.springframework.stereotype.Component;
import site.gongnomok.enhanceditem.dto.request.ItemEnhanceServiceRequest;
import site.gongnomok.global.exception.EnhancedItemException;

import static site.gongnomok.global.exception.ExceptionCode.INVALID_ENHANCED_SCORE_REQUST;
import static site.gongnomok.global.exception.ExceptionCode.INVALID_ENHANCED_SUCCESS_REQUEST;


@Component
public class EnhanceItemValidator {

    public void validateRequest(final ItemEnhanceServiceRequest request) {
        validateSuccessCount(request.getSuccess());
        validateScore(request.getSuccess(), request.getScroll(), request.getUpgradable());
    }

    private void validateSuccessCount(final EnhanceSuccess success) {
        final int ten = success.getTenSuccessCount();
        final int sixty = success.getSixtySuccessCount();
        final int hundred = success.getHundredSuccessCount();

        final int total = ten + sixty + hundred;
        if (total > 10) {
            throw new EnhancedItemException(INVALID_ENHANCED_SUCCESS_REQUEST);
        }
    }

    private void validateScore(
        final EnhanceSuccess success,
        final EnhanceScroll scroll,
        final int upgradable
    ) {
        final int maximumScore = scroll.getMaximumScore(upgradable);
        final int actualScore = scroll.calculateScore(success);
        if (actualScore > maximumScore) {
            throw new EnhancedItemException(INVALID_ENHANCED_SCORE_REQUST);
        }
    }
}
