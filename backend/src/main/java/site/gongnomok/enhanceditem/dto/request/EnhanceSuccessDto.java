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
    private int total;
    private int ten;
    private int sixty;
    private int hundred;

    public EnhanceSuccess toEntity() {
        return EnhanceSuccess.builder()
            .successCount(total)
            .tenSuccessCount(ten)
            .sixtySuccessCount(sixty)
            .hundredSuccessCount(hundred)
            .build();
    }
}
