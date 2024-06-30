package site.gongnomok.common.enhanceditem.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.common.enhanceditem.dto.request.EnhanceSuccessDto;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnhanceSuccessResponseDto {
    private int total;
    private int ten;
    private int sixty;
    private int hundred;

    public static EnhanceSuccessResponseDto from(EnhanceSuccessDto success) {
        return EnhanceSuccessResponseDto.builder()
            .total(success.getTotal())
            .ten(success.getTen())
            .sixty(success.getSixty())
            .hundred(success.getHundred())
            .build();
    }

}
