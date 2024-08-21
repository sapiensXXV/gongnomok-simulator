package site.gongnomok.common.management.dto.record.request;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import site.gongnomok.core.management.log.dto.RecordReplaceServiceSuccess;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReplaceSuccess {
    private int total;
    private int ten;
    private int sixty;
    private int hundred;

    public RecordReplaceServiceSuccess toServiceDto() {
        return new RecordReplaceServiceSuccess(total, ten, sixty, hundred);
    }
}
