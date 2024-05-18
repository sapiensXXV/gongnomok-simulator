package site.gongnomok.management.dto.request;

import java.util.Collections;
import java.util.List;

public class CommentReportIdList {

    private final List<Long> ids;

    public CommentReportIdList(List<Long> ids) {
        this.ids = ids;
    }

    public List<Long> getIds() {
        return Collections.unmodifiableList(ids);
    }

}
