package site.gongnomok.common.item.dto.response.recordranking;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
@Builder
public class RecordRankingSuccess {

    private int ten;
    private int sixty;
    private int hundred;
}
