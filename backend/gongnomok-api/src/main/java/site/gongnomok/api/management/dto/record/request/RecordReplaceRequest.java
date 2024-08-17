package site.gongnomok.api.management.dto.record.request;


import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class RecordReplaceRequest {
    
    private List<ReplaceRecord> replaceRecord;
    
}
