package site.gongnomok.enhanceditem.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.enhanceditem.domain.EnhanceSuccess;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnhanceSuccessResponseDto {
    private int total;
    private int ten;
    private int sixty;
    private int hundred;

    public static EnhanceSuccessResponseDto getBasic() {
        return EnhanceSuccessResponseDto.builder()
            .total(0)
            .ten(0)
            .sixty(0)
            .hundred(0)
            .build();
    }

    public static EnhanceSuccessResponseDto from(EnhanceSuccess success) {
        return EnhanceSuccessResponseDto.builder()
            .total(success.getSuccessCount())
            .ten(success.getTenSuccessCount())
            .sixty(success.getSixtySuccessCount())
            .hundred(success.getHundredSuccessCount())
            .build();
    }

}
