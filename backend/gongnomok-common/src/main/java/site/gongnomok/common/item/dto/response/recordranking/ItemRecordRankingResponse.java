package site.gongnomok.common.item.dto.response.recordranking;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ItemRecordRankingResponse {
    
    private Long itemId;
    private String challengerName;
    private RecordRankingSuccess success;
    
}
