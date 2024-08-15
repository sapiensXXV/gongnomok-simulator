package site.gongnomok.common.item.dto.response.recordranking;


import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class ItemRecordRankingResponse {
    
    private Long itemId;
    private String challengerName;
    private RecordRankingSuccess success;
    
}
