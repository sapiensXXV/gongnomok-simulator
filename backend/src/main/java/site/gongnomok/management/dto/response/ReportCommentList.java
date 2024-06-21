package site.gongnomok.management.dto.response;


import java.util.Collections;
import java.util.List;

public class ReportCommentList {

    private final List<ReportCommentDto> comments;

    private ReportCommentList(List<ReportCommentDto> comments) {
        this.comments = comments;
    }

    public static ReportCommentList of(List<ReportCommentDto> comments) {
        return new ReportCommentList(comments);
    }

    public List<ReportCommentDto> getComments() {
        return Collections.unmodifiableList(comments);
    }
}
