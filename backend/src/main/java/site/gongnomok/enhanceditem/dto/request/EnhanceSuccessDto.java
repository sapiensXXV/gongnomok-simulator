package site.gongnomok.enhanceditem.dto.request;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.enhanceditem.domain.EnhanceSuccess;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnhanceSuccessDto {
    private int successCount;
    private int tenSuccessCount;
    private int sixtySuccessCount;
    private int hundredSuccessCount;

    public EnhanceSuccess toEntity() {
        return EnhanceSuccess.builder()
            .successCount(successCount)
            .tenSuccessCount(tenSuccessCount)
            .sixtySuccessCount(sixtySuccessCount)
            .hundredSuccessCount(hundredSuccessCount)
            .build();
    }
}
