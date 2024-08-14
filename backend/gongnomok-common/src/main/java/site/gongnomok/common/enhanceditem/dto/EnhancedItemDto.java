package site.gongnomok.common.enhanceditem.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.common.enhanceditem.dto.request.EnhanceStatusDto;
import site.gongnomok.common.enhanceditem.dto.request.EnhanceSuccessDto;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class EnhancedItemDto {

    private Long enhancedId;
    private String name;
    private int iev;
    private int score;
    private EnhanceSuccessDto success;
    private EnhanceStatusDto status;
    private String scroll;
    private int tries;

}
