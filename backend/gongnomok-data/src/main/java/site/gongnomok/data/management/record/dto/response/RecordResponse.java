package site.gongnomok.data.management.record.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordResponse {
    
    private Long itemId;
    private Long recordId;
    private String itemName;
    private RecordStatus status;
    private RecordSuccess success;
    private int iev;
    private int score;
    private int tries;
    private String scroll;
}
