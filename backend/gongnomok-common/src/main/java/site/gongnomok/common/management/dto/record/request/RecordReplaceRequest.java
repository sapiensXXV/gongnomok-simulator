package site.gongnomok.common.management.dto.record.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class RecordReplaceRequest {

    private Long itemId;
    private String name;
    private ReplaceStatus status;
    private ReplaceSuccess success;
    private int iev;
    private int score;
    private int tries;
    private String scroll;

}
