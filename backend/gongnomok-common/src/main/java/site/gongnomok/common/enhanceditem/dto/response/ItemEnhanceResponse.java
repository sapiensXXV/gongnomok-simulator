package site.gongnomok.common.enhanceditem.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.common.enhanceditem.dto.EnhancedItemDto;
import site.gongnomok.common.enhanceditem.dto.request.EnhanceStatusDto;
import site.gongnomok.common.enhanceditem.dto.request.EnhanceSuccessDto;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ItemEnhanceResponse {

    private String name;
    private int score;
    private int iev; // item enhancement value
    private EnhanceSuccessDto success;
    private EnhanceStatusDto status;

    public static ItemEnhanceResponse getBasicEnhanceData() {
        return ItemEnhanceResponse.builder()
            .name(null)
            .score(0)
            .iev(0)
            .success(EnhanceSuccessDto.base())
            .status(EnhanceStatusDto.base())
            .build();
    }

    public static ItemEnhanceResponse from(EnhancedItemDto dto) {
        return ItemEnhanceResponse.builder()
            .name(dto.getName())
            .score(dto.getScore())
            .iev(dto.getIev())
            .success(dto.getSuccess())
            .status(dto.getStatus())
            .build();
    }

}
