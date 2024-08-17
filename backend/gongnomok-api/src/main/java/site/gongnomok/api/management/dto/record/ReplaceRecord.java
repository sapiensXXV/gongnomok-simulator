package site.gongnomok.api.management.dto.record;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReplaceRecord {
    private Long itemId;
    private ReplaceStatus status;
    private ReplaceSuccess success;
    private int iev;
    private int score;
    private int tries;
    private String scroll;
}
