package site.gongnomok.data.enhanceditem.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.common.enhanceditem.dto.request.EnhanceSuccessDto;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnhanceSuccess {
    private int successCount;
    private int tenSuccessCount;
    private int sixtySuccessCount;
    private int hundredSuccessCount;

    public static EnhanceSuccess from(EnhanceSuccessDto dto) {
        return EnhanceSuccess.builder()
            .successCount(dto.getTotal())
            .tenSuccessCount(dto.getTen())
            .sixtySuccessCount(dto.getSixty())
            .hundredSuccessCount(dto.getHundred())
            .build();
    }

    public EnhanceSuccessDto toDto() {
        return EnhanceSuccessDto.builder()
            .total(successCount)
            .ten(tenSuccessCount)
            .sixty(sixtySuccessCount)
            .hundred(hundredSuccessCount)
            .build();
    }
}
