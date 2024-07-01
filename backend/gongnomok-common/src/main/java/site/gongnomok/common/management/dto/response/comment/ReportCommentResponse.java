package site.gongnomok.common.management.dto.response.comment;


import lombok.Getter;

@Getter
public class ReportCommentResponse {

    private final ReportCommentList reports;

    private ReportCommentResponse(ReportCommentList reports) {
        this.reports = reports;
    }

    public static ReportCommentResponse of(ReportCommentList reports) {
        return new ReportCommentResponse(reports);
    }

}
