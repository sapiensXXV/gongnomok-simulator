package site.gongnomok.enhanceditem.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EnhanceSuccess {
    private int successCount;
    private int tenSuccessCount;
    private int sixtySuccessCount;
    private int hundredSuccessCount;
}
