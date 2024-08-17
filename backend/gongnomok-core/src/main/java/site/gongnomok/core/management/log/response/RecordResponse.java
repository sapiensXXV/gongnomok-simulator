package site.gongnomok.core.management.log.response;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RecordResponse {
    
    private Long itemId;
    private RecordStatus status;
    private RecordSuccess success;
    private int iev;
    private int score;
    private int tries;
    private String scroll;
}
