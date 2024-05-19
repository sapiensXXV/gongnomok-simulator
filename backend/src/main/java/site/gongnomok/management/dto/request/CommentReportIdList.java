package site.gongnomok.management.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Collections;
import java.util.List;

@Getter
@NoArgsConstructor
public class CommentReportIdList {

    private List<Long> ids;

    public List<Long> getIds() {
        return Collections.unmodifiableList(ids);
    }

}
