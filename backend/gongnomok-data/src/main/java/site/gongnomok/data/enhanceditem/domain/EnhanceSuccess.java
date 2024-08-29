package site.gongnomok.data.enhanceditem.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.gongnomok.common.enhanceditem.dto.request.EnhanceSuccessDto;
import site.gongnomok.data.management.record.domain.EnhanceRecordSuccess;

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

    public static EnhanceSuccess from(EnhanceRecordSuccess record) {
        return EnhanceSuccess.builder()
            .successCount(record.getTen() + record.getSixty() + record.getHundred())
            .tenSuccessCount(record.getTen())
            .sixtySuccessCount(record.getSixty())
            .hundredSuccessCount(record.getHundred())
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
