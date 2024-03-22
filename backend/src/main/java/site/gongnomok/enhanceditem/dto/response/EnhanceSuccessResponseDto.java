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
    private int successCount;
    private int tenSuccessCount;
    private int sixtySuccessCount;
    private int hundredSuccessCount;

    public static EnhanceSuccessResponseDto getBasic() {
        return EnhanceSuccessResponseDto.builder()
            .successCount(0)
            .tenSuccessCount(0)
            .sixtySuccessCount(0)
            .hundredSuccessCount(0)
            .build();
    }

    public static EnhanceSuccessResponseDto from(EnhanceSuccess success) {
        return EnhanceSuccessResponseDto.builder()
            .successCount(success.getSuccessCount())
            .tenSuccessCount(success.getTenSuccessCount())
            .sixtySuccessCount(success.getSixtySuccessCount())
            .hundredSuccessCount(success.getHundredSuccessCount())
            .build();
    }

}
