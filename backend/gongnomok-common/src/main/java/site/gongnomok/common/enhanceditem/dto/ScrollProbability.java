package site.gongnomok.common.enhanceditem.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Getter
public enum ScrollProbability {
    TEN_PERCENT_SCROLL(1000),
    SIXTY_PERCENT_SCROLL(167),
    HUNDRED_PERCENT_SCROLL(10);
    
    private final int score;

    public static int calculateScore(int tenSucceed, int sixtySucceed, int hundredSucceed) {
        return TEN_PERCENT_SCROLL.getScore() * tenSucceed +
            SIXTY_PERCENT_SCROLL.getScore() * sixtySucceed +
            HUNDRED_PERCENT_SCROLL.getScore() * hundredSucceed;
    }
    
}
