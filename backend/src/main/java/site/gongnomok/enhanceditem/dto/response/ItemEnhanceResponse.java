package site.gongnomok.enhanceditem.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.enhanceditem.domain.EnhancedItem;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemEnhanceResponse {

    private String name;
    private int score; // item enhancement value
    private int iev;
    private EnhanceSuccessResponseDto success;
    private EnhanceStatusResponseDto status;

    public static ItemEnhanceResponse getBasicEnhanceData() {
        return ItemEnhanceResponse.builder()
            .name(null)
            .score(0)
            .iev(0)
            .success(EnhanceSuccessResponseDto.getBasic())
            .status(EnhanceStatusResponseDto.getBasic())
            .build();
    }

    public static ItemEnhanceResponse from(EnhancedItem entity) {
        return ItemEnhanceResponse.builder()
            .name(entity.getName())
            .score(entity.getScore())
            .iev(entity.getIev())
            .success(EnhanceSuccessResponseDto.from(entity.getSuccess()))
            .status(EnhanceStatusResponseDto.from(entity.getStatus()))
            .build();
    }

}
