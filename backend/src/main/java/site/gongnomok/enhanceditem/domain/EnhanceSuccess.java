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
    private int successCount; // TODO: 3/22/24 삭제
    private int tenSuccessCount;
    private int sixtySuccessCount;
    private int hundredSuccessCount;
}
